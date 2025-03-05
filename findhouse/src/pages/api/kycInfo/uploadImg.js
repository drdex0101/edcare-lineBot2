import { v2 as cloudinary } from 'cloudinary';
import { Pool } from 'pg';
import formidable from 'formidable';

// 设置 Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

// 设置 PostgreSQL 连接池
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false },
});

// 禁用 Next.js 默认的 body 解析
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Formidable Error:', err);
      return res.status(500).json({ success: false, message: 'Form parsing failed' });
    }

    const file = files.file;
    if (!file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    try {
      // 将文件上传到 Cloudinary
      const uploadResponse = await cloudinary.uploader.upload(file.filepath, {
        folder: 'uploads',
        resource_type: 'auto',
      });

      // 将上传信息插入数据库
      const insertQuery = `
        INSERT INTO upload (type, upload_url, created_ts, update_ts)
        VALUES ($1, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        RETURNING id;
      `;
      const values = ['image/jpeg', uploadResponse.secure_url];
      const result = await pool.query(insertQuery, values);
      const newId = result.rows[0].id;

      return res.status(201).json({
        success: true,
        up: uploadResponse.public_id,
        url: uploadResponse.secure_url,
        uploadId: newId,
      });
    } catch (error) {
      console.error('Upload Error:', error);
      return res.status(500).json({ success: false, message: 'Upload failed' });
    }
  });
}
