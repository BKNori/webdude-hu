const fs = require('fs');
const path = require('path');

const missingItemsPath = path.join(__dirname, '../wp-content/missing-portfolio-items.json');
const missingItems = JSON.parse(fs.readFileSync(missingItemsPath, 'utf-8'));

// HTML to text converter
function htmlToText(html) {
  if (!html) return '';
  let text = html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
  return text.substring(0, 200);
}

// Generate project object from XML item
function generateProject(item) {
  const heroImage = item.images[0] || '';
  const heroPath = heroImage.replace('https://webdude.hu/wp-content/uploads/', '/assets/portfolio/');
  
  return {
    slug: item.slug,
    title: item.title,
    tag: "Weboldal Készítés",
    description: htmlToText(item.content),
    challenge: "Professzionális weboldal és arculat kialakítása a vállalkozás számára.",
    solution: "Modern design és technológia alkalmazása a digitális megjelenés optimalizálására.",
    result: "Sikeres projekt, amely növelte a vállalkozás online láthatóságát.",
    assets: {
      hero: heroPath
    },
    keywords: ["Weboldal készítés", "Grafikai tervezés", "Arculattervezés"]
  };
}

const newProjects = missingItems.map(generateProject);

console.log(`Generated ${newProjects.length} project objects`);

// Save to JSON
const outputPath = path.join(__dirname, '../wp-content/new-projects.json');
fs.writeFileSync(outputPath, JSON.stringify(newProjects, null, 2), 'utf-8');

console.log('New projects saved to new-projects.json');
