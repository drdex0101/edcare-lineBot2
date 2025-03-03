import React, { useState, useEffect } from "react";
import "./order.css";
import SearchBarSortOnly from "../../../components/base/SearchBarSortOnly";
import OrderPersonalItem from "../../../components/base/OrderPersonalItem";
import Pagination from "../../../components/base/pagenation";
import { useRouter } from "next/router";
import SettingForParent from "../../../components/base/SettingForParent";
import Loading from "../../../components/base/Loading";
export default function OrderPage() {
  const router = useRouter();
  const [keywords, setKeywords] = useState("");
  const [orderList, setOrderList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [nannyProfile, setNannyProfile] = useState([]);
  const [nannyInfo, setNannyInfo] = useState(null);
  const [nannyProfileImg, setNannyProfileImg] = useState(null);
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    fetchNannyProfile();
  }, []);

  const handleToCreate = async () => {
    router.push("/nanny/create");
  };

  const handleNextClick = () => {
    if (nannyProfile.way === "suddenly") {
      router.push("/nanny/create/suddenly"); // 替换 '/next-page' 为你想要跳转的路径
    } else if (nannyProfile.way === "longTerm") {
      router.push("/nanny/create/long"); // 替换 '/next-page' 为你想要跳转的路径
    }
    router.push("/nanny/create/choose");
  };

  const handleVisibilityToggle = async () => {
    try {
      // Default to true if isShow is null
      const currentIsShow = isShow === null ? true : isShow;

      const response = await fetch(
        `/api/order/updateIsShow?isShow=${!currentIsShow}&id=${orderInfo[orderCurrentPage].id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update visibility");
      }

      setIsShow(!currentIsShow);
    } catch (error) {
      console.error("Error updating visibility:", error);
    }
  };

  const getImgUrl = async (id) => {
    const response = await fetch(`/api/base/getImgUrl?id=${id}`);
    const data = await response.json();
    return data.url;
  };

  const fetchNannyProfile = async () => {
    setIsLoading(true);
    const response = await fetch(`/api/nanny/getNannyProfile`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    setNannyProfile(data.nannyProfile[0]);
    setNannyInfo(data.nannyProfile[0]);
    setNannyProfileImg(await getImgUrl(data.nannyProfile[0].uploadid));
    setIsLoading(false);
  };

  return (
    <div className="order-main">
      {isLoading && (
        <div
          style={{
            position: "fixed", // 確保 Loading 覆蓋整個畫面
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.8)", // 透明度
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999, // 確保 Loading 在最上層
          }}
        >
          <Loading />
        </div>
      )}
      <>
        <div className="order-header">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="20"
            viewBox="0 0 18 20"
            fill="none"
          >
            <path
              d="M9 6.78512C8.36422 6.78512 7.74272 6.97365 7.21408 7.32687C6.68545 7.68009 6.27343 8.18214 6.03013 8.76952C5.78683 9.35691 5.72317 10.0033 5.8472 10.6268C5.97124 11.2504 6.2774 11.8232 6.72696 12.2727C7.17652 12.7223 7.74931 13.0284 8.37287 13.1525C8.99643 13.2765 9.64278 13.2129 10.2302 12.9696C10.8175 12.7263 11.3196 12.3142 11.6728 11.7856C12.026 11.257 12.2146 10.6355 12.2146 9.99968C12.212 9.14791 11.8725 8.33175 11.2702 7.72945C10.6679 7.12716 9.85177 6.78766 9 6.78512ZM15.9402 9.99968C15.9386 10.3001 15.9166 10.6 15.8743 10.8974L17.8308 12.4291C17.916 12.4994 17.9734 12.5978 17.9928 12.7066C18.0122 12.8154 17.9922 12.9275 17.9365 13.023L16.0857 16.2183C16.0294 16.3128 15.9416 16.3846 15.8377 16.4208C15.7338 16.457 15.6204 16.4555 15.5175 16.4164L13.2171 15.4922C12.7381 15.861 12.2139 16.1672 11.6572 16.4031L11.3133 18.8454C11.294 18.9548 11.2374 19.0541 11.153 19.1263C11.0687 19.1986 10.9618 19.2393 10.8508 19.2416H7.14921C7.04018 19.2394 6.93509 19.2004 6.85109 19.1309C6.76709 19.0613 6.70915 18.9653 6.68672 18.8586L6.34276 16.4164C5.78458 16.1832 5.26 15.8765 4.78289 15.5046L2.48247 16.4288C2.37964 16.468 2.2663 16.4696 2.16238 16.4334C2.05847 16.3973 1.97062 16.3256 1.9143 16.2311L0.0635113 13.0362C0.007802 12.9408 -0.0121561 12.8287 0.00720345 12.7199C0.026563 12.6111 0.0839787 12.5127 0.16919 12.4424L2.12565 10.9106C2.08392 10.6087 2.06191 10.3044 2.05976 9.99968C2.06143 9.69932 2.08344 9.39941 2.12565 9.10202L0.16919 7.57028C0.0839787 7.49992 0.026563 7.40155 0.00720345 7.29275C-0.0121561 7.18396 0.007802 7.07182 0.0635113 6.97639L1.9143 3.78111C1.97056 3.68652 2.05838 3.6148 2.1623 3.57857C2.26622 3.54233 2.37959 3.54391 2.48247 3.58301L4.78289 4.5072C5.26191 4.13833 5.78612 3.83221 6.34276 3.59627L6.68672 1.15401C6.70597 1.04461 6.76261 0.945296 6.84697 0.873032C6.93133 0.800769 7.03816 0.760042 7.14921 0.757812H10.8508C10.9598 0.759935 11.0649 0.798955 11.1489 0.868505C11.2329 0.938054 11.2909 1.03402 11.3133 1.14075L11.6572 3.58301C12.2161 3.81606 12.7414 4.12268 13.2191 4.49474L15.5175 3.57056C15.6204 3.53141 15.7337 3.52978 15.8376 3.56594C15.9415 3.6021 16.0294 3.67373 16.0857 3.76825L17.9365 6.96353C17.9922 7.05896 18.0122 7.1711 17.9928 7.2799C17.9734 7.38869 17.916 7.48706 17.8308 7.55742L15.8743 9.08916C15.9161 9.39091 15.9381 9.69507 15.9402 9.99968Z"
              fill="#252525"
            />
          </svg>
          <SettingForParent />
        </div>
        <div
          className={`order-body-header ${nannyProfile.length === 0 ? "disabled" : ""}`}
          onClick={nannyProfile.length > 0 ? handleToCreate : undefined}
        >
          <div className="order-body-header-left">
            <span className="left-font">建立托育資料</span>
          </div>
        </div>
        <div className="profile-layout">
          <div className="profile-layout-left">
            <div className="profile-layout-left-img">
              <img
                src={nannyProfileImg || "/nannyIcon.png"}
                alt="Nanny Profile"
              />
            </div>
            <div className="nannyInfoLayout">
              <span className="name-font">{nannyProfile.name ?? ""}</span>
              <div className="wayLayout">
                <div className="wayStyle">
                  {nannyProfile.way === "suddenly"
                    ? "臨時托育"
                    : nannyProfile.way === "longTerm"
                      ? "長期托育"
                      : ""}
                </div>
                <div className="scenarioStyle">{nannyProfile.scenario}</div>
              </div>
              <span className="headSubTitle">
                托育時間:
                <br />
                ㄧ、二、三、四、五、六、日
              </span>
            </div>
            {!isShow && (
              <div className="overlay"></div> // Add overlay when isShow is false
            )}
          </div>
          <div className="createButtonLayout">
            <div className="iconLayout" onClick={handleNextClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="38"
                height="38"
                viewBox="0 0 38 38"
                fill="none"
              >
                <rect width="38" height="38" rx="4" fill="#F5E5E5" />
                <path
                  d="M26.0231 9C25.2613 9 24.4994 9.29013 23.9179 9.87171L22.6843 11.1053L26.8949 15.3158L28.1284 14.0822C29.2905 12.9201 29.2905 11.0349 28.1284 9.87171C27.5468 9.29013 26.785 9 26.0231 9ZM21.1053 12.6842L9 24.7895V29H13.2106L25.3159 16.8947L21.1053 12.6842Z"
                  fill="#E3838E"
                />
              </svg>
            </div>
            <div className="iconLayout" onClick={handleVisibilityToggle}>
              {isShow ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="38"
                  height="38"
                  viewBox="0 0 38 38"
                  fill="none"
                >
                  <rect width="38" height="38" rx="4" fill="#F5E5E5" />
                  <path
                    d="M30.8209 18.2351C29.8547 16.2781 28.4397 14.5436 26.6759 13.1543L29.7079 10.3225L28.2929 9L24.9999 12.0728C23.1772 11.0881 21.1054 10.5776 18.9999 10.5943C11.4999 10.5943 8.05687 16.4419 7.17887 18.2351C7.06101 18.4754 7 18.7366 7 19.0009C7 19.2653 7.06101 19.5265 7.17887 19.7668C8.14501 21.7237 9.56009 23.4583 11.3239 24.8476L8.29287 27.6794L9.70687 29L12.9999 25.9272C14.8225 26.9119 16.8944 27.4224 18.9999 27.4057C26.4999 27.4057 29.9429 21.5581 30.8209 19.7649C30.9385 19.5249 30.9994 19.264 30.9994 19C30.9994 18.736 30.9385 18.4751 30.8209 18.2351ZM12.9999 19C12.998 17.9713 13.2998 16.9621 13.8721 16.0832C14.4445 15.2043 15.2652 14.4899 16.244 14.0183C17.2229 13.5468 18.322 13.3364 19.4206 13.4104C20.5191 13.4844 21.5745 13.8398 22.4709 14.4376L21.0189 15.7937C20.4093 15.4504 19.7117 15.2674 18.9999 15.2641C17.939 15.2641 16.9216 15.6577 16.1714 16.3583C15.4213 17.0589 14.9999 18.0092 14.9999 19C15.0034 19.6648 15.1993 20.3164 15.5669 20.8857L14.1149 22.2418C13.3898 21.2965 12.9999 20.1628 12.9999 19ZM18.9999 24.6038C17.7548 24.6038 16.541 24.2396 15.5289 23.5624L16.9809 22.2063C17.5904 22.5496 18.2881 22.7326 18.9999 22.7359C20.0607 22.7359 21.0782 22.3423 21.8283 21.6417C22.5784 20.941 22.9999 19.9908 22.9999 19C22.9964 18.3352 22.8005 17.6836 22.4329 17.1143L23.8849 15.7582C24.5249 16.5953 24.9055 17.5811 24.9847 18.6071C25.0639 19.6331 24.8386 20.6596 24.3338 21.5739C23.8289 22.4881 23.0639 23.2546 22.1229 23.7891C21.1819 24.3237 20.1013 24.6056 18.9999 24.6038Z"
                    fill="#E3838E"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="38"
                  height="38"
                  viewBox="0 0 38 38"
                  fill="none"
                >
                  <rect width="38" height="38" rx="4" fill="#F5E5E5" />
                  <g transform="translate(7, 10)">
                    <path
                      d="M23.8209 8.181C22.9429 6.261 19.4999 0 11.9999 0C4.49987 0 1.05687 6.261 0.178871 8.181C0.0610095 8.4383 0 8.71799 0 9.001C0 9.28401 0.0610095 9.5637 0.178871 9.821C1.05687 11.739 4.49987 18 11.9999 18C19.4999 18 22.9429 11.739 23.8209 9.819C23.9385 9.56199 23.9994 9.28265 23.9994 9C23.9994 8.71735 23.9385 8.43801 23.8209 8.181ZM11.9999 15C10.8132 15 9.65315 14.6481 8.66645 13.9888C7.67976 13.3295 6.91072 12.3925 6.45659 11.2961C6.00247 10.1997 5.88365 8.99334 6.11516 7.82946C6.34667 6.66557 6.91812 5.59647 7.75723 4.75736C8.59635 3.91824 9.66544 3.3468 10.8293 3.11529C11.9932 2.88378 13.1996 3.0026 14.296 3.45672C15.3923 3.91085 16.3294 4.67988 16.9887 5.66658C17.648 6.65327 17.9999 7.81331 17.9999 9C17.9983 10.5908 17.3656 12.116 16.2408 13.2409C15.1159 14.3658 13.5907 14.9984 11.9999 15Z"
                      fill="#E3838E"
                    />
                    <path
                      d="M12 13C14.2091 13 16 11.2091 16 9C16 6.79086 14.2091 5 12 5C9.79086 5 8 6.79086 8 9C8 11.2091 9.79086 13 12 13Z"
                      fill="#E3838E"
                    />
                  </g>
                </svg>
              )}
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
