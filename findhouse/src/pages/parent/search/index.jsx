import React, { useState, useEffect } from "react";
import "./matching.css";
import "./profile.css";
import Pagination from "../../../components/base/pagenation";
import SearchBar from "../../../components/base/SearchBar";
import OrderCarousel from "../../../components/nanny/search/OrderCarousel";
import { useRouter } from "next/router";
import useStore from "../../../lib/store";
import Loading from "../../../components/base/Loading";
import Swal from "sweetalert2";
export default function HistoryPage() {
  const router = useRouter();
  const { setItem } = useStore();
  const [nannyInfo, setNannyInfo] = useState([]);
  const [orderInfo, setOrderInfo] = useState([]);
  const [totalItem, setTotalItem] = useState(0);
  const [currentPage, setCurrentPage] = useState(0); // Track current page
  const pageSize = 5;
  const [isLoading, setIsLoading] = useState(true);
  const [keywords, setKeywords] = useState("");
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedSort, setSelectedSort] = useState("time"); // 新增狀態以追蹤選擇的排序
  const [orderImages, setOrderImages] = useState({});
  const [isShow, setIsShow] = useState(true);
  const [orderCurrentPage, setOrderCurrentPage] = useState(1);
  const itemsPerPage = 1; // 每頁顯示 1 筆
  // 計算目前頁面的資料
  const indexOfLastItem = orderCurrentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = orderInfo.slice(indexOfFirstItem, indexOfLastItem);
  const [locationCount, setLocationCount] = useState(0); // 新增狀態以追蹤選擇的地區數量
  const [currentOrderCareType, setCurrentOrderCareType] = useState(null);
  const { orderId, setOrderId } = useStore();
  const { careData, setCareData, babyInfo, setBabyInfo } = useStore() || {};
  const [haveKyc, setHaveKyc] = useState(false);
  const [openKycModal, setOpenKycModal] = useState(false);

  const [isComposing, setIsComposing] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [kycStatus, setKycStatus] = useState(false);
  const handleChange = (e) => {
    const value = e.target.value;
    setKeywords(value);
  };

  const handlePageChange = (newPage) => {
    alert(newPage);
    setPage(newPage);
  };


  const fetchNannyInfoList = async (page, pageSize = 5, keywords="",locations=[],sort="time") => {
    setIsLoading(true); // Set loading state to true while fetching data
    try {
      const response = await fetch(
        `/api/nanny/getNannyInfoList?page=${page}&pageSize=${pageSize}&locations=${locations}&sort=${sort}&keyword=${keywords}`,
        {
          method: "GET",
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      // Add image loading for nannies
      const nannyImagePromises = data.nannies.map(async (nanny) => {
        if (nanny.uploadid) {
          const imgResponse = await fetch(
            `/api/base/getImgUrl?id=${nanny.uploadid}`
          );
          const imgData = await imgResponse.json();
          return { ...nanny, image: imgData.url };
        }
        return nanny;
      });

      const nanniesWithImages = await Promise.all(nannyImagePromises);
      console.log(nanniesWithImages);
      setNannyInfo(nanniesWithImages);
      setTotalCount(data.totalCount);
      setTotalItem(nanniesWithImages.length);
    } catch (error) {
      console.error("Error fetching nanny info:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFetchClick = () => {
    fetchNannyInfoList(page, pageSize, keywords);
    fetchOrderInfo();
  };

  const fetchOrderInfo = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/order/getOrderInfoList`, {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.orders.length > 0) {
        setOrderInfo(data.orders);
        //setOrderId(data.orders[0].id);
        setItem(data.orders[0]);
        setCurrentOrderCareType(data.orders[0].choosetype);
        const careTypeResponse = await fetch(
          `/api/base/getCareData?id=${data.orders[0].caretypeid}`
        );
        const careTypeDatas = await careTypeResponse.json();
        setCareData(careTypeDatas.data);
      } else {
        throw new Error("No order information found in the response");
      }
    } catch (error) {
      console.error("Error fetching order info:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const checkHaveKyc = async () => {
    const isMemberExist = await fetch("/api/member/isMemberExist", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const memberExistData = await isMemberExist.json();
    if (memberExistData.member[0].kyc_id === null) {
      setHaveKyc(false);
    } else {
      setHaveKyc(true);
    }
    setKycStatus(memberExistData.member[0].kyc_status);
  }

  useEffect(() => {
    let isCancelled = false;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        if (!isCancelled) {
          await fetchNannyInfoList(page-1, pageSize, keywords);
          await fetchOrderInfo();
          setIsLoading(true);
          if (page >0) {
            setIsShow(orderInfo.isShow);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    };
    fetchData();
    checkHaveKyc();
    return () => {
      isCancelled = true; // 在組件卸載時取消請求
    };
  }, [page,keywords]); // 監聽關鍵依賴變數

  const handleNextClick = () => {
    if (!haveKyc) {
      setOpenKycModal(true);
    } else {
      setCareData(null);
      setBabyInfo(null);
      router.push("/parent/search/create/choose");
    }
  };

  const handleKycModal = () => {
    router.push("/parent/verify/verifyOnly");
  }

  const handleCloseKycModal = () => {
    setOpenKycModal(false);
  }

  const handleFilterChange = (region, locations, sorts) => {
    setSelectedRegion(region);
    setSelectedSort(sorts);
    console.log(locations,'filter');
    fetchNannyInfoList(currentPage, pageSize, keywords,locations,sorts);
  };

  return (
    <div className="matching-main">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="matching-body-header-background">
            <div style={styles.header}>
              <OrderCarousel orderList={orderInfo} handleNextClick={handleNextClick} setIsShow={setIsShow} isShow={isShow} setOpenKycModal={setOpenKycModal} haveKyc={haveKyc}/>
            </div>
          </div>
          {openKycModal && (
            <div className="modalOverlay">
              <div className="modalContent">
                <button className="closeButton" onClick={handleCloseKycModal}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_304_31413)">
                      <path
                        d="M14.7782 5.22943C14.4824 4.93364 14.0045 4.93364 13.7088 5.22943L10 8.9306L6.29124 5.22184C5.99545 4.92605 5.51763 4.92605 5.22184 5.22184C4.92605 5.51763 4.92605 5.99545 5.22184 6.29124L8.9306 10L5.22184 13.7088C4.92605 14.0045 4.92605 14.4824 5.22184 14.7782C5.51763 15.0739 5.99545 15.0739 6.29124 14.7782L10 11.0694L13.7088 14.7782C14.0045 15.0739 14.4824 15.0739 14.7782 14.7782C15.0739 14.4824 15.0739 14.0045 14.7782 13.7088L11.0694 10L14.7782 6.29124C15.0664 6.00303 15.0664 5.51763 14.7782 5.22943Z"
                        fill="#252525"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_304_31413">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </button>
                <span className="modalTitle">尚未進行身分驗證</span>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: "16px",
                  }}
                >
                  <button className="cancelBtn" onClick={handleCloseKycModal}>
                    取消
                  </button>
                  <button className="confirmBtn" onClick={handleKycModal}>
                    前往認證
                  </button>
                </div>
              </div>
            </div>
          )}
            <div
            style={{
              backgroundColor: "#F3CCD4",
              borderRadius: "40px 0 0px 0",
              width: "100%",
              border: "none",
            }}
          >
            <div className="matching-body-layoff">
              <div className="avatar-container">
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
                        <path
                          d="M8.94286 3C10.519 3 12.0306 3.62612 13.1451 4.74062C14.2596 5.85512 14.8857 7.36671 14.8857 8.94286C14.8857 10.4149 14.3463 11.768 13.4594 12.8103L13.7063 13.0571H14.4286L19 17.6286L17.6286 19L13.0571 14.4286V13.7063L12.8103 13.4594C11.768 14.3463 10.4149 14.8857 8.94286 14.8857C7.36671 14.8857 5.85512 14.2596 4.74062 13.1451C3.62612 12.0306 3 10.519 3 8.94286C3 7.36671 3.62612 5.85512 4.74062 4.74062C5.85512 3.62612 7.36671 3 8.94286 3ZM8.94286 4.82857C6.65714 4.82857 4.82857 6.65714 4.82857 8.94286C4.82857 11.2286 6.65714 13.0571 8.94286 13.0571C11.2286 13.0571 13.0571 11.2286 13.0571 8.94286C13.0571 6.65714 11.2286 4.82857 8.94286 4.82857Z"
                          fill="#999999"
                        />
                      </svg>
                      <input
                        style={{ border: "none" }}
                        placeholder="搜尋保母名稱"
                        value={keywords}
                        onChange={handleChange}
                        onCompositionStart={() => setIsComposing(true)}
                        onCompositionEnd={(e) => {
                          setIsComposing(false);
                          setKeywords(e.target.value);  // 在組字結束時更新最終值
                        }}
                      />
                    </div>
                    <SearchBar
                      keyword={keywords}
                      setKeyword={setKeywords}
                      onChange={handleFilterChange}
                      selectedLocations={selectedLocations} 
                      setSelectedLocations={setSelectedLocations}
                    />
                  </div>
                  <div style={styles.titleLayout}></div>
                </div>
              </div>
            </div>
            <div className="matching-body-layoff-content-background">
              <div className="matching-body-layoff-content">
                {nannyInfo.length === 0 ? (
                  <div className="space-layout">
                    <img
                      src="/icon/spaceIcon.png"
                      className="space-icon"
                      alt="space icon"
                    />
                    <span className="matching-body-layoff-content-title">
                      尚無資料
                      <br />
                      趕緊配對保母吧！
                    </span>
                  </div>
                ) : (
                  <div style={styles.searchLayout}>
                    <div style={styles.searchTypeLayout}>
                      <span style={styles.searchFont}>
                        地區: {selectedLocations.length}
                      </span>
                    </div>
                    {selectedSort && (
                      <div style={styles.searchTypeLayout}>
                        <span style={styles.searchFont}>
                          {selectedSort === "time"
                            ? "上架時間（新 ⭢ 舊）"
                            : selectedSort === "rating"
                              ? "保母評價(5 ⭢ 0)"
                              : ""}
                        </span>
                      </div>
                    )}
                  </div>
                )}
                {nannyInfo.map((nanny, index) => (
                  <div
                    key={index}
                    style={styles.nannyItem}
                    onClick={() => {
                      if (nanny.id) {
                        if (kycStatus == 'pending') {
                          Swal.fire({
                            icon: 'error',
                            title: '尚未完成身分驗證',
                          });
                        }
                        else if (orderId == null) {
                          Swal.fire({
                            icon: 'error',
                            title: '請選擇小孩資料或新增小孩資料',
                          });
                        }
                        else {
                          router.push(`/nanny/profile/${nanny.id}`);
                        }
                      } else {
                        console.error("Nanny ID not found");
                      }
                    }}
                  >
                    <div style={styles.rightPart}>
                      <div>
                        <img
                          src={nanny.upload_url || "/nannyIcon.jpg"}
                          style={styles.nannyIcon}
                          alt="Nanny Icon"
                        />
                      </div>
                      <div style={styles.nannyFontLayout}>
                        <div style={styles.nannyNameFont}>{nanny.kyc_name[0]}保母</div>
                        <div style={styles.nannySubInfo}>
                          托育經驗: {nanny.experienment} 年
                        </div>
                      </div>
                    </div>
                    <div style={styles.scoreLayout}>
                      <span style={styles.scoreFont}>{nanny.rating}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="25"
                        viewBox="0 0 24 25"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_75_7187)">
                          <path
                            d="M12 0.5C5.38 0.5 0 5.88 0 12.5C0 19.12 5.38 24.5 12 24.5C18.62 24.5 24 19.12 24 12.5C24 5.88 18.62 0.5 12 0.5ZM17.17 12.12L15 13.89L15.9 16.62C16.02 16.99 15.9 17.4 15.59 17.63C15.28 17.87 14.86 17.88 14.53 17.67L12.01 16.03L9.53 17.69C9.38 17.79 9.2 17.84 9.02 17.84C8.83 17.84 8.63 17.78 8.47 17.66C8.16 17.43 8.03 17.02 8.15 16.65L9.01 13.89L6.83 12.12C6.54 11.87 6.43 11.47 6.56 11.11C6.69 10.75 7.04 10.51 7.42 10.51H10.17L11.14 7.9C11.27 7.54 11.62 7.3 12 7.3C12.38 7.3 12.73 7.54 12.86 7.9L13.83 10.51H16.58C16.96 10.51 17.31 10.75 17.44 11.11C17.57 11.47 17.46 11.88 17.17 12.13V12.12Z"
                            fill="#FFD22F"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_75_7187)">
                            <rect
                              width="24"
                              height="24"
                              fill="white"
                              transform="translate(0 0.5)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "#F3CCD4",
                  width: "100%",
                }}
              >
                <Pagination totalItems={totalCount} pageSize={pageSize} setPage={setPage} onPageChange={handlePageChange}/>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  orderItem: {
    display: "flex",
  },
  searchFont: {
    color: "#000",
    /* Line/medium/11pt */
    fontFamily: "LINE Seed JP_TTF",
    fontSize: "11px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
  },
  searchTypeLayout: {
    display: "flex",
    padding: "0px 10px",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    borderRadius: "30px",
    background: " var(---SurfaceContainer-Lowest, #FFF)",
  },
  searchLayout: {
    display: "flex",
    gap: "12px",
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "center",
    zIndex: "2",
  },
  timeFont: {
    color: "var(---Surface-Black-25, #252525)",
    /* Line/medium/8pt */
    fontFamily: "LINE Seed JP_TTF",
    fontSize: "8px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
  },
  screen: {
    display: "flex",
    padding: "1px 5px",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    borderRadius: "20px",
    border: "1px solid var(---Button-02, #FBC2EB)",
    color: "var(---Outline-OnSurfaceVariant, #221E47)",
    textAlign: "center",
    fontFamily: "LINE Seed JP_TTF",
    fontSize: "8px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
  },
  way: {
    display: "flex",
    padding: "1px 5px",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    borderRadius: "20px",
    background:
      "var(---Button-02, linear-gradient(90deg, #FBC2EB 0%, #A6C1EE 100%))",
    color: "var(---Outline-OnSurfaceVariant, #221E47)",
    textAlign: "center",
    fontFamily: "LINE Seed JP_TTF",
    fontSize: "8px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
  },
  nickname: {
    color: "#1E1E1E",
    /* Line/bold/16pt */
    fontFamily: "LINE Seed JP_TTF",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: "normal",
  },
  orderInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  headIcon: {
    width: "88px",
    height: "88px",
    flexShrink: 0,
  },
  orderInfoLayout: {
    display: "flex",
    width: "218px",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  profilePic: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    marginBottom: "10px",
  },
  nextBtn: {
    padding: "10px 20px",
    backgroundColor: "var(---Primary-Primary, #E3838E)",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  componentLayout: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    borderBottom: "1px solid #f4f4f4",
  },
  hopeLayout: {
    width: "100%",
    display: "flex",
    padding: "5px 10px",
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "stretch",
    borderRadius: "8px",
    border: "1px solid var(---OutLine-OutLine, #78726D)",
    background: "var(---SurfaceContainer-Lowest, #FFF)",
  },
  titleLayout: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
  },
  smallTitle: {
    color: "var(---Primary-OnContainer, #6F2E2A)",
    fontFamily: "LINE Seed JP_TTF",
    fontSize: "16px",
    fontWeight: "800",
    lineHeight: "normal",
    marginBottom: "15px",
  },
  typeFont: {
    color: "var(---SurfaceContainer-Lowest, #FFF)",
    /* Line/bold/24pt */
    fontFamily: "LINE Seed JP_TTF",
    fontSize: "24px",
    fontStyle: "normal",
    fontWeight: "700",
    linHeight: "normal",
  },
  nannySubInfo: {
    color: "var(---Outline-OnSurface, #252525)",
    fontFamily: "LINE Seed JP_TTF",
    fontSize: "11px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
  },
  nannyNameFont: {
    color: "var(---Outline-OnSurface, #252525)",
    fontFamily: "LINE Seed JP_TTF",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: "normal",
  },
  nannyFontLayout: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  nannyIcon: {
    display: "flex",
    width: "60px",
    height: "60px",
    padding: "7.982px",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
  },
  rightPart: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    alignItems: "center",
  },
  nannyItem: {
    display: "flex",
    height: "70px",
    padding: "6px 9px 4px 8px",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    borderRadius: "8px",
    border: "2px solid var(---Button-01, #FBDBD6)",
    background: "var(---SurfaceContainer-Lowest, #FFF)",
    cursor: "pointer",
  },
  nannyItemLayout: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    width: "100%",
    marginBottom: "28px",
    justifyContent: "space-between",
    backgroundColor: "#F3CCD4",
    paddingLeft: "35px",
    paddingRight: "35px",
    paddingTop: "20px",
    borderRadius: "40px 40px 40px 40px", // 左上、右上、右下、左下的圓角
  },
  buttonLayout: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    width: "100%",
    marginBottom: "28px",
    justifyContent: "space-between",
  },
  imgLayout: {
    height: "180px",
    alignSelf: "stretch",
    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
    backgroundColor: "#FFF",
  },
  inputField: {
    padding: "28px 14px",
    borderRadius: "8px",
    border: "1px solid #000",
    background: "var(---SurfaceContainer-Lowest, #FFF)",
    color: "gray",
    width: "100%",
    position: "relative",
    cursor: "pointer",
  },
  dateInput: {
    opacity: 1,
    cursor: "pointer",
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    border: "none",
    zIndex: 999,
    outline: "none",
    background: "transparent",
    padding: "10px",
  },
  lastButton: {
    border: "none",
    backgroundColor: "#FFF",
  },
  subTitleLayout: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    backgroundColor: "#FBDBD6",
  },
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#f8ecec",
    minHeight: "100vh",
    width: "100%",
  },
  scoreLayout: {
    display: "flex",
    gap: "8px",
  },
  iconLayout: {
    height: "38px",
    alignSelf: "stretch",
    fill: "var(---SurfaceContainer-High, #F5E5E5)",
  },
  createButtonLayout: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  createInfoLayout: {
    width: "100%",
    display: "flex",
    height: "85px",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "12px",
    border: "2px dashed var(---Primary-Container, #F3CCD4)",
    background: "var(---SurfaceContainer-Lowest, #FFF)",
    gap: "8px",
    pointer: "cursor",
  },
  createInfoLayoutHave: {
    width: "100%",
    display: "flex",
    height: "85px",
    alignItems: "center",
    borderRadius: "12px",
    background: "var(---SurfaceContainer-Lowest, #FFF)",
    gap: "8px",
    pointer: "cursor",
  },
  header: {
    display: "flex",
    height: "147px",
    alignItems: "center",
    justifyContent:"space-between",
    gap: "20px",
    alignSelf: "stretch",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: "0px 0px 40px 0px", // 左上、右上、右下、左下的圓角
  },
  headerFont: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#E3838E",
  },
  contentLayout: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#f8ecec",
    gap: "10px",
    borderRadius: "40px 0px 40px 0px", // 左上、右上、右下、左下的圓角
  },
  searchInput: {
    display: "flex",
    padding: "8px 52px 8px 12px",
    alignItems: "center",
    gap: "8px",
    flex: "1 0 0",
    borderRadius: "100px",
    border: "1px solid #EBEBEB",
    background: "#FBFBFB",
    marginRight:'20px'
  },
  rollerLayout: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "30px",
  },
  roller: {
    width: "42px",
    height: "6px",
    borderRadius: "2px",
    backgroundColor: "#FFF",
    margin: "0 5px",
  },
  rollerActive: {
    width: "42px",
    height: "6px",
    borderRadius: "2px",
    backgroundColor: "var(---Primary-Primary, #E3838E)",
    margin: "0 5px",
  },
  subTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginTop: "15px",
    marginBottom: "15px",
    color: "#E3838E",
  },
  suddenlyBtn: {
    display: "flex",
    width: "320px",
    height: "130px",
    padding: "16px 12px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    background: "var(---Primary-Primary, #E3838E)",
    border: "none",
    borderRadius: "12px",
  },
  longBtn: {
    display: "flex",
    width: "320px",
    height: "130px",
    padding: "16px 12px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    background: "var(---Primary-Primary, #F3CCD4)",
    border: "none",
    borderRadius: "12px",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
    opacity: 0.5,
    zIndex: 1,
  },
};
