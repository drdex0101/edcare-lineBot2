import Pagination from "../../common/blog/Pagination";
import Footer from "../../common/footer/Footer";
import GlobalHeroFilter from "../../common/GlobalHeroFilter";
import Header from "../../common/header/DefaultHeader";
import MobileMenu from "../../common/header/MobileMenu";
import FilterTopBar from "../../common/listing/FilterTopBar";
import PopupSignInUp from "../../common/PopupSignInUp";
import BreadCrumb from "./BreadCrumb2";
import FeaturedItem from "./FeaturedItem";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
const sortData = (data, sortCriteria) => {
  let sorted = [...data]; // 複製一個數據數組來排序
  switch (sortCriteria) {
    case 'old':
      sorted.sort((a, b) => a.id - b.id);
      break;
    case 'recent':
      sorted.sort((a, b) => b.id - a.id);
      break;
    case 'high':
      sorted.sort((a, b) => b.price - a.price);
      break;
    case 'low':
      sorted.sort((a, b) => a.price - b.price);
      break;
    default:
      // 預設新到舊
      sorted.sort((a, b) => b.id - a.id);
      break;
  }
  return sorted;
};
const Index = () => {
  // 使用useSelector鉤子從Redux store獲取價格範圍和排序類型
  // 假设每页显示的项目数量是固定的
  // Moved the sort state to the Index component
  const [sort, setSort] = useState('');
  const [type, setType] = useState('');
  const [keyword, setKeyword] = useState('');
  const itemsPerPage = 9;
  // 状态来管理所有的项目数据和当前页
  const [items, setItems] = useState([]); //原始API資料
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  let apiUrl =''
  // 一個排序或篩選數據的函數
  const handleSortAndFilter = (sortType, filterConditions) => {
    let newData = [...originalData]; // 複製原始數據以避免直接修改狀態

    // 添加排序條件
    if (sort) {
      newData = sortData(newData, sortType);
    }

    setFilteredData(newData); // 更新狀態以反映篩選和排序後的新數據
  };

  // 获取数据
  useEffect(() => {
    async function fetchData() {
      // 根据当前的查询参数构建API URL
      const queryParameters = {
        ...router.query,
        sort, // Add the sort stat  e to the query parameters
        type, // Add the type state to the query parameters
        keyword, // Add the type state to the query parameters
        // Add any other query parameters you might need
      };
    
      if ((sort=='' && type=='' && keyword=='') || (type=='全部' && keyword!='')){
        apiUrl='/api/getproperties'
      }
      else{
         apiUrl = `/api/filterData?${new URLSearchParams(queryParameters).toString()}`
         
      }
      try {
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          setItems(sortData(data,sort) );
          setKeyword(''); // 这会将输入重置为空字符串
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  },  [router.query,sort]); // 当路由的查询参数改变时，重新获取数据


  // 计算当前页的数据
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const currentItemCount = currentItems.length;
  // 定义分页函数
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      {/* <!-- Modal --> */}
      <PopupSignInUp />

      {/* <!-- 6th Home Design --> */}
      <section className="listing-home-bg parallax pt30-520 mt85 md-mt0">
        <div className="container">
          <div className="row posr">
            <div className="col-lg-12">
              <div className="home_content listing">
                <div className="home-text home6 text-center">
                  <h2 className="fz50 color-main">夢想生活 從這裡開始</h2>
                  <p className="fz18 color-gray">
                    為您在購屋第一線嚴選把關，找到最適生活圈，完美實現幸福未來．
                  </p>
                </div>
                <GlobalHeroFilter className="mt30" type={type} setType={setType} keyword={keyword} setKeyword={setKeyword}/>
              </div>
            </div>
            {/* End .col */}
          </div>
        </div>
        {/* End .container */}
      </section>
      <div className="divider "></div>
      {/* <!-- Listing Grid View --> */}
      <section className="our-listing bgc-f7 pb30-991 mt85 md-mt0 ">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <BreadCrumb />
            </div>
            {/* End .col */}
            {/* End .col filter grid list */}
          </div>
          {/* End Page Breadcrumb and Grid,List and filter Button */}

          <div className="row">
            <div className="col-12 ">
              <div className="grid_list_search_result ">
                <div className="row justify-content-end align-items-center">
                  <FilterTopBar data={items} currentItemCount={currentItemCount} sort={sort} setSort={setSort}/>
                </div>
              </div>
              {/* End .row */}
              <div className="row">
              <FeaturedItem  data={currentItems}/>
              </div>
              {/* End .row */}

              <div className="row">
                <div className="col-lg-12 mt20">
                  <div className="mbp_pagination">
                    <Pagination
                      itemsPerPage={itemsPerPage}
                      totalItems={items.length}
                      paginate={paginate}
                      currentPage={currentPage}
                    />
                  </div>
                </div>
                {/* End paginaion .col */}
              </div>
              {/* End .row */}
            </div>
            {/* End  .col */}

            
          </div>
          {/* End .row */}
        </div>
      </section>

      {/* <!-- Our Footer --> */}
      <section className="footer_one">
        <div className="container">
          <div className="row">
            <Footer />
          </div>
        </div>
      </section>

    </>
  );
};

export default Index;
