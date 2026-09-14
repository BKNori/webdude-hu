const fs = require('fs');
const path = require('path');

const hirekDir = path.join(__dirname, '../wp-content/hirek');
const blogDir = path.join(__dirname, '../src/content/blog');

// Ensure blog directory exists
if (!fs.existsSync(blogDir)) {
  fs.mkdirSync(blogDir, { recursive: true });
}

// HTML to MDX converter (raw HTML version - no conversion)
function htmlToMdx(html) {
  if (!html) return '';
  
  let mdx = html;
  
  // Remove HTML comments (multi-line)
  mdx = mdx.replace(/<!--[\s\S]*?-->/gi, '');
  
  // Remove CDATA sections
  mdx = mdx.replace(/<!\[CDATA\[[\s\S]*?\]\]>/gi, '');
  
  // Remove DOCTYPE and xml declarations
  mdx = mdx.replace(/<!DOCTYPE[^>]*>/gi, '');
  mdx = mdx.replace(/<\?xml[^>]*\?>/gi, '');
  
  // Remove style tags and their content
  mdx = mdx.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  
  // Remove script tags and their content
  mdx = mdx.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  
  // Remove noscript tags but keep their content
  mdx = mdx.replace(/<noscript[^>]*>([\s\S]*?)<\/noscript>/gi, '$1');
  
  // Remove navigation elements (keep only main content)
  mdx = mdx.replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '');
  mdx = mdx.replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '');
  mdx = mdx.replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '');
  
  // Remove iframes
  mdx = mdx.replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, '');
  
  // Remove video tags
  mdx = mdx.replace(/<video[^>]*>[\s\S]*?<\/video>/gi, '');
  
  // Remove audio tags
  mdx = mdx.replace(/<audio[^>]*>[\s\S]*?<\/audio>/gi, '');
  
  // Remove object tags
  mdx = mdx.replace(/<object[^>]*>[\s\S]*?<\/object>/gi, '');
  
  // Remove embed tags
  mdx = mdx.replace(/<embed[^>]*>/gi, '');
  
  // Clean up line endings
  mdx = mdx.replace(/\r\n/g, '\n');
  
  return mdx.trim();
}

// Extract title from HTML
function extractTitle(html) {
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  if (titleMatch) return titleMatch[1].trim();
  
  const h1Match = html.match(/<h1[^>]*>([^<]+)<\/h1>/i);
  if (h1Match) return h1Match[1].trim();
  
  return 'Untitled';
}

// Extract date from HTML
function extractDate(html) {
  const dateMatch = html.match(/<meta[^>]*name="date"[^>]*content="([^"]+)"/i);
  if (dateMatch) return dateMatch[1];
  
  const timeMatch = html.match(/<time[^>]*>([^<]+)<\/time>/i);
  if (timeMatch) return timeMatch[1];
  
  return new Date().toISOString().split('T')[0];
}

// Get all HTML files in hirek directory
const files = fs.readdirSync(hirekDir).filter(file => file.endsWith('.html') && file !== 'index.html');

console.log(`Found ${files.length} HTML files in hirek directory`);

let imported = 0;
let skipped = 0;

files.forEach(file => {
  const htmlPath = path.join(hirekDir, file);
  const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
  
  // Extract title
  const title = extractTitle(htmlContent);
  
  // Extract date
  const date = extractDate(htmlContent);
  
  // Generate slug
  const slug = file.replace('.html', '');
  
  // Check if MDX file already exists
  const mdxPath = path.join(blogDir, `${date}-${slug}.mdx`);
  if (fs.existsSync(mdxPath)) {
    console.log(`Skipped: ${title} (already exists)`);
    skipped++;
    return;
  }
  
  // Convert HTML to MDX
  const content = htmlToMdx(htmlContent);
  
  // Extract excerpt
  const excerpt = content.substring(0, 150).replace(/\n/g, ' ') + '...';
  
  // Create frontmatter
  const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
date: "${date}"
excerpt: "${excerpt.replace(/"/g, '\\"')}"
image: ""
noindex: false
---

${content}
`;
  
  fs.writeFileSync(mdxPath, frontmatter, 'utf-8');
  console.log(`Imported: ${title}`);
  imported++;
});

console.log(`\nImport complete: ${imported} imported, ${skipped} skipped`);
