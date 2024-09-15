import Link from "next/link";
import MobileMenuContent from "./MobileMenuContent";
import Image from "next/image";

const MobileMenu = () => {
  return (
    // <!-- Main Header Nav For Mobile -->
    <div className="stylehome1 h0 mega-menu-wrapper">
      <div className="mobile-menu">
        <div className="header stylehome1">
          <div className="main_logo_home2 text-center">
            <Image
              width={40}
              height={45}
              className="nav_logo_img contain mt20"
              src="/123.jpg"
                alt="/123.jpg"
            />
            <span className="mt20">一二三蔬果行&大方蔬果行</span>
          </div>
          {/* main_logo_home2 */}
          {/* menu_bar_home2 */}
        </div>
      </div>
      {/* <!-- /.mobile-menu --> */}
    </div>
  );
};

export default MobileMenu;
