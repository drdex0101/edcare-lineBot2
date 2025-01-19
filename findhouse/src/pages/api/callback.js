import axios from "axios";

export default async function handler(req, res) {
  const { code, state } = req.query;

  if (!code) {
    return res.status(400).json({ error: "Missing authorization code" });
  }

  try {
    const params = new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: process.env.NEXT_PUBLIC_LINE_LOGIN_CALLBACK_URL,
      client_id: process.env.NEXT_PUBLIC_LINE_CLIENT_ID,
      client_secret: process.env.NEXT_PUBLIC_LINE_CLIENT_SECRET,
    });

    const tokenResponse = await axios.post(
      "https://api.line.me/oauth2/v2.1/token",
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;
    
    // 驗證 Access Token
    const tokenVerification = await axios.get("https://api.line.me/oauth2/v2.1/verify", {
      params: {
        access_token: accessToken,
      },
    });
    console.log("Token verification:", tokenVerification.data);

    // 使用 Access Token 獲取用戶資料
    const profileResponse = await axios.get("https://api.line.me/v2/profile", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    
    const profile = profileResponse.data;
    const userId = profile.userId;
    // Set the auth token and userId cookies before redirecting
    res.setHeader(
      'Set-Cookie',
      [
        `authToken=${accessToken}; Path=/; Secure; SameSite=Lax; Max-Age=3600`,
        `userId=${userId}; Path=/; Secure; SameSite=Lax; Max-Age=3600`,
      ]
    );

    res.redirect(state || '/');
  } catch (error) {
    console.error("Error fetching user profile:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
}
