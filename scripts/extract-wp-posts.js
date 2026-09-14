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

console.log(`Found ${posts.length} published blog posts`);

// Convert posts to MDX
posts.forEach(post => {
  const date = new Date(post.post_date);
  const slug = post.post_title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  
  const dateStr = date.toISOString().split('T')[0];
  const filename = `${dateStr}-${slug}.mdx`;
  
  // Clean up content (remove WordPress shortcodes, HTML tags, etc.)
  let content = post.post_content
    .replace(/\[\/?[^\]]+\]/g, '') // Remove shortcodes
    .replace(/<[^>]+>/g, '') // Remove HTML tags
    .replace(/&nbsp;/g, ' ') // Replace nbsp
    .replace(/&amp;/g, '&') // Replace ampersand
    .replace(/&quot;/g, '"') // Replace quotes
    .replace(/&#39;/g, "'") // Replace apostrophes
    .replace(/\r\n/g, '\n') // Normalize line endings
    .replace(/\n{3,}/g, '\n\n') // Remove excessive line breaks
    .trim();
  
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

console.log('Blog posts extracted successfully!');
