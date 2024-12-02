'use client'; // 標識這是 Client Component

import Image from "next/image";
import { useState } from 'react';

export default function Home() {
  const [loginUrl, setLoginUrl] = useState('');

  const handleLogin = async () => {
    const response = await fetch('/api/login');
    const data = await response.json();
    setLoginUrl(data.loginUrl);
    window.location.href = data.loginUrl; // 跳轉到 LINE Login
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
          onClick={handleLogin}
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
