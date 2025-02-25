import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Pagination from '../../../components/base/pagenation';
import SearchBarSortOnly from '../../../components/base/SearchBarSortOnly';
import './favorite.css';
import LoadingAnimation from '../../../components/base/loading';
const ApplicationPage = () => {
  const router = useRouter();
  const [nannyInfo, setNannyInfo] = useState([]);
  const [orderInfo, setOrderInfo] = useState([]);
  const [totalItem, setTotalItem] = useState(0);
  const [currentPage, setCurrentPage] = useState(0); // Track current page
  const pageSize = 5;
  const [isLoading, setIsLoading] = useState(true);
  const [keywords, setKeywords] = useState('');
  const [selectedSort, setSelectedSort] = useState('time'); // 新增狀態以追蹤選擇的排序
  const [orderImages, setOrderImages] = useState({});
  const [careTypeData, setCareTypeData] = useState(null);
  const [isShow, setIsShow] = useState(true);
  const [orderCurrentPage, setOrderCurrentPage] = useState(1);
  const itemsPerPage = 1; // 每頁顯示 1 筆
  // 計算目前頁面的資料
  const indexOfLastItem = orderCurrentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = orderInfo.slice(indexOfFirstItem, indexOfLastItem);

  const fetchNannyInfoList = async (page, pageSize=5,  keywords, selectedSort) => {
    setIsLoading(true); // Set loading state to true while fetching data
    try {
      const response = await fetch(`/api/nanny/getNannyInfoList?page=${page}&pageSize=${pageSize}&sort=${selectedSort}&keyword=${keywords}`, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      
      // Add image loading for nannies
      const nannyImagePromises = data.nannies.map(async (nanny) => {
        if (nanny.uploadid) {
          const imgResponse = await fetch(`/api/base/getImgUrl?id=${nanny.uploadid}`);
          const imgData = await imgResponse.json();
          return { ...nanny, image: imgData.url };
        }
        return nanny;
      });

      const nanniesWithImages = await Promise.all(nannyImagePromises);
      setNannyInfo(nanniesWithImages);
      setTotalItem(data.totalCount);
    } catch (error) {
      console.error('Error fetching nanny info:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFetchClick = () => {
    fetchNannyInfoList(currentPage, pageSize, keywords);
    fetchOrderInfo();
  };
  

  const fetchOrderInfo = async () => {
    setIsLoading(true);
    let userId = null;

    try {
      const cookies = document.cookie.split('; ');
      const userIdCookie = cookies.find(row => row.startsWith('userId='));
      if (userIdCookie) {
        userId = userIdCookie.split('=')[1];
      } else {
        throw new Error('userId not found in cookies');
      }

      if (!userId) {
        throw new Error('Invalid userId');
      }

      const response = await fetch(`/api/order/getOrderInfo?userId=${userId}`, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
        },
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data = await response.json();
      if (data) {
        setOrderInfo(data.nannies);
        const imagePromises = data.nannies.map(async (order) => {
          if (order.uploadId) {
            const imgResponse = await fetch(`/api/base/getImgUrl?id=${order.uploadId}`);
            const imgData = await imgResponse.json();
            return { orderId: order.id, imageUrl: imgData.url };
          }
          return null;
        });

        const images = await Promise.all(imagePromises);
        const imageMap = {};
        images.forEach(img => {
          if (img) {
            imageMap[img.orderId] = img.imageUrl;
          }
        });
        setOrderImages(imageMap);
        if (data.nannies[0].choosetype === 'suddenly') {
          const careTypeResponse = await fetch(`/api/base/getSuddenly?id=${data.nannies[0].caretypeid}`);
          const careTypeDatas = await careTypeResponse.json();
          setCareTypeData(careTypeDatas.data);
        } else if (data.nannies[0].choosetype === 'longTerm') {
          const careTypeResponse = await fetch(`/api/base/getLongTern?id=${data.nannies[0].caretypeid}`);
          const careTypeDatas = await careTypeResponse.json();
          setCareTypeData(careTypeDatas.data);
        }
      } else {
        throw new Error('No order information found in the response');
      }

    } catch (error) {
      console.error('Error fetching order info:', error.message);
    } finally {
      setIsLoading(false);
    }
  };



useEffect(() => {
  let isCancelled = false;

  const fetchData = async () => {
    try {
      setIsLoading(true);
      if (!isCancelled) {
        await fetchNannyInfoList(currentPage, pageSize, keywords);
        await fetchOrderInfo();
        setIsLoading(true);
        setIsShow(orderInfo.isShow);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      if (!isCancelled) setIsLoading(false);
    }
  };

  fetchData();

  return () => {
    isCancelled = true;  // 在組件卸載時取消請求
  };
}, [currentPage,keywords]);  // 監聽關鍵依賴變數

  const handlePageChange = (page) => {
    console.log('page:',page)
    setCurrentPage(page); // Update currentPage when a new page is selected
  };

  const handleFilterChange = (sorts) => {
    setSelectedSort(sorts);
    fetchNannyInfoList(currentPage, pageSize, keywords,selectedSort); // Fetch nanny info with updated filters
  };

  return (
    <div style={styles.main}>
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <>
            <div style={styles.headerSetting}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none">
                    <path d="M9 6.78512C8.36422 6.78512 7.74272 6.97365 7.21408 7.32687C6.68545 7.68009 6.27343 8.18214 6.03013 8.76952C5.78683 9.35691 5.72317 10.0033 5.8472 10.6268C5.97124 11.2504 6.2774 11.8232 6.72696 12.2727C7.17652 12.7223 7.74931 13.0284 8.37287 13.1525C8.99643 13.2765 9.64278 13.2129 10.2302 12.9696C10.8175 12.7263 11.3196 12.3142 11.6728 11.7856C12.026 11.257 12.2146 10.6355 12.2146 9.99968C12.212 9.14791 11.8725 8.33175 11.2702 7.72945C10.6679 7.12716 9.85177 6.78766 9 6.78512ZM15.9402 9.99968C15.9386 10.3001 15.9166 10.6 15.8743 10.8974L17.8308 12.4291C17.916 12.4994 17.9734 12.5978 17.9928 12.7066C18.0122 12.8154 17.9922 12.9275 17.9365 13.023L16.0857 16.2183C16.0294 16.3128 15.9416 16.3846 15.8377 16.4208C15.7338 16.457 15.6204 16.4555 15.5175 16.4164L13.2171 15.4922C12.7381 15.861 12.2139 16.1672 11.6572 16.4031L11.3133 18.8454C11.294 18.9548 11.2374 19.0541 11.153 19.1263C11.0687 19.1986 10.9618 19.2393 10.8508 19.2416H7.14921C7.04018 19.2394 6.93509 19.2004 6.85109 19.1309C6.76709 19.0613 6.70915 18.9653 6.68672 18.8586L6.34276 16.4164C5.78458 16.1832 5.26 15.8765 4.78289 15.5046L2.48247 16.4288C2.37964 16.468 2.2663 16.4696 2.16238 16.4334C2.05847 16.3973 1.97062 16.3256 1.9143 16.2311L0.0635113 13.0362C0.007802 12.9408 -0.0121561 12.8287 0.00720345 12.7199C0.026563 12.6111 0.0839787 12.5127 0.16919 12.4424L2.12565 10.9106C2.08392 10.6087 2.06191 10.3044 2.05976 9.99968C2.06143 9.69932 2.08344 9.39941 2.12565 9.10202L0.16919 7.57028C0.0839787 7.49992 0.026563 7.40155 0.00720345 7.29275C-0.0121561 7.18396 0.007802 7.07182 0.0635113 6.97639L1.9143 3.78111C1.97056 3.68652 2.05838 3.6148 2.1623 3.57857C2.26622 3.54233 2.37959 3.54391 2.48247 3.58301L4.78289 4.5072C5.26191 4.13833 5.78612 3.83221 6.34276 3.59627L6.68672 1.15401C6.70597 1.04461 6.76261 0.945296 6.84697 0.873032C6.93133 0.800769 7.03816 0.760042 7.14921 0.757812H10.8508C10.9598 0.759935 11.0649 0.798955 11.1489 0.868505C11.2329 0.938054 11.2909 1.03402 11.3133 1.14075L11.6572 3.58301C12.2161 3.81606 12.7414 4.12268 13.2191 4.49474L15.5175 3.57056C15.6204 3.53141 15.7337 3.52978 15.8376 3.56594C15.9415 3.6021 16.0294 3.67373 16.0857 3.76825L17.9365 6.96353C17.9922 7.05896 18.0122 7.1711 17.9928 7.2799C17.9734 7.38869 17.916 7.48706 17.8308 7.55742L15.8743 9.08916C15.9161 9.39091 15.9381 9.69507 15.9402 9.99968Z" fill="#252525"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none">
                    <path d="M9 6.78512C8.36422 6.78512 7.74272 6.97365 7.21408 7.32687C6.68545 7.68009 6.27343 8.18214 6.03013 8.76952C5.78683 9.35691 5.72317 10.0033 5.8472 10.6268C5.97124 11.2504 6.2774 11.8232 6.72696 12.2727C7.17652 12.7223 7.74931 13.0284 8.37287 13.1525C8.99643 13.2765 9.64278 13.2129 10.2302 12.9696C10.8175 12.7263 11.3196 12.3142 11.6728 11.7856C12.026 11.257 12.2146 10.6355 12.2146 9.99968C12.212 9.14791 11.8725 8.33175 11.2702 7.72945C10.6679 7.12716 9.85177 6.78766 9 6.78512ZM15.9402 9.99968C15.9386 10.3001 15.9166 10.6 15.8743 10.8974L17.8308 12.4291C17.916 12.4994 17.9734 12.5978 17.9928 12.7066C18.0122 12.8154 17.9922 12.9275 17.9365 13.023L16.0857 16.2183C16.0294 16.3128 15.9416 16.3846 15.8377 16.4208C15.7338 16.457 15.6204 16.4555 15.5175 16.4164L13.2171 15.4922C12.7381 15.861 12.2139 16.1672 11.6572 16.4031L11.3133 18.8454C11.294 18.9548 11.2374 19.0541 11.153 19.1263C11.0687 19.1986 10.9618 19.2393 10.8508 19.2416H7.14921C7.04018 19.2394 6.93509 19.2004 6.85109 19.1309C6.76709 19.0613 6.70915 18.9653 6.68672 18.8586L6.34276 16.4164C5.78458 16.1832 5.26 15.8765 4.78289 15.5046L2.48247 16.4288C2.37964 16.468 2.2663 16.4696 2.16238 16.4334C2.05847 16.3973 1.97062 16.3256 1.9143 16.2311L0.0635113 13.0362C0.007802 12.9408 -0.0121561 12.8287 0.00720345 12.7199C0.026563 12.6111 0.0839787 12.5127 0.16919 12.4424L2.12565 10.9106C2.08392 10.6087 2.06191 10.3044 2.05976 9.99968C2.06143 9.69932 2.08344 9.39941 2.12565 9.10202L0.16919 7.57028C0.0839787 7.49992 0.026563 7.40155 0.00720345 7.29275C-0.0121561 7.18396 0.007802 7.07182 0.0635113 6.97639L1.9143 3.78111C1.97056 3.68652 2.05838 3.6148 2.1623 3.57857C2.26622 3.54233 2.37959 3.54391 2.48247 3.58301L4.78289 4.5072C5.26191 4.13833 5.78612 3.83221 6.34276 3.59627L6.68672 1.15401C6.70597 1.04461 6.76261 0.945296 6.84697 0.873032C6.93133 0.800769 7.03816 0.760042 7.14921 0.757812H10.8508C10.9598 0.759935 11.0649 0.798955 11.1489 0.868505C11.2329 0.938054 11.2909 1.03402 11.3133 1.14075L11.6572 3.58301C12.2161 3.81606 12.7414 4.12268 13.2191 4.49474L15.5175 3.57056C15.6204 3.53141 15.7337 3.52978 15.8376 3.56594C15.9415 3.6021 16.0294 3.67373 16.0857 3.76825L17.9365 6.96353C17.9922 7.05896 18.0122 7.1711 17.9928 7.2799C17.9734 7.38869 17.916 7.48706 17.8308 7.55742L15.8743 9.08916C15.9161 9.39091 15.9381 9.69507 15.9402 9.99968Z" fill="#252525"/>
                </svg>
            </div>
            <div style={styles.header}>
                <div style={styles.headerTitleLayout}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="25" viewBox="0 0 26 25" fill="none">
                        <path d="M13 6.06508C10.3333 -0.194174 1 0.472493 1 8.47253C1 16.4726 13 23.1395 13 23.1395C13 23.1395 25 16.4726 25 8.47253C25 0.472493 15.6667 -0.194174 13 6.06508Z" fill="#E3838E" stroke="#E3838E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span style={styles.headerTitleFont}>收藏保母</span>
                </div>
            </div>
          <div style={{backgroundColor: '#F3CCD4',borderRadius: '40px 0 0px 0',width:'100%',border:'none'}}>
                <div style={styles.contentLayout}>
                    <div style={styles.rollerLayout}>
                        <div style={styles.searchInput}>
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="24" 
                            height="24" 
                            viewBox="0 0 24 24" 
                            fill="none"
                            onClick={() => handleFetchClick()}
                        >
                            <path d="M8.94286 3C10.519 3 12.0306 3.62612 13.1451 4.74062C14.2596 5.85512 14.8857 7.36671 14.8857 8.94286C14.8857 10.4149 14.3463 11.768 13.4594 12.8103L13.7063 13.0571H14.4286L19 17.6286L17.6286 19L13.0571 14.4286V13.7063L12.8103 13.4594C11.768 14.3463 10.4149 14.8857 8.94286 14.8857C7.36671 14.8857 5.85512 14.2596 4.74062 13.1451C3.62612 12.0306 3 10.519 3 8.94286C3 7.36671 3.62612 5.85512 4.74062 4.74062C5.85512 3.62612 7.36671 3 8.94286 3ZM8.94286 4.82857C6.65714 4.82857 4.82857 6.65714 4.82857 8.94286C4.82857 11.2286 6.65714 13.0571 8.94286 13.0571C11.2286 13.0571 13.0571 11.2286 13.0571 8.94286C13.0571 6.65714 11.2286 4.82857 8.94286 4.82857Z" fill="#999999"/>
                        </svg>
                        <input 
                            style={{ border: 'none' }} 
                            placeholder="搜尋保母名稱" 
                            value={keywords || ''}
                            onChange={(e) => setKeywords(e.target.value)}
                        ></input>
                        </div>
                        <SearchBarSortOnly 
                        keyword={keywords} // 將關鍵字傳遞給子組件
                        setKeyword={setKeywords} // 傳遞更新函數
                        onChange={handleFilterChange} // 傳遞選擇變更的處理函數
                        />
                    </div>
                </div>
                <div style={{ backgroundColor: '#f8ecec', width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <div style={styles.nannyItemLayout}>
                    {nannyInfo.map((nanny, index) => (
                    <div 
                        key={index} 
                        style={styles.nannyItem} 
                        onClick={() => {
                        if (nanny.id) {
                            router.push(`/nanny/profile/${nanny.id}`);
                        } else {
                            console.error('Nanny ID not found');
                        }
                        }}
                    >
                        <div style={styles.rightPart}>
                        <div>
                            <img src={orderImages.image || '/nannyIcon.jpg'} style={styles.nannyIcon} alt="Nanny Icon" />
                        </div>
                        <div style={styles.nannyFontLayout}>
                            <div style={styles.nannyNameFont}>{nanny.account}</div>
                            <div style={styles.nannySubInfo}>托育經驗: {nanny.experienment} 年</div>
                        </div>
                        </div>
                        <div style={styles.scoreLayout}>
                        <span style={styles.scoreFont}>{nanny.rating}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                            <g clip-path="url(#clip0_75_7187)">
                            <path d="M12 0.5C5.38 0.5 0 5.88 0 12.5C0 19.12 5.38 24.5 12 24.5C18.62 24.5 24 19.12 24 12.5C24 5.88 18.62 0.5 12 0.5ZM17.17 12.12L15 13.89L15.9 16.62C16.02 16.99 15.9 17.4 15.59 17.63C15.28 17.87 14.86 17.88 14.53 17.67L12.01 16.03L9.53 17.69C9.38 17.79 9.2 17.84 9.02 17.84C8.83 17.84 8.63 17.78 8.47 17.66C8.16 17.43 8.03 17.02 8.15 16.65L9.01 13.89L6.83 12.12C6.54 11.87 6.43 11.47 6.56 11.11C6.69 10.75 7.04 10.51 7.42 10.51H10.17L11.14 7.9C11.27 7.54 11.62 7.3 12 7.3C12.38 7.3 12.73 7.54 12.86 7.9L13.83 10.51H16.58C16.96 10.51 17.31 10.75 17.44 11.11C17.57 11.47 17.46 11.88 17.17 12.13V12.12Z" fill="#FFD22F"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_75_7187)">
                                <rect width="24" height="24" fill="white" transform="translate(0 0.5)"/>
                            </clipPath>
                            </defs>
                        </svg>
                        </div>
                    </div>
                    ))}
                {totalItem > 0 && (
                    <Pagination
                        keyword={keywords}
                        totalItems={totalItem}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                        fetchNannyInfoList={fetchNannyInfoList}
                    />
                )}
                </div>
                </div>
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  searchFont:{
    color: '#000',
    /* Line/medium/11pt */
    fontFamily: "LINE Seed JP_TTF",
    fontSize: '11px',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 'normal'
  },
  searchTypeLayout:{
    display: 'flex',
    padding: '0px 10px',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    borderRadius: '30px',
    background:' var(---SurfaceContainer-Lowest, #FFF)'
  },
  searchLayout: {
    display:'flex',
    gap:'12px'
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  timeFont:{
    color: 'var(---Surface-Black-25, #252525)',
    /* Line/medium/8pt */
    fontFamily: "LINE Seed JP_TTF",
    fontSize: '8px',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 'normal'
  },
  
  orderInfo: {
    display:'flex',
    flexDirection:'column',
    gap:'6px'
  },
  headIcon:{
    width: '88px',
    height: '88px',
    flexShrink: 0
  },
  titleLayout:{
    display:'flex',
    flexDirection:'column',
    alignItems:'flex-start',
    width:'100%',
  },
 
  nannySubInfo:{
    color: 'var(---Outline-OnSurface, #252525)',
    fontFamily: "LINE Seed JP_TTF",
    fontSize: '11px',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 'normal'
  },
  nannyNameFont:{
    color: 'var(---Outline-OnSurface, #252525)',
    fontFamily: "LINE Seed JP_TTF",
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 'normal'
  },
  nannyFontLayout:{
    display:'flex',
    flexDirection:'column',
    gap:'10px'
  },
  nannyIcon:{
    display: 'flex',
    width: '60px',
    height: '60px',
    padding: '7.982px',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:'50%'
  },
  rightPart:{
    display:'flex',
    gap:'20px',
    justifyContent:'center',
    alignItems:'center'
  },
  nannyItem:{
    display: 'flex',
    height: '70px',
    padding: '6px 9px 4px 8px',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderRadius: '8px',
    border: '2px solid var(---Button-01, #FBDBD6)',
    background: 'var(---SurfaceContainer-Lowest, #FFF)',
    cursor:'pointer'
  },
  nannyItemLayout: {
    display:'flex',
    flexDirection:'column',
    gap:'10px',
    gap:'24px',
    width:'100%',
    marginBottom:'28px',
    justifyContent:'space-between',
    backgroundColor: '#F3CCD4',
    paddingLeft:'35px',
    paddingRight:'35px',
    paddingTop: '20px',
    borderRadius: '40px 0px 0px 0px', // 左上、右上、右下、左下的圓角
  },
  buttonLayout: {
    display:'flex',
    flexDirection:'column',
    gap:'10px',
    gap:'24px',
    width:'100%',
    marginBottom:'28px',
    justifyContent:'space-between',
  },
  imgLayout: {
    height: '180px',
    alignSelf: 'stretch',
    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
    backgroundColor:'#FFF'
  },
  inputField: {
    padding: '28px 14px',
    borderRadius: '8px',
    border: '1px solid #000',
    background: 'var(---SurfaceContainer-Lowest, #FFF)',
    color: 'gray',
    width:'100%',
    position: 'relative',
    cursor: 'pointer',
  },
  dateInput: {
    opacity: 1,
    cursor: 'pointer',
    position: 'absolute',
    width:'100%',
    height: '100%',
    top: 0,
    left: 0,
    border: 'none',
    zIndex: 999,
    outline:'none',
    background:'transparent',
    padding:'10px',
  },
  lastButton: {
    border:'none',
    backgroundColor:'#FFF'
  },
  subTitleLayout:{
    width:'100%',
    display:'flex',
    justifyContent:'flex-start',
    backgroundColor: '#FBDBD6',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height:'100vh',
    width:'100%'
  },
  scoreLayout:{
    display:'flex',
    gap:'8px'
  },
  iconLayout:{
    height: '38px',
    alignSelf: 'stretch',
    fill: 'var(---SurfaceContainer-High, #F5E5E5)'
  },
  createButtonLayout:{
    display:'flex',
    flexDirection:'column',
    gap:'5px'
  },
  createInfoLayout:{
    width:'100%',
    display: 'flex',
    height: '85px',
    padding: '28.5px 38.5px 27.5px 39.5px',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '12px',
    border: '2px dashed var(---Primary-Container, #F3CCD4)',
    background: 'var(---SurfaceContainer-Lowest, #FFF)',
    gap:'8px',
    pointer:'cursor'
  },
   createInfoLayoutHave:{
    width:'100%',
    display: 'flex',
    height: '85px',
    alignItems: 'center',
    borderRadius: '12px',
    background: 'var(---SurfaceContainer-Lowest, #FFF)',
    gap:'8px',
    pointer:'cursor'
  },
  header: {
    backgroundColor: '#F8ECEC',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'none',
  },
  headerSetting: {
    display: 'flex',
    height: '50px',
    padding: '8px 25px',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    width: '100%',
  },
  headerTitleLayout:{
    display: 'flex',
    width: '100%',
    height: '97px',
    padding: '30px 124px',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: '#FFFF',
    borderRadius: '0px 0 30px 0'
  },
  headerTitleFont:{
    color: 'var(---OutLine-OnSurfaceVariant, #504B49)',
    textAlign: 'center',
    fontFamily: "LINE Seed JP_TTF",
    fontSize: '24px',
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 'normal'
  },
  headerFont: {
    fontSize: '24px',
    fontWeight: 'bold',
    color:'#E3838E',
  },
  contentLayout: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent:'center',
    width: '100%',
    maxWidth: '600px',
    backgroundColor: '#F8ECEC',
    borderRadius: '40px 0px 40px 0px', // 左上、右上、右下、左下的圓角
  },
  searchInput:{
    display: 'flex',
    padding: '8px 52px 8px 12px',
    alignItems: 'center',
    gap: '8px',
    flex: '1 0 0',
    borderRadius: '100px',
    border: '1px solid #EBEBEB',
    background: '#FBFBFB',
  },
  rollerLayout: {
    display: 'flex',
    justifyContent: 'center',
    margin: '10px',
    alignItems:'center',
    gap:'10px',
  },
  roller: {
    width: '42px',
    height: '6px',
    borderRadius: '2px',
    backgroundColor: '#FFF',
    margin: '0 5px',
  },
  rollerActive: {
    width: '42px',
    height: '6px',
    borderRadius: '2px',
    backgroundColor: 'var(---Primary-Primary, #E3838E)',
    margin: '0 5px',
  },
  subTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginTop: '15px',
    marginBottom: '15px',
    color:'#E3838E',
  },

  lawLayout: {
    display: 'flex',
    width: '320px',
    padding: '18.5px 18px 19.5px 17px',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '20px',
    border: '2px solid var(---Button-01, #FBDBD6)',
    gap:'20px'
  },
  suddenlyBtn: {
    display: 'flex',
    width: '320px',
    height: '130px',
    padding: '16px 12px',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    background:'var(---Primary-Primary, #E3838E)',
    border:'none',
    borderRadius:'12px'
  },
  longBtn: {
    display: 'flex',
    width: '320px',
    height: '130px',
    padding: '16px 12px',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    background:'var(---Primary-Primary, #F3CCD4)',
    border:'none',
    borderRadius:'12px'
  },
  spinner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '24px',
    color: '#E3838E',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    opacity: 0.5,
    zIndex: 1,
  },
};

export default ApplicationPage;
