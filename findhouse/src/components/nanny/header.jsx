import React from "react";
import { useRouter } from "next/router";

const ApplicationPage = () => {
  const router = useRouter();

  const handleNextClick = () => {
    router.push("/parent/apply"); // 替换 '/next-page' 为你想要跳转的路径
  };

  return (
    <div style={styles.main}>
      <div style={styles.header}>
        <span style={styles.headerFont}>申請成為家長</span>
        <button>
          <img src="/IconMask.svg" alt="描述" />
        </button>
      </div>
    </div>
  );
};

const styles = {
  nextBtn: {
    display: "flex",
    padding: "8px 12px",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    borderRadius: "6px",
    background: "var(---Surface-LT, #F2F2F2)",
    height: "40px",
    border: "none",
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
    background: "#FFF",
  },
  subTitle: {
    color: "#E3838E",
    textAlign: "center",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "normal",
  },
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItem: "center",
    height: "100%",
  },
  header: {
    backgroundColor: "#FFF",
    display: "flex",
    justifyContent: "space-between",
    alignItem: "center",
  },
  headerFont: {
    color: "#E3838E",
    textAlign: "center",
    fontSize: "24px",
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: "normal",
  },
  contentLayout: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#F8ECEC",
    alignItem: "center",
    justifyContent: "center",
    width: "100%",
    flex: 1,
  },
  rollerLayout: {
    display: "flex",
    width: "390px",
    height: "52px",
    padding: "21px 24px",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    flexShrink: "0",
  },
  rollerActive: {
    width: "42px",
    height: "6px",
    borderRadius: "2px",
    background: "#E3838E",
  },
  roller: {
    width: "42px",
    height: "6px",
    borderRadius: "2px",
    background: "#FFF",
  },
};

export default ApplicationPage;
