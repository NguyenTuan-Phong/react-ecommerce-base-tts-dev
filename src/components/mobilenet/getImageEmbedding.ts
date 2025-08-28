// import * as mobilenet from "@tensorflow-models/mobilenet";
// import * as tf from "@tensorflow/tfjs";
// 
// export async function getImageEmbedding(file: File): Promise<number[] | null> {
//     try {
//         await tf.setBackend("webgl");
//         await tf.ready();
//     } catch {
//         await tf.setBackend("cpu");
//         await tf.ready();
//     }
// 
//     // Load image
//     const img = document.createElement("img");
//     img.src = URL.createObjectURL(file);
//     await new Promise((resolve) => (img.onload = resolve));
// 
//     // Preprocess image: resize 224x224 + normalize [0,1]
//     const tfImg = tf.tidy(() => {
//         return tf.browser
//             .fromPixels(img)
//             .resizeBilinear([224, 224])
//             .toFloat()
//             .div(255)
//             .expandDims(0); // shape: [1, 224, 224, 3]
//     });
// 
//     // Load model and extract features
//     const model = await mobilenet.load();
//     const activation = model.infer(tfImg, true) as tf.Tensor; // shape: [1, 1024]
// 
//     const values = Array.from(await activation.data()) as number[]; // length: 1024
// 
//     // Mean pooling: chia thành 6 phần và lấy trung bình mỗi phần
//     const chunkSize = Math.floor(values.length / 6);
//     const pooled: number[] = [];
//     for (let i = 0; i < 6; i++) {
//         const start = i * chunkSize;
//         const end = i === 5 ? values.length : (i + 1) * chunkSize;
//         const chunk = values.slice(start, end);
//         const mean = chunk.reduce((sum, v) => sum + v, 0) / chunk.length;
//         pooled.push(mean);
//     }
// 
//     // Normalize vector về độ dài 1 (L2 norm)
//     const norm = Math.sqrt(pooled.reduce((sum, v) => sum + v * v, 0));
//     const normalized = pooled.map((v) => Number((v / norm).toFixed(6)));
// 
//     // Cleanup
//     tfImg.dispose();
//     activation.dispose();
//     URL.revokeObjectURL(img.src);
// 
//     return normalized;
// }

// import * as mobilenet from "@tensorflow-models/mobilenet";
// import * as tf from "@tensorflow/tfjs";
// 
// // Hàm trích xuất đặc trưng kết cấu (texture) từ ImageData
// function extractTextureFeatures(imageData: ImageData): number[] {
//     const data = imageData.data;
//     const width = imageData.width;
//     const height = imageData.height;
//     const features: number[] = [];
// 
//     // Chuyển sang grayscale
//     const gray = new Array(width * height);
//     for (let i = 0; i < data.length; i += 4) {
//         const idx = i / 4;
//         gray[idx] = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
//     }
// 
//     // Local Binary Pattern (LBP)
//     const lbpHist = new Array(256).fill(0);
//     for (let y = 1; y < height - 1; y++) {
//         for (let x = 1; x < width - 1; x++) {
//             const center = gray[y * width + x];
//             let lbp = 0;
//             const neighbors = [
//                 gray[(y-1) * width + (x-1)], gray[(y-1) * width + x], gray[(y-1) * width + (x+1)],
//                 gray[y * width + (x+1)], gray[(y+1) * width + (x+1)], gray[(y+1) * width + x],
//                 gray[(y+1) * width + (x-1)], gray[y * width + (x-1)]
//             ];
//             for (let i = 0; i < 8; i++) {
//                 if (neighbors[i] >= center) lbp += Math.pow(2, i);
//             }
//             lbpHist[lbp]++;
//         }
//     }
// 
//     const totalPatterns = (width - 2) * (height - 2);
//     features.push(...lbpHist.map(x => x / totalPatterns));
// 
//     // Gradient magnitude
//     const gradients: number[] = [];
//     for (let y = 1; y < height - 1; y++) {
//         for (let x = 1; x < width - 1; x++) {
//             const gx = gray[y * width + (x + 1)] - gray[y * width + (x - 1)];
//             const gy = gray[(y + 1) * width + x] - gray[(y - 1) * width + x];
//             gradients.push(Math.sqrt(gx * gx + gy * gy));
//         }
//     }
//     const gradMean = gradients.reduce((a, b) => a + b, 0) / gradients.length;
//     const gradStd = Math.sqrt(gradients.reduce((a, b) => a + (b - gradMean) ** 2, 0) / gradients.length);
//     features.push(gradMean / 255, gradStd / 255);
// 
//     return features;
// }
// 
// export async function getImageEmbedding(file: File): Promise<number[] | null> {
//     try {
//         await tf.setBackend("webgl");
//         await tf.ready();
//     } catch {
//         await tf.setBackend("cpu");
//         await tf.ready();
//     }
// 
//     // Load image
//     const img = document.createElement("img");
//     img.src = URL.createObjectURL(file);
//     await new Promise((resolve) => (img.onload = resolve));
// 
//     // Tạo canvas để lấy ImageData
//     const canvas = document.createElement("canvas");
//     canvas.width = 224;
//     canvas.height = 224;
//     const ctx = canvas.getContext("2d")!;
//     ctx.drawImage(img, 0, 0, 224, 224);
//     const imageData = ctx.getImageData(0, 0, 224, 224);
//     const textureFeatures = extractTextureFeatures(imageData); // 258 chiều
// 
//     // Xử lý ảnh đầu vào cho MobileNet
//     const tfImg = tf.tidy(() => {
//         return tf.browser
//             .fromPixels(imageData)
//             .toFloat()
//             .div(255)
//             .expandDims(0); // [1, 224, 224, 3]
//     });
// 
//     // Tải model và lấy đặc trưng
//     const model = await mobilenet.load();
//     const activation = model.infer(tfImg, true) as tf.Tensor; // [1, 1024]
//     const values = Array.from(await activation.data()) as number[];
// 
//     // Mean pooling: chia thành 6 phần và lấy trung bình
//     const chunkSize = Math.floor(values.length / 6);
//     const pooled: number[] = [];
//     for (let i = 0; i < 6; i++) {
//         const start = i * chunkSize;
//         const end = i === 5 ? values.length : (i + 1) * chunkSize;
//         const chunk = values.slice(start, end);
//         const mean = chunk.reduce((sum, v) => sum + v, 0) / chunk.length;
//         pooled.push(mean);
//     }
// 
//     // Gộp MobileNet + texture
//     const fullVector = pooled.concat(textureFeatures); // 6 + 258 = 264 chiều
// 
//     // ↓↓↓ Giảm về đúng 6 chiều ↓↓↓
//     const chunkSize6 = Math.floor(fullVector.length / 6);
//     const reduced6D: number[] = [];
//     for (let i = 0; i < 6; i++) {
//         const start = i * chunkSize6;
//         const end = i === 5 ? fullVector.length : (i + 1) * chunkSize6;
//         const chunk = fullVector.slice(start, end);
//         const mean = chunk.reduce((sum, v) => sum + v, 0) / chunk.length;
//         reduced6D.push(Number(mean.toFixed(6)));
//     }
// 
//     // Chuẩn hoá vector 6D
//     const norm = Math.sqrt(reduced6D.reduce((sum, v) => sum + v * v, 0));
//     const normalized = reduced6D.map((v) => Number((v / norm).toFixed(6)));
// 
//     // Cleanup
//     tfImg.dispose();
//     activation.dispose();
//     URL.revokeObjectURL(img.src);
// 
//     return normalized;
// }


// import * as mobilenet from "@tensorflow-models/mobilenet";
// import * as tf from "@tensorflow/tfjs";
// 
// // Trích xuất đặc trưng texture từ ảnh
// function extractTextureFeatures(imageData: ImageData): number[] {
//     const data = imageData.data;
//     const width = imageData.width;
//     const height = imageData.height;
//     const features: number[] = [];
// 
//     const gray = new Array(width * height);
//     for (let i = 0; i < data.length; i += 4) {
//         const idx = i / 4;
//         gray[idx] = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
//     }
// 
//     const lbpHist = new Array(256).fill(0);
//     for (let y = 1; y < height - 1; y++) {
//         for (let x = 1; x < width - 1; x++) {
//             const center = gray[y * width + x];
//             let lbp = 0;
//             const neighbors = [
//                 gray[(y-1)*width + (x-1)], gray[(y-1)*width + x], gray[(y-1)*width + (x+1)],
//                 gray[y*width + (x+1)], gray[(y+1)*width + (x+1)], gray[(y+1)*width + x],
//                 gray[(y+1)*width + (x-1)], gray[y*width + (x-1)]
//             ];
//             for (let i = 0; i < 8; i++) {
//                 if (neighbors[i] >= center) lbp += (1 << i);
//             }
//             lbpHist[lbp]++;
//         }
//     }
// 
//     const totalPatterns = (width - 2) * (height - 2);
//     features.push(...lbpHist.map(x => x / totalPatterns));
// 
//     const gradients: number[] = [];
//     for (let y = 1; y < height - 1; y++) {
//         for (let x = 1; x < width - 1; x++) {
//             const gx = gray[y * width + (x + 1)] - gray[y * width + (x - 1)];
//             const gy = gray[(y + 1) * width + x] - gray[(y - 1) * width + x];
//             gradients.push(Math.sqrt(gx * gx + gy * gy));
//         }
//     }
// 
//     const gradMean = gradients.reduce((a, b) => a + b, 0) / gradients.length;
//     const gradStd = Math.sqrt(gradients.reduce((a, b) => a + (b - gradMean) ** 2, 0) / gradients.length);
//     features.push(gradMean / 255, gradStd / 255);
// 
//     return features;
// }
// 
// // Hàm chính trả về vector 6 chiều đã chuẩn hoá
// export async function getImageEmbedding(file: File): Promise<number[] | null> {
//     try {
//         await tf.setBackend("webgl");
//         await tf.ready();
//     } catch {
//         await tf.setBackend("cpu");
//         await tf.ready();
//     }
// 
//     const img = document.createElement("img");
//     img.src = URL.createObjectURL(file);
//     await new Promise((resolve) => (img.onload = resolve));
// 
//     const canvas = document.createElement("canvas");
//     canvas.width = 224;
//     canvas.height = 224;
//     const ctx = canvas.getContext("2d")!;
//     ctx.drawImage(img, 0, 0, 224, 224);
//     const imageData = ctx.getImageData(0, 0, 224, 224);
// 
//     // Trích xuất đặc trưng texture
//     const textureFeatures = extractTextureFeatures(imageData); // 258 chiều
// 
//     // Trích xuất đặc trưng Mobilenet
//     const tfImg = tf.tidy(() => {
//         return tf.browser.fromPixels(imageData).toFloat().div(255).expandDims(0);
//     });
// 
//     const model = await mobilenet.load();
//     const activation = model.infer(tfImg, true) as tf.Tensor; // [1, 1024]
//     const mobilenetValues = Array.from(await activation.data()) as number[];
// 
//     // Gộp toàn bộ đặc trưng
//     const fullFeatures = mobilenetValues.concat(textureFeatures); // 1024 + 258 = 1282
// 
//     // Giảm xuống 6 chiều bằng chia đoạn trung bình
//     const chunkSize = Math.floor(fullFeatures.length / 6);
//     const reduced6D: number[] = [];
//     for (let i = 0; i < 6; i++) {
//         const start = i * chunkSize;
//         const end = i === 5 ? fullFeatures.length : (i + 1) * chunkSize;
//         const chunk = fullFeatures.slice(start, end);
//         const mean = chunk.reduce((sum, v) => sum + v, 0) / chunk.length;
//         reduced6D.push(Number(mean.toFixed(6)));
//     }
// 
//     // Chuẩn hoá L2
//     const norm = Math.sqrt(reduced6D.reduce((sum, v) => sum + v * v, 0));
//     const normalized = reduced6D.map(v => Number((v / norm).toFixed(6)));
// 
//     tfImg.dispose();
//     activation.dispose();
//     URL.revokeObjectURL(img.src);
// 
//     return normalized;
// }

import * as tf from "@tensorflow/tfjs";

// Hàm chuyển đổi RGB → HSV
function rgbToHsv(r: number, g: number, b: number) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;
    let h = 0;

    if (diff !== 0) {
        if (max === r) h = ((g - b) / diff) % 6;
        else if (max === g) h = (b - r) / diff + 2;
        else h = (r - g) / diff + 4;
    }
    h = (h * 60 + 360) % 360;
    const s = max === 0 ? 0 : diff / max;
    const v = max;
    return { h, s, v };
}

// Trích xuất đặc trưng màu (Color)
function extractColorFeatures(imageData: ImageData): number[] {
    const data = imageData.data;
    const features: number[] = [];
    const rgbBins = 32, hsvBins = 32;
    const rHist = new Array(rgbBins).fill(0);
    const gHist = new Array(rgbBins).fill(0);
    const bHist = new Array(rgbBins).fill(0);
    const hHist = new Array(hsvBins).fill(0);
    const sHist = new Array(hsvBins).fill(0);
    const vHist = new Array(hsvBins).fill(0);

    for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i + 1], b = data[i + 2];
        rHist[Math.floor((r / 255) * (rgbBins - 1))]++;
        gHist[Math.floor((g / 255) * (rgbBins - 1))]++;
        bHist[Math.floor((b / 255) * (rgbBins - 1))]++;
        const hsv = rgbToHsv(r, g, b);
        hHist[Math.min(Math.floor((hsv.h / 360) * (hsvBins - 1)), hsvBins - 1)]++;
        sHist[Math.floor(hsv.s * (hsvBins - 1))]++;
        vHist[Math.floor(hsv.v * (hsvBins - 1))]++;
    }

    const totalPixels = data.length / 4;
    features.push(...rHist.map(x => x / totalPixels));
    features.push(...gHist.map(x => x / totalPixels));
    features.push(...bHist.map(x => x / totalPixels));
    features.push(...hHist.map(x => x / totalPixels));
    features.push(...sHist.map(x => x / totalPixels));
    features.push(...vHist.map(x => x / totalPixels));

    // Color moments
    let rMean = 0, gMean = 0, bMean = 0;
    for (let i = 0; i < data.length; i += 4) {
        rMean += data[i]; gMean += data[i + 1]; bMean += data[i + 2];
    }
    rMean /= totalPixels;
    gMean /= totalPixels;
    bMean /= totalPixels;
    features.push(rMean / 255, gMean / 255, bMean / 255);

    return features;
}

// Trích xuất đặc trưng kết cấu (Texture)
function extractTextureFeatures(imageData: ImageData): number[] {
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    const gray = new Array(width * height);
    for (let i = 0; i < data.length; i += 4) {
        const idx = i / 4;
        gray[idx] = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    }

    const lbpHist = new Array(256).fill(0);
    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            const center = gray[y * width + x];
            let lbp = 0;
            const neighbors = [
                gray[(y-1)*width + (x-1)], gray[(y-1)*width + x], gray[(y-1)*width + (x+1)],
                gray[y*width + (x+1)], gray[(y+1)*width + (x+1)], gray[(y+1)*width + x],
                gray[(y+1)*width + (x-1)], gray[y*width + (x-1)]
            ];
            for (let i = 0; i < 8; i++) {
                if (neighbors[i] >= center) lbp += (1 << i);
            }
            lbpHist[lbp]++;
        }
    }

    const totalPatterns = (width - 2) * (height - 2);
    const lbpNormalized = lbpHist.map(x => x / totalPatterns);

    const gradients: number[] = [];
    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            const gx = gray[y * width + (x + 1)] - gray[y * width + (x - 1)];
            const gy = gray[(y + 1) * width + x] - gray[(y - 1) * width + x];
            gradients.push(Math.sqrt(gx * gx + gy * gy));
        }
    }
    const gradMean = gradients.reduce((a, b) => a + b, 0) / gradients.length;
    const gradStd = Math.sqrt(gradients.reduce((a, b) => a + (b - gradMean) ** 2, 0) / gradients.length);

    return [...lbpNormalized, gradMean / 255, gradStd / 255];
}

// Giảm chiều về size = 6 và chuẩn hóa L2
function normalizeToSize(features: number[], targetSize: number): number[] {
    const chunkSize = features.length / targetSize;
    const reduced: number[] = [];

    for (let i = 0; i < targetSize; i++) {
        const start = Math.floor(i * chunkSize);
        const end = Math.floor((i + 1) * chunkSize);
        const chunk = features.slice(start, end);
        const mean = chunk.reduce((sum, val) => sum + val, 0) / chunk.length;
        reduced.push(mean);
    }

    const norm = Math.sqrt(reduced.reduce((sum, val) => sum + val * val, 0));
    return norm > 0 ? reduced.map(val => Number((val / norm).toFixed(6))) : reduced;
}

// Hàm chính: xuất vector 6 chiều từ ảnh
export async function getImageEmbedding(file: File): Promise<number[] | null> {
    await tf.setBackend("webgl").catch(() => tf.setBackend("cpu"));
    await tf.ready();

    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    await new Promise(resolve => (img.onload = resolve));

    const canvas = document.createElement("canvas");
    canvas.width = 224;
    canvas.height = 224;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0, 224, 224);
    const imageData = ctx.getImageData(0, 0, 224, 224);

    const color = extractColorFeatures(imageData);
    const texture = extractTextureFeatures(imageData);
    const combined = [
        ...color.map(x => x * 0.7),
        ...texture.map(x => x * 0.3),
    ];

    URL.revokeObjectURL(img.src);
    return normalizeToSize(combined, 6);
}
