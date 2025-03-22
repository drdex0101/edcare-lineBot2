import React, { useState, useEffect } from "react";
import "./matching.css";
import "./profile.css";
import Pagination from "../../../components/base/pagenation";
import SearchBarSortOnly from "../../../components/base/SearchBarSortOnly";
import { useRouter } from "next/router";
import Loading from "../../../components/base/Loading";
import SettingForParent from "../../../components/base/SettingForParent";
export default function HistoryPage() {
  const router = useRouter();
  const [totalItem, setTotalItem] = useState(0);
  const [currentPage, setCurrentPage] = useState(0); // Track current page
  const pageSize = 5;
  const [isLoading, setIsLoading] = useState(true);
  const [keywords, setKeywords] = useState("");
  const [selectedSort, setSelectedSort] = useState("time"); // 新增狀態以追蹤選擇的排序
  const [orderCurrentPage, setOrderCurrentPage] = useState(1);
  const [favoriteList, setFavoriteList] = useState([]);
  const itemsPerPage = 1; // 每頁顯示 1 筆
  // 計算目前頁面的資料
  const indexOfLastItem = orderCurrentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const handleFetchClick = () => {
    fetchFavoriteList(currentPage, pageSize, keywords);
  };

  const fetchFavoriteList = async (
    page,
    pageSize = 5,
    keywords,
    selectedSort,
  ) => {
    setIsLoading(true); // Set loading state to true while fetching data
    try {
      const response = await fetch(
        `/api/favorite/getFavoriteListByParent?page=${page}&pageSize=${pageSize}&sort=${selectedSort}&keyword=${keywords}&type=parent`,
        {
          method: "GET",
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        },
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setFavoriteList(data.favorite);
      setTotalItem(data.favorite.length);
    } catch (error) {
      console.error("Error fetching nanny info:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getImgUrl = (imgId) => {
    return `/api/upload/getImgUrl?imgId=${imgId}`;
  };

  useEffect(() => {
    let isCancelled = false;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        if (!isCancelled) {
          await fetchFavoriteList(currentPage, pageSize, keywords);
          setIsLoading(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      isCancelled = true; // 在組件卸載時取消請求
    };
  }, [currentPage, keywords]); // 監聽關鍵依賴變數

  const handlePageChange = (page) => {
    console.log("page:", page);
    setCurrentPage(page); // Update currentPage when a new page is selected
  };

  const handleFilterChange = (sorts) => {
    setSelectedSort(sorts);
    fetchFavoriteList(currentPage, pageSize, keywords, selectedSort); // Fetch nanny info with updated filters
  };

  return (
    <div className="matching-main">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="matching-body-header-background">
            <div style={styles.header}>
              <div style={styles.headerSetting}>
                <img
                  src="/icon/arrowForward.svg"
                  alt="back"
                  onClick={() => router.back()}
                />
                <SettingForParent />
              </div>
              <div style={styles.header}>
                <div style={styles.headerTitleLayout}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="25"
                    viewBox="0 0 26 25"
                    fill="none"
                  >
                    <path
                      d="M13 6.06508C10.3333 -0.194174 1 0.472493 1 8.47253C1 16.4726 13 23.1395 13 23.1395C13 23.1395 25 16.4726 25 8.47253C25 0.472493 15.6667 -0.194174 13 6.06508Z"
                      fill="#E3838E"
                      stroke="#E3838E"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span style={styles.headerTitleFont}>收藏保母</span>
                </div>
              </div>
            </div>
          </div>

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
                        value={keywords || ""}
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
              </div>
            </div>
            <div className="matching-body-layoff-content-background">
              <div className="matching-body-layoff-content">
                  <div style={styles.nannyItemLayout}>
                    {favoriteList.map((favorite, index) => (
                      <div
                        key={index}
                        style={styles.nannyItem}
                        onClick={() => {
                          if (favorite.id) {
                            router.push(`/nanny/profile/${favorite.id}`);
                          } else {
                            console.error("favorite ID not found");
                          }
                        }}
                      >
                        <div style={styles.rightPart}>
                          <div>
                            <img
                              src={favorite.uploadId ? getImgUrl(favorite.uploadId) : "/nannyIcon.jpg" }
                              style={styles.nannyIcon}
                              alt="Nanny Icon"
                            />
                          </div>
                          <div style={styles.nannyFontLayout}>
                            <div style={styles.nannyNameFont}>{favorite.account}</div>
                            <div style={styles.nannySubInfo}>
                              托育經驗: {favorite.experienment} 年
                            </div>
                          </div>
                        </div>
                        <div style={styles.scoreLayout}>
                          <span style={styles.scoreFont}>{favorite.score}</span>
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
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "#F3CCD4",
                  width: "100%",
                }}
              >
                <Pagination
                  totalItems={totalItem}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                  fetchNannyInfoList={fetchFavoriteList}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  headerTitleLayout: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitleFont: {
    color: "var(---OutLine-OnSurfaceVariant, #504B49)",
    textAlign: "center",
    fontFamily: "LINE Seed JP_TTF",
    fontSize: "24px",
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: "normal",
  },
  headerSetting: {
    display: "flex",
    height: "50px",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    width: "100%",
  },
  scenarioStyle: {
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
  wayStyle: {
    display: "flex",
    padding: "1px 5px",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    borderRadius: "20px",
    background: "linear-gradient(81deg, #FBDBD6 10.58%, #D9DFF0 75.92%)",
    color: "var(---Outline-OnSurfaceVariant, #221E47)",
    textAlign: "center",
    fontFamily: "LINE Seed JP_TTF",
    fontSize: "8px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
  },
  wayLayout: {
    display: "flex",
    alignItems: "flex-start",
    gap: "4px",
    alignSelf: "stretch",
  },
  scenarioStyle: {
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
  headSubTitle: {
    color: "var(---Surface-Black-25, #252525)",
    fontFamily: "LINE Seed JP_TTF",
    fontSize: "8px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
  },
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
  nannyInfoLayout: {
    display: "flex",
    width: "110px",
    height: "82px",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "6px",
    flexShrink: "0",
  },
  headIcon: {
    width: "87.772px",
    height: "87.772px",
    flexShrink: "0",
    backgroundColor: "#E3838E",
    borderRadius: "50%",
    overflow: "hidden", // 添加這行來確保圖片不會溢出圓形區域
    display: "flex", // 添加這行來居中圖片
    justifyContent: "center", // 添加這行來居中圖片
    alignItems: "center", // 添加這行來居中圖片
  },
  headIconImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover", // 確保圖片填充整個空間並保持比例
  },
  createInfoLayout: {
    display: "flex",
    width: "218px",
    alignItems: "center",
    gap: "15px",
    justifyContent: "center",
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
    borderRadius: "40px 0px 0px 0px", // 左上、右上、右下、左下的圓角
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
    alignSelf: "stretch",
    fill: "var(---SurfaceContainer-High, #F5E5E5)",
    gap: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  createButtonLayout: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  createInfoLayout: {
    display: "flex",
    width: "218px",
    alignItems: "center",
    gap: "15px",
    justifyContent: "center",
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
    padding: "15px 38px",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: "20px",
    alignSelf: "stretch",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: "0px 0px 40px 0px", // 左上、右上、右下、左下的圓角
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
  },
  rollerLayout: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "30px",
    marginRight: "10px",
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
