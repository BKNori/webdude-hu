const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const imageUrlsPath = path.join(__dirname, '../wp-content/image-urls.json');
const outputDir = path.join(__dirname, '../public/assets/portfolio');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const imageUrls = JSON.parse(fs.readFileSync(imageUrlsPath, 'utf-8'));

console.log(`Found ${imageUrls.length} unique image URLs`);

let downloaded = 0;
let failed = 0;

imageUrls.forEach((url, index) => {
  // Extract filename from URL
  const urlParts = url.split('/');
  const filename = urlParts[urlParts.length - 1];
  const outputPath = path.join(outputDir, filename);

  // Skip if file already exists
  if (fs.existsSync(outputPath)) {
    console.log(`[${index + 1}/${imageUrls.length}] Already exists: ${filename}`);
    downloaded++;
    return;
  }

  const protocol = url.startsWith('https') ? https : http;

  protocol.get(url, (response) => {
    if (response.statusCode === 200) {
      const fileStream = fs.createWriteStream(outputPath);
      response.pipe(fileStream);
      
      fileStream.on('finish', () => {
        fileStream.close();
        downloaded++;
        console.log(`[${index + 1}/${imageUrls.length}] Downloaded: ${filename}`);
        
        if (downloaded + failed === imageUrls.length) {
          console.log(`\nDownload complete: ${downloaded} succeeded, ${failed} failed`);
        }
      });
    } else {
      failed++;
      console.log(`[${index + 1}/${imageUrls.length}] Failed: ${filename} (Status: ${response.statusCode})`);
      
      if (downloaded + failed === imageUrls.length) {
        console.log(`\nDownload complete: ${downloaded} succeeded, ${failed} failed`);
      }
    }
  }).on('error', (err) => {
    failed++;
    console.log(`[${index + 1}/${imageUrls.length}] Error: ${filename} (${err.message})`);
    
    if (downloaded + failed === imageUrls.length) {
      console.log(`\nDownload complete: ${downloaded} succeeded, ${failed} failed`);
    }
  });
});
