import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, richMenuId } = req.body;

    try {
      // 綁定 Rich Menu 到用戶
      const response = await axios.post(
        `https://api.line.me/v2/bot/user/${userId}/richmenu/${richMenuId}`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CHANNEL_ACCESS_TOKEN}`,
          },
        }
      );
      res.status(200).json({ message: 'Rich Menu changed successfully!' });
    } catch (error) {
      console.error('Error changing Rich Menu:', error.response?.data || error.message);
      res.status(500).json({ error: 'Failed to change Rich Menu' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
  }
}
