const fs = require('fs');
const path = require('path');

const projectsPath = path.join(__dirname, '../src/data/projects.js');
const portfolioItemsPath = path.join(__dirname, '../wp-content/portfolio-items.json');

// Read existing projects
const projectsContent = fs.readFileSync(projectsPath, 'utf-8');
// Extract slug values using regex
const slugMatches = projectsContent.match(/slug:\s*"([^"]+)"/g);
const existingSlugs = new Set(slugMatches ? slugMatches.map(m => m.match(/"([^"]+)"/)[1]) : []);

// Read portfolio items from XML
const portfolioItems = JSON.parse(fs.readFileSync(portfolioItemsPath, 'utf-8'));

const missingItems = portfolioItems.filter(item => !existingSlugs.has(item.slug));

console.log(`Existing projects: ${existingSlugs.size}`);
console.log(`Portfolio items from XML: ${portfolioItems.length}`);
console.log(`Missing items: ${missingItems.length}`);

console.log('\nMissing items:');
missingItems.forEach(item => {
  console.log(`- ${item.title} (${item.slug})`);
});

// Save missing items
const missingOutputPath = path.join(__dirname, '../wp-content/missing-portfolio-items.json');
fs.writeFileSync(missingOutputPath, JSON.stringify(missingItems, null, 2), 'utf-8');
console.log('\nMissing items saved to missing-portfolio-items.json');
