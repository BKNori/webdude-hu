const fs = require('fs');
const path = require('path');

try {
  const mdPath = '_docs/corrupted-files-recovery-v2.md';
  if (!fs.existsSync(mdPath)) {
    console.error('Error: Recovery file not found at: ' + mdPath);
    process.exit(1);
  }

  console.log('Reading recovery file...');
  const content = fs.readFileSync(mdPath, 'utf8');
  
  // Normalize Windows line endings to make block splitting safer
  const normalizedContent = content.replace(/\r\n/g, '\n');
  const blocks = normalizedContent.split('##### ');

  const extractCode = (blockText) => {
    const match = blockText.match(/```tsx\n([\s\S]*?)\n```/);
    return match ? match[1] : null;
  };

  const cleanAndNormalize = (str) => {
    return Buffer.from(str, 'utf8')
      .toString('utf8')
      .replace(/^\uFEFF/, '') // Remove potential UTF-8 BOM
      .replace(/\r\n/g, '\n'); // Enforce standard Unix line-endings
  };

  blocks.forEach(block => {
    let targetFile = null;
    if (block.includes('AdminPanel.tsx')) {
      targetFile = 'src/components/organisms/AdminPanel.tsx';
    } else if (block.includes('QuoteRequestForm.tsx')) {
      targetFile = 'src/components/organisms/QuoteRequestForm.tsx';
    } else if (block.includes('SingleAITool.tsx')) {
      targetFile = 'src/components/organisms/SingleAITool.tsx';
    }

    if (targetFile) {
      const rawCode = extractCode(block);
      if (rawCode) {
        const cleanCode = cleanAndNormalize(rawCode);
        // Ensure directory exists
        fs.mkdirSync(path.dirname(targetFile), { recursive: true });
        fs.writeFileSync(targetFile, cleanCode, 'utf8');
        console.log(`✅ Successfully normalized & wrote: ${targetFile}`);
      } else {
        console.warn(`⚠️ Found block for ${targetFile} but failed to extract code.`);
      }
    }
  });

  console.log('🎉 Restoration and sanitization completed successfully!');
} catch (error) {
  console.error('Fatal error during sanitization:', error);
  process.exit(1);
}
