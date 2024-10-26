import Image from "next/image";
import React, { useState, useEffect } from 'react';
const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <=1025);
    };

    // 初始化检测
    handleResize();

    // 监听后续尺寸变化
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const className = isMobile
    ? 'inner_page_breadcrumb_main inner_page_breadcrumb_main_mobile'
    : 'inner_page_breadcrumb_main';
  return (
    <section className={className}>

      <div className="mouse_scroll">
        <a href="#feature-property">
          <div className="icon">
            <h4>Scroll Down</h4>
            <p>to discover more</p>
          </div>
          <div className="thumb">
            <Image
              width={21}
              height={35}
              src="/assets/images/resource/mouse.png"
              alt="mouse.png"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
