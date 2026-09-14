const fs = require('fs');
const path = require('path');

const xmlFilePath = path.join(__dirname, '../wp-content/webdude.WordPress.2025-03-22 portfolio.xml');
const xmlContent = fs.readFileSync(xmlFilePath, 'utf-8');

// Extract all items
const itemRegex = /<item>[\s\S]*?<\/item>/g;
const items = xmlContent.match(itemRegex) || [];

const portfolioItems = [];
const imageUrls = new Set();

items.forEach(item => {
  // Extract post_type
  const postTypeMatch = item.match(/<wp:post_type><\!\[CDATA\[([^\]]+)\]\]><\/wp:post_type>/);
  if (!postTypeMatch || postTypeMatch[1] !== 'arts_portfolio_item') return;

  // Extract post_status
  const postStatusMatch = item.match(/<wp:post_status><\!\[CDATA\[([^\]]+)\]\]><\/wp:post_status>/);
  if (postStatusMatch && postStatusMatch[1] !== 'publish') return;

  // Extract title
  const titleMatch = item.match(/<title><\!\[CDATA\[([^\]]+)\]\]><\/title>/);
  const title = titleMatch ? titleMatch[1] : '';

  // Extract link/slug
  const linkMatch = item.match(/<link>([^<]+)<\/link>/);
  const link = linkMatch ? linkMatch[1] : '';
  const slug = link.split('/').filter(Boolean).pop() || '';

  // Extract content
  const contentMatch = item.match(/<content:encoded><\!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/);
  const content = contentMatch ? contentMatch[1] : '';

  // Extract excerpt
  const excerptMatch = item.match(/<excerpt:encoded><\!\[CDATA\[([\s\S]*?)\]\]><\/excerpt:encoded>/);
  const excerpt = excerptMatch ? excerptMatch[1] : '';

  // Extract post_date
  const dateMatch = item.match(/<pubDate>([^<]+)<\/pubDate>/);
  const date = dateMatch ? dateMatch[1] : '';

  // Extract image URLs
  const imgRegex = /<img[^>]*src="([^"]+)"[^>]*>/g;
  let match;
  while ((match = imgRegex.exec(item)) !== null) {
    const url = match[1];
    if (url.includes('webdude.hu/wp-content/uploads/')) {
      imageUrls.add(url);
    }
  }

  portfolioItems.push({
    title,
    slug,
    link,
    content,
    excerpt,
    date,
    images: Array.from(imageUrls).filter(url => item.includes(url))
  });
});

console.log(`Found ${portfolioItems.length} portfolio items`);
console.log(`Found ${imageUrls.size} unique image URLs`);

// Save portfolio items to JSON
const outputPath = path.join(__dirname, '../wp-content/portfolio-items.json');
fs.writeFileSync(outputPath, JSON.stringify(portfolioItems, null, 2), 'utf-8');

// Save image URLs to JSON
const imagesOutputPath = path.join(__dirname, '../wp-content/image-urls.json');
fs.writeFileSync(imagesOutputPath, JSON.stringify(Array.from(imageUrls), null, 2), 'utf-8');

console.log('Portfolio items saved to portfolio-items.json');
console.log('Image URLs saved to image-urls.json');
