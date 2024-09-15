import "react-pro-sidebar/dist/css/styles.css";
import {
  ProSidebar,
  SidebarHeader,
  SidebarFooter,
  Menu,
  MenuItem,
  SubMenu,
  SidebarContent,
} from "react-pro-sidebar";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

const home = [
  {
    id: 1,
    name: "首頁",
    routerPath: "/",
  },
];

const blog = [
  { id: 1, name: "熱銷建案", routerPath: "/blog-list-2" },
  { id: 2, name: "代銷業績", routerPath: "/gallery" },
];

const pages = [
  { id: 1, name: "About Us", routerPath: "/about-us" },
  { id: 2, name: "Gallery", routerPath: "/gallery" },
  { id: 3, name: "Faq", routerPath: "/faq" },
];

const MobileMenuContent = () => {
  const route = useRouter();
  return (
    <ProSidebar>
      <SidebarHeader>
        <div className="sidebar-header">
          <Link href="/" className="sidebar-header-inner">
            <Image
              width={40}
              height={45}
              className="nav_logo_img img-fluid mt20"
              src="/assets/images/丞名LOGO-03.png"
              alt="丞名LOGO-03.png"
            />
            <span className="brand-text">一二三蔬果行&大方蔬果行</span>
          </Link>
          {/* End .logo */}

          <div
            className="fix-icon"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            <span className="flaticon-close"></span>
          </div>
          {/* Mobile Menu close icon */}
        </div>

        {/* End logo */}
      </SidebarHeader>

      <SidebarContent>
        <Menu>
        <MenuItem>
            <Link
              href="/"
              className={
                route.pathname === "/" ? "ui-active" : undefined
              }
            >
              首頁
            </Link>
          </MenuItem>
          {/* End Home Home */}

          <MenuItem>
            <Link
              href="/about-us"
              className={
                route.pathname === "/about-us" ? "ui-active" : undefined
              }
            >
              關於丞名
            </Link>
          </MenuItem>

          <SubMenu title="代銷經典">
            {blog.map((item) => (
              <MenuItem key={item.id}>
                <Link
                  href={item.routerPath}
                  className={
                    route.pathname === item.routerPath ||
                    item.routerPath + "/[id]" === route.pathname
                      ? "ui-active"
                      : undefined
                  }
                >
                  {item.name}
                </Link>
              </MenuItem>
            ))}
          </SubMenu>
          <MenuItem>
            <Link
              href="/parallax-style"
              className={
                route.pathname === "/parallax-style" ? "ui-active" : undefined
              }
            >
              仲介產品
            </Link>
          </MenuItem>

          <MenuItem>
            <Link
              href="/blog-list-1"
              className={
                route.pathname === "/blog-list-1" ? "ui-active" : undefined
              }
            >
              房市百科
            </Link>
          </MenuItem>

          <MenuItem>
            <Link
              href="/contact"
              className={
                route.pathname === "/contact" ? "ui-active" : undefined
              }
            >
              聯絡我們
            </Link>
          </MenuItem>

        </Menu>
      </SidebarContent>
    </ProSidebar>
  );
};

export default MobileMenuContent;
