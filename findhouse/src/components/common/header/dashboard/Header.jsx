import Link from "next/link";
import { useEffect, useState } from "react";
import HeaderMenuContent from "./HeaderMenuContent";
import Image from "next/image";

const Header = () => {
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 95) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
  }, []);

  return (
    <header
      className={`header-nav menu_style_home_one style2 navbar-scrolltofixed stricky main-menu  ${
        navbar ? "stricky-fixed " : ""
      }`}
    >
      <div className="container-fluid p0">
        {/* <!-- Menu Toggle btn--> */}
        <Link href="#" className="navbar_brand float-start dn-smd">
          <span>一二三蔬果行&大方蔬果行</span>
        </Link>
        {/* site logo brand */}
        {/* End .navbar */}
      </div>
      <nav>
          <HeaderMenuContent />
        </nav>
    </header>
    // {/* <!-- /.theme-main-menu --> */}
  );
};

export default Header;
