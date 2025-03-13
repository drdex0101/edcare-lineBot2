import React, { useEffect } from "react";
import { useRouter } from "next/router";
const ApplicationPage = () => {
  const router = useRouter();

  const [isChecked, setIsChecked] = React.useState(false); // 新增状态来跟踪复选框状态

  const handleNextClick = () => {
    if (!isChecked) {
      // 检查复选框是否被勾选
      alert("請勾選同意才能進行下一步"); // 提示用户
      return; // 如果没有勾选，阻止跳转
    }
    router.push("/parent/apply"); // 替换 '/next-page' 为你想要跳转的路径
  };
  return (
    <div style={styles.main}>
      <div style={styles.header}>
        <span style={styles.headerFont}>申請成為家長</span>
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
            <div style={styles.topTitle}>我是標題</div>
            <div style={styles.mainContent}>
              我是文字我是文字我是文字我是文字我是文字我是文字
              我是文字我是文字我是文字我是文字我是文字我是文字
              我是文字我是文字我是文字我是文字我是文字我是文字
              我是文字我是文字我是文字我是文字我是文字我是文字
              我是文字我是文字我是文字我是文字我是文字我是文字
              我是文字我是文字我是文字我是文字我是文字我是文字
              我是文字我是文字我是文字我是文字我是文字我是文字
              我是文字我是文字我是文字我是文字我是文字我是文字
              我是文字我是文字我是文字我是文字我是文字我是文字
              我是文字我是文字我是文字我是文字我是文字我是文字
              我是文字我是文字我是文字我是文字我是文字我是文字
              我是文字我是文字我是文字我是文字我是文字我是文字
              我是文字我是文字我是文字我是文字我是文字我是文字
              我是文字我是文字我是文字我是文字我是文字我是文字
              我是文字我是文字我是文字我是文字我是文字我是文字
              我是文字我是文字我是文字我是文字我是文字我是文字
              我是文字我是文字我是文字我是文字我是文字我是文字
              我是文字我是文字我是文字我是文字我是文字我是文字 我是文字我是文字
            </div>
            <div style={styles.checkBox}>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)} // 更新复选框状态
              ></input>
              <span style={styles.inputFont}>我上述之合約內容</span>
            </div>
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
    gap: "8px",
  },
};

export default ApplicationPage;
