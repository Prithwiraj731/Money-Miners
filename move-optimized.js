const fs = require('fs');
const path = require('path');

const OPTIMIZED_DIR = './client/public/optimized';
const PUBLIC_DIR = './client/public';

console.log('📁 Moving optimized images to public folder...\n');

// Get all files from optimized directory
const files = fs.readdirSync(OPTIMIZED_DIR);

files.forEach(file => {
    const sourcePath = path.join(OPTIMIZED_DIR, file);
    const destPath = path.join(PUBLIC_DIR, file);

    // Copy optimized file to public directory
    fs.copyFileSync(sourcePath, destPath);
    console.log(`✅ Moved: ${file}`);
});

console.log('\n✨ All optimized images moved to public folder!');
console.log('\n🔧 NEXT: Update your code to use .webp extensions');
console.log('Example: Change "/basic_of_trading.png" → "/basic_of_trading.webp"\n');
