import { v2 as cloudinary } from "cloudinary";
import { Pool } from 'pg'; // 引入 PostgreSQL 客戶端

// 設定 Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

// 設定 PostgreSQL 連接池
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false },
});


export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  try {
    const { file } = req.body; // ✅ 直接從 `req.body` 讀取 `file`
    if (!file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    console.log("Uploading file to Cloudinary...");

    // **將 Base64 圖片直接上傳**
    const uploadResponse = await cloudinary.uploader.upload(file, {
      folder: "uploads",
      resource_type: "auto",
    });

    console.log("Cloudinary Upload Response:", uploadResponse);

    // **插入資料到資料庫**
    const insertQuery = `
      INSERT INTO upload (type, upload_url, created_ts, update_ts) 
      VALUES ($1, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      RETURNING id; -- 返回新插入的 ID
    `;

    const values = ['image/jpeg', uploadResponse.secure_url]; // 使用 Cloudinary 的 URL
    const result = await pool.query(insertQuery, values); // 執行插入操作
    const newId = result.rows[0].id;
    await pool.query(insertQuery, values); // 執行插入操作

    return res.status(201).json({
      success: true,
      up: uploadResponse.public_id,
      url: uploadResponse.secure_url,
      uploadId:newId
    });
  } catch (error) {
    console.error("Upload Error:", error);
    return res.status(500).json({ success: false, message: "Upload failed" });
  }
}
