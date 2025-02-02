import { Client } from 'pg';
import { v2 as cloudinary } from 'cloudinary';
import formidable from 'formidable';
import fs from 'fs/promises';

// 設定 Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

// **Next.js 預設不解析 `multipart/form-data`，所以要關閉 `bodyParser`**
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  try {
    // **使用 `formidable` 解析 `multipart/form-data`**
    const form = formidable({
      multiples: false, // 只允許單一檔案
      keepExtensions: true, // 保持副檔名
    });

    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    const { type } = fields;
    const file = files.file; // **確保 `file` 存在**

    if (!file) {
      return res.status(400).json({ success: false, message: "No file provided" });
    }

    // **上傳到 Cloudinary**
    const uploadResponse = await cloudinary.uploader.upload(file.filepath, {
      folder: "uploads",
    });

    // **刪除本地暫存檔案**
    await fs.unlink(file.filepath);

    // **連接 PostgreSQL**
    const client = new Client({
      connectionString: process.env.POSTGRES_URL,
      ssl: { rejectUnauthorized: false },
    });

    await client.connect();

    // **插入資料庫**
    const query = `
      INSERT INTO upload (type, upload_url, created_ts, update_ts) 
      VALUES ($1, $2, NOW(), NOW()) 
      RETURNING id;
    `;
    const values = [type || "default", uploadResponse.secure_url];
    const result = await client.query(query, values);

    await client.end();

    return res.status(201).json({
      success: true,
      uploadId: result.rows[0].id,
      imageUrl: uploadResponse.secure_url,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    return res.status(500).json({ success: false, message: "Upload failed" });
  }
}
