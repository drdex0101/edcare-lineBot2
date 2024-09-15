import Link from "next/link";
import Social from "./Social";
import SubscribeForm from "./SubscribeForm";

const Footer = () => {
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
      <div>
        <div className="footer_menu_widget">
          <ul >
            <div>
            <li style={{color:'white',textAlign:'center'}}>代客採買/專業配送/蔬果批發.零售/各類蔬果加工</li>
            <li className="list-inline-item" ><img src="/assets/images/icon/phone-call.png" alt="Phone" className='icon' />
             <a href="tel:05-5379899">0923-808699</a></li>
             <li className="list-inline-item" ><img src="/assets/images/icon/printer.png" alt="printer" className='icon' />
             <a href="tel:05-5337484">07-5818808</a></li>
            <li className="list-inline-item" ><img src="/assets/images/icon/placeholder.png" alt="placeholder" className='icon' />
            <a href="#">高雄市左營區菜公路143號</a></li>
            <li style={{color:'white',textAlign:'center'}}>(一二三)統編:10204088/(大方)統編:82750613</li>
            </div>
          </ul>
          <div style={{paddingRight:20}}><img src="qrcode.png" height={70} width={70}  alt="qrcode"/></div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
