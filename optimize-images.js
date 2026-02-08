const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const INPUT_DIR = './client/public';
const OUTPUT_DIR = './client/public/optimized';
const BACKUP_DIR = './client/public/backup';

// Quality settings
const QUALITY = {
    jpeg: 85,
    png: 90,
    webp: 85
};

// Max dimensions (preserve aspect ratio)
const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1920;

// File extensions to process
const VALID_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

// Create directories if they don't exist
function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

// Get file size in KB
function getFileSizeKB(filePath) {
    const stats = fs.statSync(filePath);
    return (stats.size / 1024).toFixed(2);
}

// Optimize a single image
async function optimizeImage(inputPath, outputPath) {
    try {
        const ext = path.extname(inputPath).toLowerCase();

        if (!VALID_EXTENSIONS.includes(ext)) {
            console.log(`⏭️  Skipping: ${path.basename(inputPath)} (not an image)`);
            return null;
        }

        const originalSize = getFileSizeKB(inputPath);

        // Load image and get metadata
        const image = sharp(inputPath);
        const metadata = await image.metadata();

        // Resize if necessary (preserve aspect ratio)
        let resizeOptions = {};
        if (metadata.width > MAX_WIDTH || metadata.height > MAX_HEIGHT) {
            resizeOptions = {
                width: MAX_WIDTH,
                height: MAX_HEIGHT,
                fit: 'inside',
                withoutEnlargement: true
            };
        }

        // Process image based on format
        let outputImage = image;

        if (Object.keys(resizeOptions).length > 0) {
            outputImage = outputImage.resize(resizeOptions);
        }

        // Convert to WebP for maximum compression
        const webpPath = outputPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');

        await outputImage
            .webp({ quality: QUALITY.webp, effort: 6 })
            .toFile(webpPath);

        const optimizedSize = getFileSizeKB(webpPath);
        const savings = ((1 - optimizedSize / originalSize) * 100).toFixed(1);

        console.log(`✅ ${path.basename(inputPath)}`);
        console.log(`   ${originalSize}KB → ${optimizedSize}KB (${savings}% smaller)`);

        return {
            original: inputPath,
            optimized: webpPath,
            originalSize,
            optimizedSize,
            savings
        };

    } catch (error) {
        console.error(`❌ Error processing ${inputPath}:`, error.message);
        return null;
    }
}

// Process all images in directory
async function optimizeAllImages() {
    console.log('🖼️  Image Optimization Script\n');
    console.log('📁 Input directory:', INPUT_DIR);
    console.log('💾 Output directory:', OUTPUT_DIR);
    console.log('🔄 Backup directory:', BACKUP_DIR);
    console.log('\n' + '='.repeat(60) + '\n');

    // Ensure directories exist
    ensureDir(OUTPUT_DIR);
    ensureDir(BACKUP_DIR);

    // Get all files in public directory
    const files = fs.readdirSync(INPUT_DIR).filter(file => {
        const ext = path.extname(file).toLowerCase();
        return VALID_EXTENSIONS.includes(ext);
    });

    if (files.length === 0) {
        console.log('❌ No images found in', INPUT_DIR);
        return;
    }

    console.log(`Found ${files.length} image(s) to optimize\n`);

    const results = [];
    let totalOriginalSize = 0;
    let totalOptimizedSize = 0;

    // Process each image
    for (const file of files) {
        const inputPath = path.join(INPUT_DIR, file);
        const backupPath = path.join(BACKUP_DIR, file);
        const outputPath = path.join(OUTPUT_DIR, file);

        // Backup original file
        fs.copyFileSync(inputPath, backupPath);

        // Optimize image
        const result = await optimizeImage(inputPath, outputPath);

        if (result) {
            results.push(result);
            totalOriginalSize += parseFloat(result.originalSize);
            totalOptimizedSize += parseFloat(result.optimizedSize);
        }

        console.log(''); // Empty line between files
    }

    // Print summary
    console.log('='.repeat(60));
    console.log('\n📊 OPTIMIZATION SUMMARY\n');
    console.log(`Total images processed: ${results.length}`);
    console.log(`Original total size: ${totalOriginalSize.toFixed(2)}KB`);
    console.log(`Optimized total size: ${totalOptimizedSize.toFixed(2)}KB`);
    console.log(`Total savings: ${((1 - totalOptimizedSize / totalOriginalSize) * 100).toFixed(1)}%`);
    console.log(`\n💾 Original files backed up to: ${BACKUP_DIR}`);
    console.log(`✨ Optimized files saved to: ${OUTPUT_DIR}`);
    console.log('\n🔧 NEXT STEPS:');
    console.log('1. Check the optimized images in ./public/optimized/');
    console.log('2. If satisfied, replace the original files in ./public/');
    console.log('3. Update image extensions to .webp in your code if needed');
    console.log('4. Delete the backup folder when done\n');
}

// Run the script
optimizeAllImages()
    .then(() => {
        console.log('✅ Optimization complete!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('❌ Optimization failed:', error);
        process.exit(1);
    });
