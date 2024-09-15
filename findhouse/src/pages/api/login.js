export default function handler(req, res) {
    const loginUrl = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_LINE_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.LINE_LOGIN_CALLBACK_URL)}&state=your_custom_state&scope=profile%20openid%20email`;
  
    res.redirect(loginUrl);
  }
  