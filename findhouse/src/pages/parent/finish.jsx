import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Loading from "../../components/base/Loading";

import "./css/finish.css";
const ApplicationPage = () => {
  const router = useRouter();

  const [isMember, setIsMember] = useState(false);
  const [haveKyc, setHaveKyc] = useState(false);
  const [haveOrder, setHaveOrder] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async () => {
    try {
      const response = await fetch("/api/member/isMemberExist");
      const data = await response.json();
      if (data.member.length > 0) {
        setIsMember(true);
      }
      if (data.member[0].kyc_id) {
        setHaveKyc(true);
      }
    } catch (error) {
      console.error("Error fetching member data:", error);
    }
  };

  const fetchOrder = async () => {
    try {
      const response = await fetch("/api/order/getOrderInfo");
      const data = await response.json();
      if (data.orders.length > 0) {
        setHaveOrder(true);
      }
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        await Promise.all([fetchData(), fetchOrder()]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAllData();
  }, []);

  useEffect(() => {
    console.log('Status updated:', { isMember, haveKyc, haveOrder });
  }, [isMember, haveKyc, haveOrder]);

  const handleClick = () => {
    if (!isMember) {
      router.push("/parent/apply");
    } else if (!haveKyc) {
      router.push("/parent/upload");
    } else if (!haveOrder) {
      router.push("/parent/create");
    }
  };

  return (
    <div style={styles.main}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div style={styles.header}>
            <span style={styles.headerFont}>申請進度查詢</span>
          </div>
          <div
            style={{
              backgroundColor: "white",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div style={styles.contentLayout}>
              <div style={styles.rollerLayout}>
                <div style={styles.rollerActive}></div>
                <div style={styles.rollerActive}></div>
                <div style={styles.rollerActive}></div>
                <div style={styles.rollerActive}></div>
                <div style={styles.rollerActive}></div>
              </div>
              <div className="outlineBorder">
                {isMember && haveKyc && haveOrder ? (
                  <div className="flexColumn">
                    <span className="outlineTitle">您的資料已完成，</span>
                    <span className="outlineTitle">請稍等資料審核。</span>
                  </div>
                ) : (
                  <div className="flexColumn">
                    <span className="outlineTitle">您的資料尚未完成，</span>
                    <span className="outlineTitle">請先繼續資料填寫。</span>
                  </div>
                )}
                {isMember && haveKyc && haveOrder ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="31"
                    height="30"
                    viewBox="0 0 31 30"
                    fill="none"
                  >
                    <circle cx="15.5" cy="15" r="15" fill="#F5E5E5" />
                    <path
                      d="M12.1637 19.8949L8.5146 16.0678C8.10798 15.6414 7.46157 15.6414 7.05496 16.0678C6.64835 16.4943 6.64835 17.1722 7.05496 17.5987L11.4234 22.1802C11.8301 22.6066 12.4869 22.6066 12.8935 22.1802L23.945 10.6006C24.3517 10.1742 24.3517 9.49627 23.945 9.06983C23.5384 8.64339 22.892 8.64339 22.4854 9.06983L12.1637 19.8949Z"
                      fill="#E3838E"
                    />
                  </svg>
                ) : (
                  <svg
                    width="37"
                    height="36"
                    viewBox="0 0 37 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={handleClick}
                    style={{ cursor: "pointer" }}
                  >
                    <g id="Group 3602">
                      <g id="Union">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M33.5001 18.054C33.5001 14.0622 31.8351 10.3014 29.0734 7.43221L29.0684 7.4271C26.301 4.66244 22.5338 3 18.5397 3C14.553 3 10.7824 4.54925 8.00857 7.42963C3.25113 12.1842 2.13997 19.1606 5.24336 25.0289L5.41047 25.3449L8.01253 24.0452C8.01253 24.0452 10.3515 28.4262 7.83549 23.7136C5.31952 19.0009 6.25971 13.3432 10.042 9.56508L10.0537 9.55216C12.1402 7.25886 15.1737 5.99977 18.4313 5.99977C21.687 5.99977 24.7252 7.25824 26.9232 9.55876L26.9292 9.56477C29.2401 11.8734 30.4976 14.9129 30.4976 18.0539C30.4976 21.1999 29.2368 24.3423 26.9352 26.537L26.9292 26.543C23.1515 30.3171 17.4861 31.157 12.76 28.7441L12.4162 28.5686L11.2523 31.185L11.5653 31.3414C13.7773 32.4462 16.1036 33 18.5399 33C22.4225 33 26.1907 31.4481 29.0685 28.5729C31.8359 25.8082 33.5001 22.0446 33.5001 18.054Z"
                          fill="#E3838E"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M20.7682 17.7539L20.7685 22.74H23.6623V12.8282H13.7416V15.7199H18.7314L6.99419 27.3408L9.13557 29.4801L20.7682 17.7539Z"
                          fill="#E3838E"
                        />
                      </g>
                    </g>
                  </svg>
                )}
              </div>
              <div className="outlineBorderSecond">
                <div className="flexColumnSecond">
                  <span className="secondTitle">我需要完成哪些步驟？</span>
                  <span className="secondSubTitle">
                    除了完整填寫資料外，您還需要驗證您的手機號碼，送出資料後可進行驗證流程。
                  </span>
                </div>
                <div className="flexColumnSecond">
                  <span className="secondTitle">什麼時候會通過審核？</span>
                  <span className="secondSubTitle">
                    審核時間約2~3天的時間，我們會撥電話給您做身分確認與審核。
                  </span>
                </div>
                <div className="flexColumnSecond">
                  <span className="secondTitle">我可以修改資料嗎？</span>
                  <span className="secondSubTitle">
                  可以的，您送出資料後，可以在此頁進入修改申請資料頁面，若您有修改身份驗證，必須重新驗證。
                  </span>
                </div>
              </div>
              {isMember && haveKyc && haveOrder ? (
                <></>
              ) : (
                <button style={styles.goToLink} onClick={handleClick}>點我繼續填寫資料</button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  goToLink: {
    display: "flex",
    height: "34px",
    padding: "12px 16px",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    borderRadius: "32px",
    background: "var(---Primary-Primary, #E3838E)",
    color: "var(---SurfaceContainer-Lowest, #FFF)",
    fontFamily: "Source Sans Pro",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: "24px",
    border: "none",
    marginTop: "20px",
  },
  lastButton: {
    border: "none",
    backgroundColor: "#FFF",
  },
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh", // 占满整个视口高度
    backgroundColor: "#f8ecec",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    maxWidth: "600px",
    // marginBottom: '20px',
    padding: "10px",
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
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "#f8ecec",
    paddingLeft: "35px",
    paddingRight: "35px",
    paddingTop: "20px",
    borderRadius: "40px 0px 0px 0px", // 左上、右上、右下、左下的圓角
  },
  rollerLayout: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "10px",
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

  lawLayout: {
    display: "flex",
    width: "320px",
    padding: "18.5px 18px 19.5px 17px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "20px",
    border: "2px solid var(---Button-01, #FBDBD6)",
    gap: "20px",
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
};

export default ApplicationPage;
