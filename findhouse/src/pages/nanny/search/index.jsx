import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Pagination from '../../../components/base/pagenation';
import SearchBar from '../../../components/base/SearchBar';

const ApplicationPage = () => {
  const router = useRouter();
  const [orderInfo, setOrderInfo] = useState([]);
  const [totalItem, setTotalItem] = useState(0);
  const [currentPage, setCurrentPage] = useState(0); // Track current page
  const [keywords, setKeywords] = useState('');
  const pageSize = 5;
  const [isLoading, setIsLoading] = useState(true);

  const handleFilterChange = (region, locations,sorts) => {
    setSelectedRegion(region);
    setSelectedLocations(locations);
    setSelectedSort(sorts);
    fetchOrderInfoList(currentPage, pageSize); // Fetch nanny info with updated filters
  };

  const fetchOrderInfoList = async (page = 0, pageSize = 5) => {
    setIsLoading(true); // Set loading state to true while fetching data
    let userId = null;
    try {
      const cookies = document.cookie.split('; ');
      const userIdCookie = cookies.find(row => row.startsWith('userId='));
      if (userIdCookie) {
        userId = userIdCookie.split('=')[1];
      } else {
        throw new Error('userId not found in cookies');
      }
      const response = await fetch(`/api/order/getOrderInfoList?page=${page}&pageSize=${pageSize}&userId=${userId}`, {
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
      setOrderInfo(data.orders);
      setTotalItem(data.totalCount); // Set total items for pagination
    } catch (error) {
      console.error('Error fetching order info:', error);
    } finally {
      setIsLoading(false); // Set loading state to false when done fetching
    }
  };

  // Log orderInfo whenever it changes
  useEffect(() => {
    console.log(orderInfo);
  }, [orderInfo]);

  useEffect(() => {
    fetchOrderInfoList(currentPage, pageSize); // Fetch data when the page is loaded or currentPage changes
  }, [currentPage]);

  const handlePageChange = (page) => {
    console.log('page:',page)
    setCurrentPage(page); // Update currentPage when a new page is selected
  };

  const handleNextClick = () => {
    router.push('/nanny/create/choose'); // 替换 '/next-page' 为你想要跳转的路径
  };

  return (
    <div style={styles.main}>
      {isLoading ? (
        <div style={styles.spinner}>Loading...</div>
      ) : (
        <>
          <div style={styles.header}>
            <div style={styles.createInfoLayout} onClick={handleNextClick}>
              <span style={styles.headerFont}>
                + 建立托育資料
              </span>
            </div>
            <div style={styles.createButtonLayout}>
              <div style={styles.iconLayout}>
                <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
                  <rect width="38" height="38" rx="4" fill="#F5E5E5"/>
                  <path d="M26.0231 9C25.2613 9 24.4994 9.29013 23.9179 9.87171L22.6843 11.1053L26.8949 15.3158L28.1284 14.0822C29.2905 12.9201 29.2905 11.0349 28.1284 9.87171C27.5468 9.29013 26.785 9 26.0231 9ZM21.1053 12.6842L9 24.7895V29H13.2106L25.3159 16.8947L21.1053 12.6842Z" fill="#E3838E"/>
                </svg>
              </div>
              <div style={styles.iconLayout}>
                <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
                  <rect width="38" height="38" rx="4" fill="#F5E5E5"/>
                  <path d="M30.8209 18.2351C29.8547 16.2781 28.4397 14.5436 26.6759 13.1543L29.7079 10.3225L28.2929 9L24.9999 12.0728C23.1772 11.0881 21.1054 10.5776 18.9999 10.5943C11.4999 10.5943 8.05687 16.4419 7.17887 18.2351C7.06101 18.4754 7 18.7366 7 19.0009C7 19.2653 7.06101 19.5265 7.17887 19.7668C8.14501 21.7237 9.56009 23.4583 11.3239 24.8476L8.29287 27.6794L9.70687 29L12.9999 25.9272C14.8225 26.9119 16.8944 27.4224 18.9999 27.4057C26.4999 27.4057 29.9429 21.5581 30.8209 19.7649C30.9385 19.5249 30.9994 19.264 30.9994 19C30.9994 18.736 30.9385 18.4751 30.8209 18.2351ZM12.9999 19C12.998 17.9713 13.2998 16.9621 13.8721 16.0832C14.4445 15.2043 15.2652 14.4899 16.244 14.0183C17.2229 13.5468 18.322 13.3364 19.4206 13.4104C20.5191 13.4844 21.5745 13.8398 22.4709 14.4376L21.0189 15.7937C20.4093 15.4504 19.7117 15.2674 18.9999 15.2641C17.939 15.2641 16.9216 15.6577 16.1714 16.3583C15.4213 17.0589 14.9999 18.0092 14.9999 19C15.0034 19.6648 15.1993 20.3164 15.5669 20.8857L14.1149 22.2418C13.3898 21.2965 12.9999 20.1628 12.9999 19ZM18.9999 24.6038C17.7548 24.6038 16.541 24.2396 15.5289 23.5624L16.9809 22.2063C17.5904 22.5496 18.2881 22.7326 18.9999 22.7359C20.0607 22.7359 21.0782 22.3423 21.8283 21.6417C22.5784 20.941 22.9999 19.9908 22.9999 19C22.9964 18.3352 22.8005 17.6836 22.4329 17.1143L23.8849 15.7582C24.5249 16.5953 24.9055 17.5811 24.9847 18.6071C25.0639 19.6331 24.8386 20.6596 24.3338 21.5739C23.8289 22.4881 23.0639 23.2546 22.1229 23.7891C21.1819 24.3237 20.1013 24.6056 18.9999 24.6038Z" fill="#E3838E"/>
                </svg>
              </div>
            </div>
          </div>
          <div style={{ backgroundColor: 'white', width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <div style={styles.contentLayout}>
              <div style={styles.rollerLayout}>
                <div style={styles.searchInput}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M8.94286 3C10.519 3 12.0306 3.62612 13.1451 4.74062C14.2596 5.85512 14.8857 7.36671 14.8857 8.94286C14.8857 10.4149 14.3463 11.768 13.4594 12.8103L13.7063 13.0571H14.4286L19 17.6286L17.6286 19L13.0571 14.4286V13.7063L12.8103 13.4594C11.768 14.3463 10.4149 14.8857 8.94286 14.8857C7.36671 14.8857 5.85512 14.2596 4.74062 13.1451C3.62612 12.0306 3 10.519 3 8.94286C3 7.36671 3.62612 5.85512 4.74062 4.74062C5.85512 3.62612 7.36671 3 8.94286 3ZM8.94286 4.82857C6.65714 4.82857 4.82857 6.65714 4.82857 8.94286C4.82857 11.2286 6.65714 13.0571 8.94286 13.0571C11.2286 13.0571 13.0571 11.2286 13.0571 8.94286C13.0571 6.65714 11.2286 4.82857 8.94286 4.82857Z" fill="#999999"/>
                  </svg>
                  <input 
                    style={{ border: 'none' }} 
                    placeholder="搜尋暱稱" 
                    value={keywords || ''}
                    onChange={(e) => setKeywords(e.target.value)}
                  ></input>
                </div>
                <SearchBar 
                  keyword={keywords} // 將關鍵字傳遞給子組件
                  setKeyword={setKeywords} // 傳遞更新函數
                  onChange={handleFilterChange} // 傳遞選擇變更的處理函數
                  from={'nanny'}
                />
              </div>
              <div style={styles.titleLayout}>
              </div>
            </div>
            <div style={{ backgroundColor: '#f8ecec', width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <div style={styles.nannyItemLayout}>
                {orderInfo.map((order, index) => (
                  <div 
                    key={index} 
                    style={styles.nannyItem} 
                    onClick={() => {
                      if (order.id) {
                        router.push(`/nanny/profile/${order.id}`);
                      } else {
                        console.error('Order ID not found');
                      }
                    }}
                  >
                    <div style={styles.rightPart}>
                      <div>
                        <img src={order.image || '/orderCreate.png'} style={order.gender === 'female' ? styles.orderIconFemale : styles.orderIconMale} alt="Nanny Icon" />
                      </div>
                      <div style={styles.nannyFontLayout}>
                        <div style={styles.nannyNameFont}>{order.nickname}</div>
                        <div style={styles.nannySubInfo}>{order.choosetype === 'suddenly' ? '臨時托育' : 
                               order.choosetype === 'longTerm' ? '長期托育' : ''}</div>
                      </div>
                    </div>
                    <div style={styles.scoreLayout}>
                      <div style={styles.iconLayout}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" fill="none">
                          <path d="M11.9305 4.5H6.5V0.5H7.5C7.5415 0.5 11.373 0.55 11.9305 4.5ZM2.75 5.5L2 4.5C1.76646 4.19023 1.46437 3.93874 1.11738 3.76524C0.770391 3.59175 0.387942 3.50096 0 3.5L0 4.5C0.232765 4.50058 0.462235 4.55505 0.670427 4.65915C0.878619 4.76324 1.05988 4.91413 1.2 5.1L2 6.1665V7C2 7.39782 2.15804 7.77936 2.43934 8.06066C2.72064 8.34196 3.10218 8.5 3.5 8.5H5.9325L4.6285 10.0645C3.9675 9.7555 2.9185 10.523 3.002 11.32C3.01398 11.5021 3.06582 11.6793 3.15383 11.8392C3.24185 11.999 3.3639 12.1376 3.51136 12.2451C3.65882 12.3526 3.82809 12.4263 4.00721 12.4612C4.18632 12.4961 4.37091 12.4912 4.54793 12.4469C4.72494 12.4025 4.89006 12.3199 5.03162 12.2047C5.17317 12.0896 5.2877 11.9447 5.36712 11.7804C5.44654 11.6162 5.4889 11.4364 5.49121 11.254C5.49352 11.0715 5.45573 10.8907 5.3805 10.7245L7 8.781L8.6195 10.7245C8.5452 10.8907 8.50822 11.0711 8.51117 11.2532C8.51411 11.4352 8.5569 11.6144 8.63653 11.7781C8.71616 11.9418 8.8307 12.086 8.97208 12.2007C9.11346 12.3154 9.27825 12.3977 9.45486 12.4418C9.63148 12.486 9.81561 12.4909 9.99433 12.4562C10.173 12.4215 10.342 12.3481 10.4893 12.2411C10.6366 12.1342 10.7586 11.9962 10.8469 11.837C10.9351 11.6777 10.9874 11.5011 11 11.3195C11.0835 10.5235 10.0345 9.755 9.3735 10.0645L8.0675 8.5H10.5C10.8978 8.5 11.2794 8.34196 11.5607 8.06066C11.842 7.77936 12 7.39782 12 7V5.5H2.75Z" fill="#E3838E"/>
                        </svg>

                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
                          <path d="M7.25054 7.9995C6.83604 7.9995 6.50054 8.335 6.50054 8.7495V9.4995H1.50054V3.2495C1.50054 2.5605 2.06154 1.9995 2.75054 1.9995H5.25054C5.82154 1.9995 6.31954 2.385 6.46104 2.9365C6.56454 3.3375 6.97354 3.5805 7.37404 3.476C7.77554 3.3725 8.01704 2.964 7.91354 2.563C7.60104 1.348 6.50604 0.5 5.25004 0.5H2.75004C1.23404 0.4995 0.000538195 1.733 0.000538195 3.2495C0.000538195 3.2495 -0.00946181 10.102 0.000538195 10.1505C0.000538195 11.4995 1.17154 12.4995 2.50054 12.4995H5.50054C6.68354 12.4995 7.83204 11.61 8.00054 10.2495V8.7495C8.00054 8.335 7.66504 7.9995 7.25054 7.9995ZM4.50054 11.4995H3.50054C3.22454 11.4995 3.00054 11.2755 3.00054 10.9995C3.00054 10.7235 3.22454 10.4995 3.50054 10.4995H4.50054C4.77654 10.4995 5.00054 10.7235 5.00054 10.9995C5.00054 11.2755 4.77654 11.4995 4.50054 11.4995Z" fill="#E3838E"/>
                          <path d="M12.057 5.00021V4.83971C12.057 4.61971 11.9845 4.40521 11.85 4.23071L10.6115 2.61721C10.2505 2.18421 9.60747 2.12571 9.17447 2.48671C8.74147 2.84771 8.68297 3.49071 9.04397 3.92371L9.46147 4.49971L5.76747 4.49321C5.28847 4.49321 4.91497 4.93471 5.04297 5.43521C5.13047 5.77621 5.46247 5.99971 5.81447 5.99971H7.89897L8.66647 8.68671C8.97147 9.75421 9.95997 10.4997 11.0705 10.4997H11.2505C11.665 10.4997 12.0005 10.1642 12.0005 9.74971C12.0005 9.33521 11.665 8.99971 11.2505 8.99971H11.0705C10.6265 8.99971 10.231 8.70121 10.109 8.27421L9.45897 5.99971H11.058C11.6105 5.99971 12.058 5.55221 12.058 4.99971L12.057 5.00021Z" fill="#E3838E"/>
                        </svg>
                      </div>

                      <div style={styles.iconLayout}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" fill="none">
                          <path d="M11.9305 4.5H6.5V0.5H7.5C7.5415 0.5 11.373 0.55 11.9305 4.5ZM2.75 5.5L2 4.5C1.76646 4.19023 1.46437 3.93874 1.11738 3.76524C0.770391 3.59175 0.387942 3.50096 0 3.5L0 4.5C0.232765 4.50058 0.462235 4.55505 0.670427 4.65915C0.878619 4.76324 1.05988 4.91413 1.2 5.1L2 6.1665V7C2 7.39782 2.15804 7.77936 2.43934 8.06066C2.72064 8.34196 3.10218 8.5 3.5 8.5H5.9325L4.6285 10.0645C3.9675 9.7555 2.9185 10.523 3.002 11.32C3.01398 11.5021 3.06582 11.6793 3.15383 11.8392C3.24185 11.999 3.3639 12.1376 3.51136 12.2451C3.65882 12.3526 3.82809 12.4263 4.00721 12.4612C4.18632 12.4961 4.37091 12.4912 4.54793 12.4469C4.72494 12.4025 4.89006 12.3199 5.03162 12.2047C5.17317 12.0896 5.2877 11.9447 5.36712 11.7804C5.44654 11.6162 5.4889 11.4364 5.49121 11.254C5.49352 11.0715 5.45573 10.8907 5.3805 10.7245L7 8.781L8.6195 10.7245C8.5452 10.8907 8.50822 11.0711 8.51117 11.2532C8.51411 11.4352 8.5569 11.6144 8.63653 11.7781C8.71616 11.9418 8.8307 12.086 8.97208 12.2007C9.11346 12.3154 9.27825 12.3977 9.45486 12.4418C9.63148 12.486 9.81561 12.4909 9.99433 12.4562C10.173 12.4215 10.342 12.3481 10.4893 12.2411C10.6366 12.1342 10.7586 11.9962 10.8469 11.837C10.9351 11.6777 10.9874 11.5011 11 11.3195C11.0835 10.5235 10.0345 9.755 9.3735 10.0645L8.0675 8.5H10.5C10.8978 8.5 11.2794 8.34196 11.5607 8.06066C11.842 7.77936 12 7.39782 12 7V5.5H2.75Z" fill="#E3838E"/>
                        </svg>

                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
                          <path d="M7.25054 7.9995C6.83604 7.9995 6.50054 8.335 6.50054 8.7495V9.4995H1.50054V3.2495C1.50054 2.5605 2.06154 1.9995 2.75054 1.9995H5.25054C5.82154 1.9995 6.31954 2.385 6.46104 2.9365C6.56454 3.3375 6.97354 3.5805 7.37404 3.476C7.77554 3.3725 8.01704 2.964 7.91354 2.563C7.60104 1.348 6.50604 0.5 5.25004 0.5H2.75004C1.23404 0.4995 0.000538195 1.733 0.000538195 3.2495C0.000538195 3.2495 -0.00946181 10.102 0.000538195 10.1505C0.000538195 11.4995 1.17154 12.4995 2.50054 12.4995H5.50054C6.68354 12.4995 7.83204 11.61 8.00054 10.2495V8.7495C8.00054 8.335 7.66504 7.9995 7.25054 7.9995ZM4.50054 11.4995H3.50054C3.22454 11.4995 3.00054 11.2755 3.00054 10.9995C3.00054 10.7235 3.22454 10.4995 3.50054 10.4995H4.50054C4.77654 10.4995 5.00054 10.7235 5.00054 10.9995C5.00054 11.2755 4.77654 11.4995 4.50054 11.4995Z" fill="#E3838E"/>
                          <path d="M12.057 5.00021V4.83971C12.057 4.61971 11.9845 4.40521 11.85 4.23071L10.6115 2.61721C10.2505 2.18421 9.60747 2.12571 9.17447 2.48671C8.74147 2.84771 8.68297 3.49071 9.04397 3.92371L9.46147 4.49971L5.76747 4.49321C5.28847 4.49321 4.91497 4.93471 5.04297 5.43521C5.13047 5.77621 5.46247 5.99971 5.81447 5.99971H7.89897L8.66647 8.68671C8.97147 9.75421 9.95997 10.4997 11.0705 10.4997H11.2505C11.665 10.4997 12.0005 10.1642 12.0005 9.74971C12.0005 9.33521 11.665 8.99971 11.2505 8.99971H11.0705C10.6265 8.99971 10.231 8.70121 10.109 8.27421L9.45897 5.99971H11.058C11.6105 5.99971 12.058 5.55221 12.058 4.99971L12.057 5.00021Z" fill="#E3838E"/>
                        </svg>
                      </div>

                      <div style={styles.iconLayout}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" fill="none">
                          <path d="M11.9305 4.5H6.5V0.5H7.5C7.5415 0.5 11.373 0.55 11.9305 4.5ZM2.75 5.5L2 4.5C1.76646 4.19023 1.46437 3.93874 1.11738 3.76524C0.770391 3.59175 0.387942 3.50096 0 3.5L0 4.5C0.232765 4.50058 0.462235 4.55505 0.670427 4.65915C0.878619 4.76324 1.05988 4.91413 1.2 5.1L2 6.1665V7C2 7.39782 2.15804 7.77936 2.43934 8.06066C2.72064 8.34196 3.10218 8.5 3.5 8.5H5.9325L4.6285 10.0645C3.9675 9.7555 2.9185 10.523 3.002 11.32C3.01398 11.5021 3.06582 11.6793 3.15383 11.8392C3.24185 11.999 3.3639 12.1376 3.51136 12.2451C3.65882 12.3526 3.82809 12.4263 4.00721 12.4612C4.18632 12.4961 4.37091 12.4912 4.54793 12.4469C4.72494 12.4025 4.89006 12.3199 5.03162 12.2047C5.17317 12.0896 5.2877 11.9447 5.36712 11.7804C5.44654 11.6162 5.4889 11.4364 5.49121 11.254C5.49352 11.0715 5.45573 10.8907 5.3805 10.7245L7 8.781L8.6195 10.7245C8.5452 10.8907 8.50822 11.0711 8.51117 11.2532C8.51411 11.4352 8.5569 11.6144 8.63653 11.7781C8.71616 11.9418 8.8307 12.086 8.97208 12.2007C9.11346 12.3154 9.27825 12.3977 9.45486 12.4418C9.63148 12.486 9.81561 12.4909 9.99433 12.4562C10.173 12.4215 10.342 12.3481 10.4893 12.2411C10.6366 12.1342 10.7586 11.9962 10.8469 11.837C10.9351 11.6777 10.9874 11.5011 11 11.3195C11.0835 10.5235 10.0345 9.755 9.3735 10.0645L8.0675 8.5H10.5C10.8978 8.5 11.2794 8.34196 11.5607 8.06066C11.842 7.77936 12 7.39782 12 7V5.5H2.75Z" fill="#E3838E"/>
                        </svg>

                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
                          <path d="M7.25054 7.9995C6.83604 7.9995 6.50054 8.335 6.50054 8.7495V9.4995H1.50054V3.2495C1.50054 2.5605 2.06154 1.9995 2.75054 1.9995H5.25054C5.82154 1.9995 6.31954 2.385 6.46104 2.9365C6.56454 3.3375 6.97354 3.5805 7.37404 3.476C7.77554 3.3725 8.01704 2.964 7.91354 2.563C7.60104 1.348 6.50604 0.5 5.25004 0.5H2.75004C1.23404 0.4995 0.000538195 1.733 0.000538195 3.2495C0.000538195 3.2495 -0.00946181 10.102 0.000538195 10.1505C0.000538195 11.4995 1.17154 12.4995 2.50054 12.4995H5.50054C6.68354 12.4995 7.83204 11.61 8.00054 10.2495V8.7495C8.00054 8.335 7.66504 7.9995 7.25054 7.9995ZM4.50054 11.4995H3.50054C3.22454 11.4995 3.00054 11.2755 3.00054 10.9995C3.00054 10.7235 3.22454 10.4995 3.50054 10.4995H4.50054C4.77654 10.4995 5.00054 10.7235 5.00054 10.9995C5.00054 11.2755 4.77654 11.4995 4.50054 11.4995Z" fill="#E3838E"/>
                          <path d="M12.057 5.00021V4.83971C12.057 4.61971 11.9845 4.40521 11.85 4.23071L10.6115 2.61721C10.2505 2.18421 9.60747 2.12571 9.17447 2.48671C8.74147 2.84771 8.68297 3.49071 9.04397 3.92371L9.46147 4.49971L5.76747 4.49321C5.28847 4.49321 4.91497 4.93471 5.04297 5.43521C5.13047 5.77621 5.46247 5.99971 5.81447 5.99971H7.89897L8.66647 8.68671C8.97147 9.75421 9.95997 10.4997 11.0705 10.4997H11.2505C11.665 10.4997 12.0005 10.1642 12.0005 9.74971C12.0005 9.33521 11.665 8.99971 11.2505 8.99971H11.0705C10.6265 8.99971 10.231 8.70121 10.109 8.27421L9.45897 5.99971H11.058C11.6105 5.99971 12.058 5.55221 12.058 4.99971L12.057 5.00021Z" fill="#E3838E"/>
                        </svg>
                      </div>

                    </div>
                  </div>
                ))}
               <Pagination
                    totalItems={totalItem}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                    fetchOrderInfoList={fetchOrderInfoList}
                  />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  profilePic: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    marginBottom: '10px'
  },
  nextBtn: {
    padding: '10px 20px',
    backgroundColor: 'var(---Primary-Primary, #E3838E)',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  componentLayout:{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderBottom: '1px solid #f4f4f4',   
  },
  hopeLayout: {
    width: '100%',
    display: 'flex',
    padding: '5px 10px',
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderRadius: '8px',
    border: '1px solid var(---OutLine-OutLine, #78726D)',
    background: 'var(---SurfaceContainer-Lowest, #FFF)',
  },
  titleLayout:{
    display:'flex',
    flexDirection:'column',
    alignItems:'flex-start',
    width:'100%',
  },
  smallTitle: {
    color: 'var(---Primary-OnContainer, #6F2E2A)',
    fontFamily: "LINE Seed JP_TTF",
    fontSize: '16px',
    fontWeight: '800',
    lineHeight: 'normal',
    marginBottom: '15px',
  },
  typeFont:{
    color: 'var(---SurfaceContainer-Lowest, #FFF)',
    /* Line/bold/24pt */
    fontFamily: "LINE Seed JP_TTF",
    fontSize: '24px',
    fontStyle: 'normal',
    fontWeight: '700',
    linHeight: 'normal'
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
  orderIconFemale:{
    display: 'flex',
    width: '60px',
    height: '60px',
    padding: '10px',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    flexShrink: '0',
    backgroundColor: '#F3CCD4',
    borderRadius: '50%',
  },
  orderIconMale:{
    display: 'flex',
    width: '60px',
    height: '60px',
    padding: '10px',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    flexShrink: '0',
    backgroundColor: '#BCE8F7',
    borderRadius: '50%',
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
    padding: '5px 9px 5px 9px',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: '8px',
    border: '2px solid var(---Button-01, #FBDBD6)',
    background: 'var(---SurfaceContainer-Lowest, #FFF)',
  },
  nannyItemLayout: {
    display:'flex',
    flexDirection:'column',
    gap:'24px',
    width:'100%',
    marginBottom:'28px',
    justifyContent:'space-between',
    backgroundColor: '#F3CCD4',
    paddingLeft:'35px',
    paddingRight:'35px',
    paddingTop: '20px',
    backgroundColor: '#F3CCD4',
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
    backgroundColor: '#f8ecec',
    height:'100vh'
  },
  scoreLayout:{
    display:'flex',
    gap:'8px'
  },
  iconLayout:{
    alignSelf: 'stretch',
    fill: 'var(---SurfaceContainer-High, #F5E5E5)',
    gap:'10px',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
  },
  createButtonLayout:{
    display:'flex',
    flexDirection:'column',
    gap:'5px'
  },
  createInfoLayout:{
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
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: '600px',
    // marginBottom: '20px',
    padding: '10px',
    paddingLeft: '50px',
    paddingRight: '50px',
    backgroundColor: '#fff',
    borderRadius: '0px 0px 40px 0px', // 左上、右上、右下、左下的圓角
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
    backgroundColor: '#f8ecec',
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
    gap:'10px'
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
};

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#e3838e',
      '& + .MuiSwitch-track': {
        backgroundColor: '#f5e5e5',
        opacity: 1,
        border: 0,
        ...theme.applyStyles('dark', {
          backgroundColor: '#2ECA45',
        }),
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.grey[100],
      ...theme.applyStyles('dark', {
        color: theme.palette.grey[600],
      }),
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.7,
      ...theme.applyStyles('dark', {
        opacity: 0.3,
      }),
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: '#fcf7f7',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
    ...theme.applyStyles('dark', {
      backgroundColor: '#39393D',
    }),
  },
}));

export default ApplicationPage;
