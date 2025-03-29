import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import getClient from '../../../utils/getClient';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

export const config = {
  api: {
    bodyParser: false,
  },
};

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export default function handler(req, res) {
  if (req.method === 'POST') {
    const client = getClient();
    client.connect();

    upload.single('file')(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ success: false, message: '文件上传失败。' });
      }

      try {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: 'auto' },
          async (error, result) => {
            if (error) {
              return res.status(500).json({ success: false, message: '上传到 Cloudinary 时出错。' });
            }
            const insertQuery = `
              INSERT INTO upload (type, upload_url, created_ts, update_ts)
              VALUES ($1, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
              RETURNING id;
            `;
            const values = ['image/jpeg', result.secure_url];
            const result2 = await client.query(insertQuery, values);
            const newId = result2.rows[0].id;

            res.status(200).json({ 
              success: true,
              url: result.secure_url,
              uploadId: newId,
             });
          }
        );
        stream.end(req.file.buffer);

      } catch (error) {
        res.status(500).json({ success: false, message: error });
      }
    });
  } else {
    res.status(405).json({ success: false, message: '方法不被允许。' });
  }
}
