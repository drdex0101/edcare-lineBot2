import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Select from "@mui/material/Select";
import CalendarWeekendPicker from "../../../../components/base/CalendarWeekendPicker";
import Loading from "../../../../components/base/Loading";
import { MenuItem, InputLabel, FormControl } from "@mui/material";
import useStore from "../../../../lib/store";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";

const ApplicationPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleLastClick = () => {
    router.back(); // 替换 '/next-page' 为你想要跳转的路径
  };
  const { careData, setCareData } = useStore();
  const [selectedRange, setSelectedRange] = useState(() => {
    const today = new Date();
    const threeDaysLater = new Date();
    threeDaysLater.setDate(today.getDate() + 3);
    return {
      startDate: threeDaysLater.toISOString().split("T")[0],
      endDate: null,
    };
  });

  const [selectedAddress, setSelectedAddress] = React.useState(() => []);

  useEffect(() => {
    if (careData) {
      setSelectedCareTime(careData?.care_time || "");
      setSelectedScenario(careData?.scenario || "");
      setSelectedRange({
        startDate: careData?.start_date || "",
        endDate: careData?.end_date || "",
      });
      setLocation(careData?.location || []);
      console.log(careData);
    }
  }, [careData]);

  const createCareData = async () => {
    setIsLoading(true);
    const locationArray = Array.isArray(selectedAddress)
      ? selectedAddress
      : [selectedAddress];
    const response = await fetch("/api/base/createCareData", {
      method: "POST",
      body: JSON.stringify({
        weekdays: selectedDays,
        careTime: selectedCareTime,
        scenario: selectedScenario,
        idType: "parent",
        careType: "longTern",
        startDate: selectedRange.startDate,
        endDate: selectedRange.endDate,
        location: locationArray,
      }),
    });
    const data = await response.json();
    localStorage.setItem("careTypeId", data.careData.id);
    localStorage.setItem("choosetype", "longTern");
    setCareData(data.careData);
    setIsLoading(false);
  };

  const updateCareData = async () => {
    setIsLoading(true);
    const locationArray = Array.isArray(selectedAddress)
      ? selectedAddress
      : [selectedAddress];
    const response = await fetch("/api/base/updateCareData", {
      method: "PATCH",
      body: JSON.stringify({
        careDataId: careData.id,
        weekdays: selectedDays,
        careTime: selectedCareTime,
        scenario: selectedScenario,
        idType: "parent",
        careType: "longTern",
        startDate: selectedRange.startDate,
        endDate: selectedRange.endDate,
        location: locationArray,
      }),
    });
    const data = await response.json();
    localStorage.setItem("careTypeId", data.careData.id);
    localStorage.setItem("choosetype", "longTern");
    setCareData(data.careData);
    setIsLoading(false);
  }

  const handleNextClick = async () => {
    try {
      if (!selectedCareTime || !selectedScenario || !selectedRange.startDate || !selectedRange.endDate || !selectedAddress) {
        Swal.fire({
          icon: "error",
          title: "錯誤",
          text: "請填寫所有必填欄位。",
        });
        return;
      }
      // ✅ 檢查結束日期是否早於開始日期
      const startDate = new Date(selectedRange.startDate);
      const endDate = new Date(selectedRange.endDate);
      if (endDate < startDate) {
        console.log(startDate,endDate);
        Swal.fire({
          icon: "error",
          title: "日期錯誤",
          text: "結束日期不可早於開始日期，請修改資料。",
        });
        return;
      }
      
      if (careData?.id) {
        await updateCareData();
      } else {
        await createCareData();
      }
      router.push("/parent/search/create/babyInfo");
    } catch (error) {
      console.error("發生錯誤:", error);
      Swal.fire({
        icon: "error",
        title: "發生錯誤",
        text: "請稍後再試。",
      });
    }
  };

  const handleDateChange = (range) => {
    console.log("Date change:", range); // 添加日誌來調試
    setSelectedRange({
      startDate: range.startDate || new Date().toISOString().split("T")[0],
      endDate: range.endDate || null,
    });
  };

  const [selectedDays, setSelectedDays] = useState([]);

  const [selectedCareTime, setSelectedCareTime] = useState("");
  const [selectedScenario, setSelectedScenario] = useState("");
  const [location, setLocation] = useState([]);

  return (
    <div style={styles.main}>
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
        <div style={styles.header}>
          <span style={styles.headerFont}>編輯家長資料</span>
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
              <span style={styles.smallTitle}>長期托育</span>
            </div>
            <div style={styles.buttonLayout}>
              <FormControl>
                <InputLabel id="gender-label">托育時間</InputLabel>
                <Select
                  required
                  labelId="care-time-label"
                  id="care-time"
                  value={selectedCareTime}
                  onChange={(e) => setSelectedCareTime(e.target.value)}
                  label="托育時間"
                  InputProps={{
                    sx: {
                      padding: "0px 16px",
                      borderRadius: "8px",
                      backgroundColor: "var(--SurfaceContainer-Lowest, #FFF)",
                    },
                  }}
                  sx={{
                    alignSelf: "stretch",
                    borderRadius: "8px",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "var(--OutLine-OutLine, #78726D)",
                      },
                      "&:hover fieldset": {
                        borderColor: "#E3838E",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#E3838E",
                      },
                    },
                    backgroundColor: "var(--SurfaceContainer-Lowest, #FFF)",
                  }}
                >
                  <MenuItem value="allDay">全日</MenuItem>
                  <MenuItem value="morning">日間</MenuItem>
                  <MenuItem value="night">夜間</MenuItem>
                </Select>
              </FormControl>
              <div style={styles.dateLayout}>
                  <label style={styles.dateLabel}>開始日期</label>
                  <div style={styles.inputField}>
                    <input
                      type="date"
                      id="datepicker1"
                      name="startDate"
                      min={(() => {
                        const minDate = new Date();
                        minDate.setDate(minDate.getDate() + 3);
                        return minDate.toISOString().split("T")[0];
                      })()}
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
                      min={(() => {
                        const minDate = new Date();
                        minDate.setDate(minDate.getDate() + 3);
                        return minDate.toISOString().split("T")[0];
                      })()}
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
              <FormControl>
                <InputLabel id="gender-label">選擇情境</InputLabel>
                <Select
                  required
                  labelId="scenario-label"
                  id="scenario"
                  value={selectedScenario}
                  onChange={(e) => setSelectedScenario(e.target.value)}
                  label="托育場景"
                  InputProps={{
                    sx: {
                      padding: "0px 16px",
                      borderRadius: "8px",
                      backgroundColor: "var(--SurfaceContainer-Lowest, #FFF)",
                    },
                  }}
                  sx={{
                    alignSelf: "stretch",
                    borderRadius: "8px",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "var(--OutLine-OutLine, #78726D)",
                      },
                      "&:hover fieldset": {
                        borderColor: "#E3838E",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#E3838E",
                      },
                    },
                    backgroundColor: "var(--SurfaceContainer-Lowest, #FFF)",
                  }}
                >
                  <MenuItem value="home">
                      <span style={styles.addressName}>在宅托育</span>
                      <span style={styles.address}>(至保母居服處)</span>
                    </MenuItem>
                    <MenuItem style={styles.addressName} value="toHome">
                      <span style={styles.addressName}>到宅托育</span>
                      <span style={styles.address}>(至家長住所)</span>
                    </MenuItem>
                </Select>
              </FormControl>
              {(selectedScenario === "home" ||
                  selectedScenario === "toHome") && (
                  <FormControl>
                    <InputLabel id="gender-label">托育地區</InputLabel>
                    <Select
                      required
                      multiple
                      labelId="gender-label"
                      id="gender"
                      label="托育地區"
                      value={selectedAddress}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value.length <= 5) {
                          setSelectedAddress(value);
                        } else {
                          Swal.fire({
                            icon: "error",
                            title: "最多只能選擇5個地區",
                            confirmButtonText: "確定",
                          });
                        }
                      }}
                      sx={{
                        alignSelf: "stretch",
                        borderRadius: "8px",
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "var(--OutLine-OutLine, #78726D)",
                          },
                          "&:hover fieldset": {
                            borderColor: "#E3838E",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#E3838E",
                          },
                        },
                        backgroundColor: "var(--SurfaceContainer-Lowest, #FFF)",
                      }}
                    >
                      {[
                        "斗六",
                        "斗南",
                        "林內",
                        "古坑",
                        "莿桐",
                        "虎尾",
                        "西螺",
                        "二崙",
                        "土庫",
                        "大埤",
                        "北港",
                        "元長",
                        "四湖",
                        "水林",
                        "口湖",
                        "麥寮",
                        "崙背",
                        "褒忠",
                        "東勢",
                        "台西",
                      ].map((location) => (
                        <MenuItem key={location} value={location}>
                          {location}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
            </div>
            <div style={styles.buttonLayout}>
              <button style={styles.nextBtn} onClick={handleNextClick}>
                下一步
              </button>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

const styles = {
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
  dateLayout: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "100%",
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
