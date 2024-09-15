import Link from "next/link";

const CopyrightFooter = () => {
  const menuItems = [
    { id: 1, name: "關於丞名", routeLink: "/about-us" },
    { id: 2, name: "熱銷建案", routeLink: "/blog-list-2" },
    { id: 3, name: "代銷業績", routeLink: "/gallery" },
    { id: 4, name: "仲介產品", routeLink: "/parallax-style" },
    { id: 5, name: "房市百科", routeLink: "/blog-list-1" },
    { id: 6, name: "聯絡我們", routeLink: "/contact" },
  ];
  
  return (
    <div className="row">
      <div >
        <div className="footer_menu_widget ">
          <ul>
            {menuItems.map((item) => (
              <li className="list-inline-item" key={item.id}>
                <Link href={item.routeLink}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer_menu_widget">
          <ul >
            <li className="list-inline-item" ><img src="/assets/images/icon/phone-call.png" alt="Phone" className='icon' />
             <a href="tel:05-5379899">05-5379899</a></li>
             <li className="list-inline-item" ><img src="/assets/images/icon/printer.png" alt="printer" className='icon' />
             <a href="tel:05-5337484">05-5337484</a></li>
            <li className="list-inline-item" ><img src="/assets/images/icon/placeholder.png" alt="placeholder" className='icon' />
            <a href="#">雲林縣斗六市成功二街15號</a></li>
          </ul>
        </div>
      </div>
      <div className='copyRight'>
        © Copyright © 2023-2024 丞名有限公司. All rights reserved.
      </div>
    </div>

  );
};

export default CopyrightFooter;
