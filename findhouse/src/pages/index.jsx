'use client'; // 標識這是 Client Component

import Image from "next/image";

export default function Home() {
  const LINE_LOGIN_URL = "https://access.line.me/oauth2/v2.1/authorize";
  const LINE_CHANNEL_ID = process.env.NEXT_PUBLIC_LINE_CLIENT_ID;

  const handleLoginWithLine = () => {
    const params = new URLSearchParams({
      response_type: "code",
      client_id: LINE_CHANNEL_ID,
      redirect_uri: process.env.NEXT_PUBLIC_LINE_REDIRECT_URI,
      state: "random-state-value",
      scope: "profile openid email",
    });
  
    window.location.href = `${LINE_LOGIN_URL}?${params.toString()}`;
  };

  return (
    <div className="min-h-screen">
      <div style={{
        backgroundColor: '#f8ecec',
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <button
          className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#00c300] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          onClick={handleLoginWithLine}
        >
          <Image
            className="dark:invert"
            src="https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg"
            alt="LINE logomark"
            width={20}
            height={20}
          />
          按此綁定line會員
        </button>
      </div>
    </div>
  );
}
