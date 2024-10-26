import Footer from "../common/footer/Footer";
import MobileFooter from "../common/footer/MobileFooter";
import MobileMenu from "../common/header/MobileMenu";
import Header from "./Header";
import Hero from "./Hero";
import PackageData from "../dashboard/my-package/PackageData";
import PackageDataMobile from "../dashboard/my-package/PackageDataMobile";
import Pagination from "../dashboard/my-properties/Pagination";
import PopupSignInUp from "../common/PopupSignInUp";
import React from 'react';
import { useEffect, useState } from 'react';
const Index = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // 可根据需要调整每页项目数
  const [vegetableType, setVegetableType] = useState('蔬果根莖類');
  useEffect(() => {
    async function fetchData() {
      try {
        // 根据选中的类型构造 URL
        const url = `/api/getproperties?type=${encodeURIComponent(vegetableType)}`;
        const response = await fetch(url);
        if (response.ok) {
          const result = await response.json();
          setData(result);
        } else {
          console.error("Error fetching data:", await response.text());
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    }

    fetchData();
  }, [vegetableType]); // 当 propertyType 变化时重新获取数据
  // 计算当前页的数据
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const currentItemCount = currentItems.length;
  // 更新页码
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mediaQuery.matches);

    const handler = (e) => setIsMobile(e.matches);
    mediaQuery.addListener(handler);
    return () => mediaQuery.removeListener(handler);
  }, []);
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());

  useEffect(() => {
    // 每天更新一次日期
    const interval = setInterval(() => {
      setCurrentDate(new Date().toLocaleDateString());
    }, 24 * 60 * 60 * 1000); // 设置为24小时更新一次

    // 清理定时器
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />
      
      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      {/* <!-- Modal --> */}
      <PopupSignInUp />
      <Hero />
      <div id="root">
      <div  style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <div style={{height:'70px',fontWeight:700,fontSize: isMobile ? '20px' : '30px',display:'flex',alignItems:'center',color:'black'}}>時價表</div>
          <div >
          <select style={{
            borderColor: 'black', // 设置边框颜色为蓝色
            borderWidth: '2px', // 设置边框宽度为2px
            height: '70px', // 设置选择框的高度
            fontSize: isMobile ? '20px' : '30px', // 设置文字的大小
            borderRadius: '20px', // 设置边框圆角
            textAlign: 'center', // 设置文字居中
            borderStyle: 'solid', // 设置边框样式为实线
            fontWeight:700,
            margin:15
          }}  value={vegetableType} onChange={e => setVegetableType(e.target.value)}>
            <option value="蔬果根莖類">蔬果根莖類</option>
            <option value="菇類">菇類</option>
            <option value="其他類">其他類</option>
            <option value="豆蛋類">豆蛋類</option>
            <option value="冷凍類">冷凍類</option>
            <option value="筍類醃菜類">筍類醃菜類</option>
            <option value="生鮮類">生鮮類</option>
            <option value="香料類">香料類</option>
            {/* 更多类别选项 */}
          </select>
          </div>
          <div style={{color:'black',height:'70px',fontSize: isMobile ? '20px' : '30px',display:'flex',alignItems:'center',fontWeight:700}}>{currentDate}</div>
        </div>
      <div >
        {/* <!-- Our Dashbord --> */}
        <div style={{display:'flex',justifyContent:'center'}}>
        {isMobile ? (
          <PackageDataMobile fullcontact={data} setFullContact={setData} />
        ) : (
          <PackageData fullcontact={data} setFullContact={setData} />
        )}
        </div>
      </div>
      
      {/* <!-- Our Footer --> */}
      </div>
      <section className="footer_one">
      {isMobile ? (
          <MobileFooter  />
        ) : (
          <Footer />
        )}
      </section>
    </>
  );
};

export default Index;
