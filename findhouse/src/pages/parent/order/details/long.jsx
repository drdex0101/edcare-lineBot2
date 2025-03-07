import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Select from "@mui/material/Select";
import CalendarWeekendPicker from "../../../../components/base/CalendarWeekendPicker";
import useStore from "../../../../lib/store";

import { MenuItem, InputLabel, FormControl } from "@mui/material";
const ApplicationPage = () => {
  const router = useRouter();

  const item = useStore((state) => state.item);

  useEffect(() => {
    console.log(item);
  }, [item]);

  const handleNextClick = () => {
    router.push("/parent/order/details/babyInfo"); // 替换 '/next-page' 为你想要跳转的路径
  };

  const handleLastClick = () => {
    router.back(); // 替换 '/next-page' 为你想要跳转的路径
  };

  const [selectedDays, setSelectedDays] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });

  const [selectedCareType, setSelectedCareType] = useState(
    item ? item.long_scenario : "",
  );

  const handleDayChange = (day) => {
    setSelectedDays((prev) => ({ ...prev, [day]: !prev[day] }));
  };

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
            <div style={styles.roller}></div>
            <div style={styles.roller}></div>
            <div style={styles.roller}></div>
            <div style={styles.roller}></div>
            <div style={styles.roller}></div>
            <div style={styles.rollerActive}></div>
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
                labelId="gender-label"
                id="gender"
                label="性別"
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
                <MenuItem value="home">全日</MenuItem>
              </Select>
            </FormControl>
            <div style={styles.hopeLayout}>
              <div style={styles.componentLayout}>
                <span>星期一</span>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <IOSSwitch
                        sx={{ m: 1 }}
                        checked={selectedDays.monday}
                        onChange={() => handleDayChange("monday")}
                      />
                    }
                    style={{ marginRight: "0px" }}
                  />
                </FormGroup>
              </div>
              <div style={styles.componentLayout}>
                <span>星期二</span>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <IOSSwitch
                        sx={{ m: 1 }}
                        checked={selectedDays.tuesday}
                        onChange={() => handleDayChange("tuesday")}
                      />
                    }
                    style={{ marginRight: "0px" }}
                  />
                </FormGroup>
              </div>
              <div style={styles.componentLayout}>
                <span>星期三</span>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <IOSSwitch
                        sx={{ m: 1 }}
                        checked={selectedDays.wednesday}
                        onChange={() => handleDayChange("wednesday")}
                      />
                    }
                    style={{ marginRight: "0px" }}
                  />
                </FormGroup>
              </div>
              <div style={styles.componentLayout}>
                <span>星期四</span>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <IOSSwitch
                        sx={{ m: 1 }}
                        checked={selectedDays.thursday}
                        onChange={() => handleDayChange("thursday")}
                      />
                    }
                    style={{ marginRight: "0px" }}
                  />
                </FormGroup>
              </div>
              <div style={styles.componentLayout}>
                <span>星期五</span>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <IOSSwitch
                        sx={{ m: 1 }}
                        checked={selectedDays.friday}
                        onChange={() => handleDayChange("friday")}
                      />
                    }
                    style={{ marginRight: "0px" }}
                  />
                </FormGroup>
              </div>
              <div style={{ ...styles.componentLayout, borderBottom: "none" }}>
                <span>星期六</span>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <IOSSwitch
                        sx={{ m: 1 }}
                        checked={selectedDays.saturday}
                        onChange={() => handleDayChange("saturday")}
                      />
                    }
                    style={{ marginRight: "0px" }}
                  />
                </FormGroup>
              </div>
              <div style={{ ...styles.componentLayout, borderBottom: "none" }}>
                <span>星期日</span>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <IOSSwitch
                        sx={{ m: 1 }}
                        checked={selectedDays.sunday}
                        onChange={() => handleDayChange("sunday")}
                      />
                    }
                    style={{ marginRight: "0px" }}
                  />
                </FormGroup>
              </div>
            </div>
            <div style={{ width: "100%" }}>
              <CalendarWeekendPicker
                selectedWeekday={selectedDays}
                handleDayChange={handleDayChange}
                locale="zh-TW"
                styles={{
                  calendar: { maxWidth: "400px" },
                  day: { width: "50px", height: "50px" },
                }}
              />
            </div>
            <FormControl>
              <InputLabel id="gender-label">選擇情境</InputLabel>
              <Select
                required
                labelId="gender-label"
                id="gender"
                label="性別"
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
                <MenuItem value="home">居家托育</MenuItem>
              </Select>
            </FormControl>
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
  inputField: {
    padding: "16.5px 14px",
    borderRadius: "8px",
    border: "1px solid #E3838E",
    background: "var(---SurfaceContainer-Lowest, #FFF)",
    color: "gray",
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
