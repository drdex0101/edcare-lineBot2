import { uploadGoogleFile } from './googleStorage'; // 假设 googleStorage.js 在 utils 文件夹下
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false, // 禁用 Next.js 的 body 解析以支持文件上传
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = formidable({ multiples: false });

    let filePath;
    let originalFilename;

    // 监听 file 事件，以确保文件成功解析
    form.on('file', (name, file) => {
      filePath = file.filepath || file.path;
      originalFilename = file.originalFilename || file.name;
    });

    // 监听 end 事件，确保文件解析结束后触发回调
    form.on('end', async () => {
      if (!filePath) {
        res.status(500).json({ error: '文件路径未定义' });
        return;
      }

      const destFileName = `uploads/${Date.now()}-${originalFilename}`;

      try {
        const fileUrl = await uploadGoogleFile(filePath, destFileName);
        res.status(200).json({ fileUrl });
      } catch (error) {
        res.status(500).json({ error: '上传到 Google Cloud Storage 失败', details: error.message });
      } finally {
        if (fs.existsSync(filePath)) {
          fs.unlink(filePath, (unlinkErr) => {
            if (unlinkErr) console.error('无法删除临时文件:', unlinkErr);
          });
        }
      }
    });

    // 解析请求
    form.parse(req);
  } else {
    res.status(405).json({ error: '仅支持 POST 请求' });
  }
}
