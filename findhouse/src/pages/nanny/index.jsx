import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import useStore from "../../lib/store";
const ApplicationPage = () => {
  const router = useRouter();
  const { userId } = router.query;
  const [isChecked, setIsChecked] = React.useState(false); // 新增状态来跟踪复选框状态
  const { memberInfo, setMemberInfo } = useStore();
  const { kycData, setKycData } = useStore();
  const {babyInfo, setBabyInfo} = useStore();
  const {careData, setCareData} = useStore();
  const {nannyInfo, setNannyInfo} = useStore();
  const {orderId, setOrderId} = useStore();
  const {item, setItem} = useStore();
  const {memberId, setMemberId} = useStore();
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const contentRef = useRef(null);

  const handleScroll = () => {
    const el = contentRef.current;
    if (el) {
      const isBottom =
        el.scrollHeight - el.scrollTop <= el.clientHeight + 5; // 允許誤差5px
      if (isBottom) {
        setScrolledToBottom(true);
      }
    }
  };
  
  const handleNextClick = () => {
    if (!isChecked) {
      // 检查复选框是否被勾选
      alert("請勾選同意才能進行下一步"); // 提示用户
      return; // 如果没有勾选，阻止跳转
    }
    router.push("/nanny/apply"); // 替换 '/next-page' 为你想要跳转的路径
  };

  useEffect(() => {
    fetch("/api/line/changeRichMenu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        richMenuId: "richmenu-e2577cc1b2bd4a59ad7fe9c3b99605ba",
      }),
    })
    setMemberInfo(null);
    setKycData(null);
    setBabyInfo(null);
    setCareData(null);
    setNannyInfo(null);
    setOrderId(null);
    setItem(null);
    setMemberId(null);
  }, []);
  
  return (
    <div style={styles.main}>
      <div style={styles.header}>
        <span style={styles.headerFont}>申請成為保母</span>
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
            <div style={styles.roller}></div>
            <div style={styles.roller}></div>
            <div style={styles.roller}></div>
            <div style={styles.roller}></div>
          </div>
          <div style={styles.subTitleLayout}>
            <span style={styles.subTitle}>會員同意書</span>
          </div>
          <div style={styles.lawLayout}>
            <div style={styles.topTitle}>個資蒐集、處理及利用同意書</div>
            <div
          style={styles.mainContentScroll}
          ref={contentRef}
          onScroll={handleScroll}
        >
           雲林縣社會局(以下簡稱本局)為遵守個人資料保護法規定，並保障當事人之權利，依法告知下列事項：
            蒐集個人資料之目的：為辦理線上媒合病患、年長者及其家屬所需之就醫或回診接送、陪診之服務，於符合個人資料保護法之相關規定下，正當蒐集、處理及利用之相關個人資料。
            蒐集之個人資料類別：
            C001辨識個人者：例如姓名、職稱、住址、工作地址、住家電話號碼、行動電話、通訊及戶籍地址、相片、電子郵遞地址及其他任何可辨識資料本人者等。
            C003政府資料中之辨識者：例如身分證統一編號、統一證號、殘障手冊號碼、證照號碼、護照號碼等。
            C011個人描述：例如年齡、性別、出生年月日、出生地、國籍等。
            C012個人描述：例如身高、體重、血型等。
            C111健康紀錄：例如醫療報告、治療與診斷紀錄、檢驗結果、身心障礙種類、等級、有效期間、身心障礙手冊證號及聯絡人等。
            以上個人之資料皆受本局保全維護，並僅限於第一條所定目的下蒐集、處理及利用。
            個人資料利用之期間、地區、對象及方式：
            期間：1.依據上開蒐集目的之存續期間；2.依相關法令規定或契約約定之保存年限。
            地區：本局所在地、與本局有業務往來之海內外相關主管機關、他國辦事處所在地。
            使用對象：本局及本局國內外分支機構、其他與本局有業務往來之海內外相關主管機關、他國辦事處、依法有調查權機關或監理機關。
            方式：以自動化機器或其他非自動化之利用方式（例如言詞、書面、電話、簡訊、電子郵件、傳真、電子文件、新聞雜誌、政府公報或網站公告等紙本或非紙本及其他合於當時科技之適當方式）或符合個人資料保護法第20條規定之利用。
            依據個人資料保護法第3條規定，台端就本公司保有台端之個人資料得行使下列權利：
            得向本局查詢、請求閱覽或請求製給複製本。
            得向本局請求補充或更正，惟依法台端應為適當之釋明。
            得向本局請求停止蒐集、處理或利用及請求刪除，惟依法本局因執行業務所必須者，得不依台端請求為之。
            台端不提供個人資料所致權益之影響：本局係基於上述目的而須蒐集、處理或利用台端之個人資料，若台端不同意本局蒐集、處理及利用台端之個人資料，或是提供台端之個人資料不完整，本局將無法提供台端最完善服務（包括但不限於無法媒合最適切之接送、陪診員等），尚請見諒。
            台端同意提供個人資料之聲明：
            台端已充分了解上述告知事項、權利行使事項及注意事項之內容，且本局、關係企業得依法變更或新增該內容，並以口頭、書面、電話、簡訊、電子郵件、傳真、電子文件、新聞雜誌、政府公報等方式或網站公告方式供台端知悉及查閱。
            台端謹同意本局、關係企業得依上述告知事項，對台端之個人資料為蒐集、處理及利用。
        </div>
            {scrolledToBottom && (
                <div style={styles.checkBox}>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                  />
                  <span style={styles.inputFont}>我同意上述之合約內容</span>
                </div>
              )}
          </div>
          <div style={styles.buttonLayout}>
            <button style={styles.nextBtn} onClick={handleNextClick}>
              下一步
              <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_45_10393)">
                      <path
                        d="M14.29 5.71047C13.9 6.10047 13.9 6.73047 14.29 7.12047L18.17 11.0005H3C2.45 11.0005 2 11.4505 2 12.0005C2 12.5505 2.45 13.0005 3 13.0005H18.18L14.3 16.8805C13.91 17.2705 13.91 17.9005 14.3 18.2905C14.69 18.6805 15.32 18.6805 15.71 18.2905L21.3 12.7005C21.69 12.3105 21.69 11.6805 21.3 11.2905L15.7 5.71047C15.32 5.32047 14.68 5.32047 14.29 5.71047Z"
                        fill="#FFFFFF"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_45_10393">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  inputFont: {
    color: "var(---Surface-Black-25, #252525)",
    fontFamily: "LINE Seed JP_TTF",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: "normal",
  },
  checkBox: {
    display: "flex",
    gap: "4px",
    justifyContent: "flex-start",
    width: "100%",
  },
  mainContent: {
    color: "var(---Surface-Black-25, #252525)",
    fontFamily: "LINE Seed JP_TTF",
    fontSize: "11px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
  },
  mainContentScroll: {
    overflowY: "auto",
    flex: 1,
    padding: "10px",
    width: "100%",
    maxHeight: "440px", // 固定高度
    marginBottom: "10px",
    fontSize: "11px",
    lineHeight: "1.4",
  },
  topTitle: {
    color: "var(---Surface-Black-25, #252525)",
    fontFamily: "LINE Seed JP_TTF",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: "normal",
  },
  inputField: {
    display: "flex",
    padding: "0px 16px",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "12px",
    alignSelf: "stretch",
    borderRadius: "8px",
    border: "1px solid var(---OutLine-OutLine, #78726D)",
    background: "var(---SurfaceContainer-Lowest, #FFF)",
  },
  lastButton: {
    border: "none",
    backgroundColor: "#FFF",
  },
  buttonLayout: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "12px",
  },
  subTitleLayout: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    backgroundColor: "#f8ecec",
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
    marginBottom: "20px",
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
    maxWidth: "320px",
    minWidth: "300px",
    padding: "18.5px 18px 19.5px 17px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "20px",
    border: "2px solid var(---Button-01, #FBDBD6)",
    background: "#FFF",
  },
  nextBtn: {
    padding: "10px 20px",
    backgroundColor: "var(---Primary-Primary, #E3838E)",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ApplicationPage;
