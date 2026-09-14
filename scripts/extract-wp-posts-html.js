const fs = require('fs');
const path = require('path');

const sqlFilePath = path.join(__dirname, '../wp-content/balognorbi_wp94 (1)átírt newsite a sima webude ra.sql');
const outputDir = path.join(__dirname, '../src/content/blog');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Read SQL file
const sqlContent = fs.readFileSync(sqlFilePath, 'utf-8');

// Extract posts from wp_posts table (try different prefixes)
const postsMatch = sqlContent.match(/INSERT INTO `wp[a-z0-9_]*posts`[\s\S]*?;/g);

if (!postsMatch) {
  console.log('No posts found in SQL file');
  process.exit(0);
}

// HTML to MDX converter
function htmlToMdx(html) {
  if (!html) return '';
  
  let mdx = html;
  
  // Remove style tags and their content
  mdx = mdx.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  
  // Remove noscript tags but keep their content
  mdx = mdx.replace(/<noscript[^>]*>([\s\S]*?)<\/noscript>/gi, '$1');
  
  // Convert headings
  mdx = mdx.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '# $1\n\n');
  mdx = mdx.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '## $1\n\n');
  mdx = mdx.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '### $1\n\n');
  mdx = mdx.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, '#### $1\n\n');
  mdx = mdx.replace(/<h5[^>]*>([\s\S]*?)<\/h5>/gi, '##### $1\n\n');
  mdx = mdx.replace(/<h6[^>]*>([\s\S]*?)<\/h6>/gi, '###### $1\n\n');
  
  // Convert bold/strong
  mdx = mdx.replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, '**$1**');
  mdx = mdx.replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, '**$1**');
  
  // Convert italic/em
  mdx = mdx.replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, '*$1*');
  mdx = mdx.replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, '*$1*');
  
  // Convert paragraphs
  mdx = mdx.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '$1\n\n');
  
  // Convert line breaks
  mdx = mdx.replace(/<br\s*\/?>/gi, '\n');
  
  // Convert unordered lists
  mdx = mdx.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (match, content) => {
    const items = content.match(/<li[^>]*>([\s\S]*?)<\/li>/gi);
    if (!items) return '';
    return items.map(item => {
      const text = item.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '$1').trim();
      return `- ${text}\n`;
    }).join('') + '\n';
  });
  
  // Convert ordered lists
  mdx = mdx.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (match, content) => {
    const items = content.match(/<li[^>]*>([\s\S]*?)<\/li>/gi);
    if (!items) return '';
    return items.map((item, index) => {
      const text = item.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '$1').trim();
      return `${index + 1}. ${text}\n`;
    }).join('') + '\n';
  });
  
  // Convert links
  mdx = mdx.replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)');
  
  // Convert images (keep as HTML for now, but clean up)
  mdx = mdx.replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*>/gi, '<Image src="$1" alt="$2" />');
  mdx = mdx.replace(/<img[^>]*src="([^"]*)"[^>]*>/gi, '<Image src="$1" alt="" />');
  
  // Remove data-src and lazy loading attributes
  mdx = mdx.replace(/data-src="([^"]*)"/gi, '');
  mdx = mdx.replace(/loading="lazy"/gi, '');
  
  // Remove data attributes
  mdx = mdx.replace(/data-[^=]*="[^"]*"/gi, '');
  
  // Remove style attributes
  mdx = mdx.replace(/style="[^"]*"/gi, '');
  
  // Clean up empty lines
  mdx = mdx.replace(/\n{3,}/g, '\n\n');
  
  // Convert entities
  mdx = mdx.replace(/&nbsp;/g, ' ');
  mdx = mdx.replace(/&amp;/g, '&');
  mdx = mdx.replace(/&quot;/g, '"');
  mdx = mdx.replace(/&#39;/g, "'");
  mdx = mdx.replace(/&lt;/g, '<');
  mdx = mdx.replace(/&gt;/g, '>');
  
  // Remove remaining HTML tags (except Image and video)
  mdx = mdx.replace(/<(?!\/?(Image|video)[\s>])[^>]+>/gi, '');
  
  // Clean up line endings
  mdx = mdx.replace(/\r\n/g, '\n');
  
  return mdx.trim();
}

// Parse posts
const posts = [];
postsMatch.forEach(insertStatement => {
  // Extract the VALUES part
  const valuesMatch = insertStatement.match(/VALUES\s+([\s\S]+);/);
  if (!valuesMatch) return;

  const valuesString = valuesMatch[1];
  
  // Split by ),( but handle nested parentheses in content
  const rows = [];
  let currentRow = '';
  let parenCount = 0;
  let inString = false;
  let stringChar = '';

  for (let i = 0; i < valuesString.length; i++) {
    const char = valuesString[i];
    
    if ((char === "'" || char === '"') && (i === 0 || valuesString[i-1] !== '\\')) {
      if (!inString) {
        inString = true;
        stringChar = char;
      } else if (char === stringChar) {
        inString = false;
        stringChar = '';
      }
    }
    
    if (!inString) {
      if (char === '(') parenCount++;
      if (char === ')') parenCount--;
      
      if (char === ',' && parenCount === 0) {
        rows.push(currentRow);
        currentRow = '';
        continue;
      }
    }
    
    currentRow += char;
  }
  if (currentRow) rows.push(currentRow);

  rows.forEach(row => {
    // Parse row values
    const values = [];
    let currentValue = '';
    let inValueString = false;
    let valueStringChar = '';
    let escaped = false;

    for (let i = 0; i < row.length; i++) {
      const char = row[i];
      
      if (escaped) {
        currentValue += char;
        escaped = false;
        continue;
      }
      
      if (char === '\\') {
        escaped = true;
        currentValue += char;
        continue;
      }
      
      if ((char === "'" || char === '"') && !inValueString) {
        inValueString = true;
        valueStringChar = char;
        continue;
      }
      
      if (char === valueStringChar && inValueString) {
        inValueString = false;
        continue;
      }
      
      if (char === ',' && !inValueString) {
        values.push(currentValue.trim());
        currentValue = '';
        continue;
      }
      
      currentValue += char;
    }
    
    if (currentValue) values.push(currentValue.trim());

    if (values.length >= 21) {
      const post = {
        ID: values[0],
        post_author: values[1],
        post_date: values[2],
        post_date_gmt: values[3],
        post_content: values[4],
        post_title: values[5],
        post_excerpt: values[6],
        post_status: values[7],
        post_type: values[20]
      };
      
      // Only include published posts and pages
      if (post.post_status === 'publish' && (post.post_type === 'post' || post.post_type === 'page')) {
        posts.push(post);
      }
    }
  });
});

console.log(`Found ${posts.length} published posts and pages`);

// Convert posts to MDX
posts.forEach(post => {
  const date = new Date(post.post_date);
  const slug = post.post_title
    .toLowerCase()
    .replace(/[^a-z0-9áéíóúöüőű]+/g, '-')
    .replace(/(^-|-$)/g, '');
  
  const dateStr = date.toISOString().split('T')[0];
  const filename = `${dateStr}-${slug}.mdx`;
  
  // Convert HTML content to MDX
  const content = htmlToMdx(post.post_content);
  
  // Create frontmatter
  const frontmatter = `---
title: "${post.post_title.replace(/"/g, '\\"')}"
date: "${dateStr}"
excerpt: "${post.post_excerpt.replace(/"/g, '\\"').replace(/\n/g, ' ').substring(0, 150)}..."
image: ""
noindex: false
---

${content}
`;
  
  const outputPath = path.join(outputDir, filename);
  fs.writeFileSync(outputPath, frontmatter, 'utf-8');
  console.log(`Created: ${filename}`);
});

console.log('Blog posts extracted successfully with HTML to MDX conversion!');
