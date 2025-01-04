import axios from 'axios';

export default async function handler(req, res) {
  const { code, state } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'Missing authorization code' });
  }

  try {
    // 使用 code 交换访问令牌
    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: process.env.NEXT_PUBLIC_LINE_REDIRECT_URI,
      client_id: process.env.NEXT_PUBLIC_LINE_CLIENT_ID,
      client_secret: process.env.LINE_CLIENT_SECRET,
    });

    const tokenResponse = await axios.post(
      'https://api.line.me/oauth2/v2.1/token',
      params,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // 使用访问令牌获取用户资料
    const profileResponse = await axios.get('https://api.line.me/v2/profile', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const userId = profileResponse.data.userId;
    const { access_token } = tokenResponse.data;

    // 设置 authToken Cookie
    const isSecure = process.env.NODE_ENV === 'production';
    res.setHeader(
      'Set-Cookie',
      `authToken=${access_token}; Path=/; HttpOnly; ${isSecure ? 'Secure;' : ''}`
    );
    // 重定向到 state（原始页面），并附加 userId 作为查询参数
    const redirectUrl = state ? `${state}?userId=${userId}` : `/?userId=${userId}`;
    res.redirect(redirectUrl);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
}
