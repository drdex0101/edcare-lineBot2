import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Select from "@mui/material/Select";
import CalendarRangePicker from "../../../../components/base/CalendarRangePicker";
import { MenuItem, InputLabel, FormControl } from "@mui/material";
import useStore from "../../../../lib/store";
import { useState } from "react";

const ApplicationPage = () => {
  const router = useRouter();
  const { careData, setCareData } = useStore();
  const handleNextClick = async () => {
    if (!selectedRange.startDate || !selectedRange.endDate) {
      alert("請填寫所有必填欄位。");
      return;
    } else if (selectedRange.endDate < selectedRange.startDate) {
      alert("開始日期不能晚於結束日期。");
      return;
    }
    await createSuddenlyRecord();
    router.push("/nanny/search/create/nannyInfo"); // 替换 '/next-page' 为你想要跳转的路径
  };

  // Initialize state with default values based on item
  const [selectedRange, setSelectedRange] = useState(() => {
    const today = new Date();
    const threeDaysLater = new Date();
    threeDaysLater.setDate(today.getDate() + 3); // 設定三天後
    return {
      startDate: threeDaysLater.toISOString().split("T")[0], // 格式化 YYYY-MM-DD
      endDate: null,
    };
  });


  const [selectedCareType, setSelectedCareType] = React.useState(() => "");
  const [selectedAddress, setSelectedAddress] = React.useState(() => []);

  const handleCareTypeChange = (e) => {
    setSelectedCareType(e.target.value);
    setSelectedAddress([]); // Reset address when care type changes
  };

  const createSuddenlyRecord = async () => {
    const locationArray = Array.isArray(selectedAddress)
      ? selectedAddress
      : [selectedAddress];
    let response;
    if (careData) {
      response = await fetch("/api/base/updateCareData", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startDate: selectedRange.startDate,
          endDate: selectedRange.endDate,
          scenario: selectedCareType,
          location: locationArray,
          careTime: "",
          idType: "nanny",
          careDataId: careData.id,
          careType: "suddenly",
          weekdays: [],
        }),
      });
    } else {
      response = await fetch("/api/base/createCareData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: "",
          startDate: selectedRange.startDate,
          endDate: selectedRange.endDate,
          careTime: "",
          idType: "nanny",
          careType: "suddenly",
          weekdays: [],
        }),
      });
    }
    if (!response.ok) {
      throw new Error("Failed to insert data into care_data table");
    }
    const data = await response.json();
    console.log(data.careData);
    setCareData(data.careData);
    localStorage.setItem("careTypeId", data.careData.id);
    localStorage.setItem("choosetype", "suddenly");
  };

  const handleLastClick = () => {
    router.back(); // 替换 '/next-page' 为你想要跳转的路径
  };

  const handleDateChange = (range) => {
    console.log("Date change:", range); // 添加日誌來調試
    setSelectedRange({
      startDate: range.startDate || new Date().toISOString().split("T")[0],
      endDate: range.endDate || null,
    });
  };

  useEffect(() => {
    const storedData = localStorage.getItem("data-storage");
    const parsedData = JSON.parse(storedData)?.state?.careData;

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 3);
    const formattedStartDate = currentDate.toISOString().split("T")[0];

    if (careData) {
      setSelectedRange({
        startDate: careData.start_date || formattedStartDate,
        endDate: careData.end_date || null,
      });
      setSelectedCareType(careData.scenario);
      setSelectedAddress(careData.location);
    }
  }, []);

  return (
    <div style={styles.main}>
      <div style={styles.header}>
        <span style={styles.headerFont}>托育資料填寫</span>
        <button onClick={handleLastClick} style={styles.lastButton}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g clip-path="url(#clip0_45_10396)">
              <path
                d="M7.77223 12.9916L18.7822 12.9916C19.3322 12.9916 19.7822 12.5416 19.7822 11.9916C19.7822 11.4416 19.3322 10.9916 18.7822 10.9916L7.77223 10.9916L7.77223 9.20162C7.77223 8.75162 7.23223 8.53162 6.92223 8.85162L4.14223 11.6416C3.95223 11.8416 3.95223 12.1516 4.14223 12.3516L6.92223 15.1416C7.23223 15.4616 7.77223 15.2316 7.77223 14.7916L7.77223 12.9916V12.9916Z"
                fill="#074C5F"
              />
            </g>
            <defs>
              <clipPath id="clip0_45_10396">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
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
              <div style={styles.roller}></div>
          </div>
          <div style={styles.titleLayout}>
            <span style={styles.subTitle}>托育資料填寫</span>
            <span style={styles.smallTitle}>臨時托育</span>
          </div>
          <div style={styles.buttonLayout}>
            <div style={styles.dateLayout}>
              <label style={styles.dateLabel}>開始日期</label>
              <div style={styles.inputField}>
                <input
                  type="date"
                  id="datepicker1"
                  name="startDate"
                  min={
                    selectedRange.startDate
                      ? selectedRange.startDate.split("T")[0]
                      : ""
                  }
                  value={
                    selectedRange.startDate
                      ? selectedRange.startDate.split("T")[0]
                      : ""
                  }
                  style={styles.dateInput}
                  onChange={(e) =>
                    handleDateChange({
                      ...selectedRange,
                      startDate: e.target.value,
                    })
                  }
                  placeholder="請選擇開始日期"
                  lang="zh-TW"
                />
              </div>
            </div>
            <div style={styles.dateLayout}>
              <label style={styles.dateLabel}>結束日期</label>
              <div style={styles.inputField}>
                <input
                  type="date"
                  id="datepicker2"
                  name="endDate"
                  min={
                    selectedRange.startDate
                      ? selectedRange.startDate.split("T")[0]
                      : ""
                  }
                  value={
                    selectedRange.endDate
                      ? selectedRange.endDate.split("T")[0]
                      : ""
                  }
                  style={styles.dateInput}
                  onChange={(e) =>
                    handleDateChange({
                      ...selectedRange,
                      endDate: e.target.value,
                    })
                  }
                  placeholder="請選擇結束日期"
                  lang="zh-TW"
                />
              </div>
            </div>
            <div style={{ width: "100%" }}>
              <CalendarRangePicker
                startDate={selectedRange.startDate}
                endDate={selectedRange.endDate}
                onDateChange={handleDateChange}
                locale="zh-TW"
                styles={{
                  calendar: { maxWidth: "400px" },
                  day: { width: "50px", height: "50px" },
                }}
              />
            </div>
          </div>
          <div style={styles.comfirmLayout}>
            <div style={styles.comfirmBtn}>
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
    </div>
  );
};

const styles = {
  inputContainer: {
    position: "relative",
    display: "inline-block",
    width: "100%",
  },

  dateInput: {
    width: "100%",
    padding: "10px 5px",
    fontSize: "16px",
    boxSizing: "border-box",
  },

  floatingLabel: {
    position: "absolute",
    top: "50%",
    left: "10px",
    transform: "translateY(-50%)",
    transition: "0.2s ease all",
    color: "#aaa",
    pointerEvents: "none",
  },
  dateInput: {
    "&:focus + floatingLabel, &:not(:placeholder-shown) + floatingLabel": {
      top: 0,
      left: 5,
      fontSize: "12px",
      color: "#555",
      background: "#fff",
      padding: "0 2px", // Fixed padding syntax
    },
  },
  address: {
    color: "var(---Surface-Black-25, #252525)",
    fontFamily: "LINE Seed JP_TTF",
    fontSize: "11px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
  },
  addressName: {
    color: "var(---Error-OnContainer, #410002)",
    fontFamily: "LINE Seed JP_TTF",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: "normal",
  },
  comfirmBtn: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  nextBtn: {
    display: "flex",
    padding: "8px 12px",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    borderRadius: "6px",
    background: "var(---Primary-Primary, #E3838E)",
    border: "none",
    color: "#fff",
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
  comfirmLayout: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    gap: "24px",
    marginBottom: "28px",
    width: "100%",
  },
  buttonLayout: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    gap: "24px",
    width: "100%",
    marginBottom: "28px",
  },
  imgLayout: {
    height: "180px",
    alignSelf: "stretch",
    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
    backgroundColor: "#FFF",
  },
  dateLayout: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "100%",
  },
  inputField: {
    padding: "25px 14px",
    borderRadius: "8px",
    border: "1px solid #d4d4d4",
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

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#e3838e",
      "& + .MuiSwitch-track": {
        backgroundColor: "#f5e5e5",
        opacity: 1,
        border: 0,
        ...theme.applyStyles("dark", {
          backgroundColor: "#2ECA45",
        }),
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: theme.palette.grey[100],
      ...theme.applyStyles("dark", {
        color: theme.palette.grey[600],
      }),
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: 0.7,
      ...theme.applyStyles("dark", {
        opacity: 0.3,
      }),
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: "#fcf7f7",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
    ...theme.applyStyles("dark", {
      backgroundColor: "#39393D",
    }),
  },
}));

export default ApplicationPage;
