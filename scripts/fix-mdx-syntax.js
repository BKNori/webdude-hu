const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, '../src/content/blog');
const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.mdx'));

console.log(`Found ${files.length} MDX files`);

let fixed = 0;

files.forEach(file => {
  const filePath = path.join(blogDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Remove frontmatter
  const frontmatterMatch = content.match(/^---[\s\S]*?---/);
  const frontmatter = frontmatterMatch ? frontmatterMatch[0] : '';
  let body = content.replace(/^---[\s\S]*?---/, '');
  
  // Fix broken markdown links like [text](/)[text2](/url)
  body = body.replace(/\[([^\]]+)\]\([^)]*\)\[([^\]]+)\]\([^)]*\)/g, '[$1]($2)');
  
  // Fix broken links like [text](/)- [text2](/url)
  body = body.replace(/\[([^\]]+)\]\([^)]*\)\s*-\s*\[([^\]]+)\]\([^)]*\)/g, '[$1]($2)');
  
  // Fix broken links like [text](/)[text2](/url)
  body = body.replace(/\[([^\]]+)\]\([^)]*\)\[([^\]]+)\]\([^)]*\)/g, '[$1]($2)');
  
  // Fix navigation elements like [← Vissza a hírekhez](/hirek)2025. január 18.
  body = body.replace(/\[([^\]]+)\]\([^)]*\)(\d{4}\.\s\w+\s\d+\.)/g, '$2');
  
  // Fix broken links like [text](text) - missing URL
  body = body.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
    // If URL doesn't start with /, http, or #, make it empty
    if (!url.match(/^\/|^https?:|^#/)) {
      return text;
    }
    return match;
  });
  
  // Fix broken list items with missing URLs
  body = body.replace(/-\s*\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
    if (!url.match(/^\/|^https?:|^#/)) {
      return `- ${text}`;
    }
    return match;
  });
  
  // Fix consecutive links without spaces
  body = body.replace(/\]\([^\)]*\)\[/g, '] [');
  
  // Fix broken list items with links
  body = body.replace(/-\s*\[([^\]]+)\]\([^)]*\)\s*\[([^\]]+)\]\([^)]*\)/g, '- [$1]($2)');
  
  // Remove navigation elements that are broken
  body = body.replace(/\[WebDude\]\(\/\)\s*-\s*\[Norbi vagyok\]\(\/szia-norbi-vagyok\)/g, '');
  body = body.replace(/-\s*\[Szolgáltatások\s*▼\]\(\/szolgaltatasok\)/g, '');
  body = body.replace(/-\s*\[Munkáim\]\(\/munkak\)/g, '');
  body = body.replace(/-\s*\[Hírek\]\(\/hirek\)/g, '');
  body = body.replace(/\[Kapcsolat\]\(\/kapcsolat\)/g, '');
  body = body.replace(/\[←\s*Vissza\s*a\s*hírekhez\]\(\/hirek\)/g, '');
  
  // Clean up multiple consecutive dashes
  body = body.replace(/-{3,}/g, '---');
  
  // Clean up empty lines
  body = body.replace(/\n{3,}/g, '\n\n');
  
  // Reconstruct file
  const newContent = frontmatter + '\n' + body.trim();
  
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log(`Fixed: ${file}`);
    fixed++;
  }
});

console.log(`\nFixed ${fixed} files`);
