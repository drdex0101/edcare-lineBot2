import Link from "next/link";
import { useRouter } from "next/router";

const HeaderMenuContent = ({ float = "" }) => {
  const route = useRouter();

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

  return (
    <ul
      id="respMenu"
      className="ace-responsive-menu text-end d-lg-block d-none"
      data-menu-style="horizontal"
    >
      <li className="last">
        <Link
          href="/"
          className={route.pathname === "/" ? "ui-active" : undefined}
        >
          首頁
        </Link>
      </li>
      <li className="last">
        <Link
          href="/about-us"
          className={route.pathname === "/about-us" ? "ui-active" : undefined}
        >
          關於丞名
        </Link>
      </li>
      {/* End .dropitem */}

      <li className="dropitem">
        <a
          href="#"
          className={
            blog.some(
              (page) =>
                page.routerPath === route.pathname ||
                page.routerPath + "/[id]" === route.pathname
            )
              ? "ui-active"
              : undefined
          }
        >
          <span className="title">代銷經典</span>
          <span className="arrow"></span>
        </a>
        <ul className="sub-menu ">
          {blog.map((item) => (
            <li key={item.id}>
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
            </li>
          ))}
        </ul>
      </li>
      <li className="last">
        <Link
          href="/parallax-style"
          className={route.pathname === "/parallax-style" ? "ui-active" : undefined}
        >
          仲介產品
        </Link>
      </li>
      <li className="last">
        <Link
          href="/blog-list-1"
          className={route.pathname === "/blog-list-1" ? "ui-active" : undefined}
        >
          房市百科
        </Link>
      </li>
      {/* End .dropitem */}

      {/* End .dropitem */}
      <li className="last">
        <Link
          href="/contact"
          className={route.pathname === "/contact" ? "ui-active" : undefined}
        >
          聯絡我們
        </Link>
      </li>
      {/* End .dropitem */}
    </ul>
  );
};

export default HeaderMenuContent;
