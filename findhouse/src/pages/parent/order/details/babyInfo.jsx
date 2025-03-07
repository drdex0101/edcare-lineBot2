import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { MenuItem, InputLabel, FormControl } from "@mui/material";
import useStore from "../../../../lib/store";

const ApplicationPage = () => {
  const router = useRouter();
  const item = useStore((state) => state.item);
  const [selectedDate, setSelectedDate] = useState(
    item?.birthday ? dayjs(item.birthday) : dayjs(),
  );
  const [switchStates, setSwitchStates] = useState({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
  });

  // **當 `item` 變更時，更新 `switchStates`**
  useEffect(() => {
    if (item?.hope) {
      setSwitchStates({
        1: item.hope.includes(1),
        2: item.hope.includes(2),
        3: item.hope.includes(3),
        4: item.hope.includes(4),
        5: item.hope.includes(5),
        6: item.hope.includes(6),
      });
    }
  }, [item]); // **確保 `item` 更新後會同步 `switchStates`**

  const [babyName, setBabyName] = useState(item ? item.nickname : "");
  const [babyGender, setBabyGender] = useState(item ? item.gender : "");

  const [babyBirthOrder, setBabyBirthOrder] = useState(item ? item.rank : "");
  const [babyHope, setBabyHope] = useState(item ? item.intro : "");

  const handleNextClick = () => {
    updateBabyRecord();
  };

  const handleLastClick = () => {
    router.back();
  };

  const updateBabyRecord = async () => {
    const response = await fetch("/api/order/updateOrderData", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId: item.id,
        nannyid: null,
        status: "create",
        choosetype: item.choosetype,
        orderstatus: "on",
        caretypeid: item.caretypeid,
        nickname: babyName,
        gender: babyGender,
        birthday: selectedDate,
        rank: babyBirthOrder,
        hope: Object.keys(switchStates).filter((key) => switchStates[key]),
        intro: babyHope,
        isshow: true,
        created_by: localStorage.getItem("account"),
      }),
    });
    const result = await response.json();
    console.log(result);
    if (result.success) {
      router.push("/parent/search");
    } else {
      alert("更新失敗");
    }
  };

  const handleSwitchChange = (index, checked) => {
    setSwitchStates((prev) => ({
      ...prev,
      [index]: checked,
    }));
  };

  const handleDateChange = (newValue) => {
    if (newValue) {
      const today = new Date();
      const birthDate = new Date(newValue);
      const age = today.getFullYear() - birthDate.getFullYear();

      if (age >= 12) {
        alert("孩童年齡不能超過12歲");
        return;
      }
    }
    setSelectedDate(newValue);
  };

  useEffect(() => {
    // 初始化 state，對應的數字開啟
    const initialStates = {};
    for (let i = 1; i <= 6; i++) {
      initialStates[i] = item ? item.hope.includes(i.toString()) : false;
    }
    console.log(initialStates);
    setSwitchStates(initialStates);
  }, []);

  const getLabel = (num) => {
    const labels = {
      1: "可接送小朋友",
      2: "寶寶衣物清洗",
      3: "製作副食品",
      4: "可遠端查看育兒情形",
      5: "可配合不使用3C育兒",
      6: "可配合家長外出",
    };
    return labels[num];
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
            <div style={styles.rollerActive}></div>
            <div style={styles.rollerActive}></div>
            <div style={styles.rollerActive}></div>
          </div>
          <div style={styles.titleLayout}>
            <span style={styles.subTitle}>托育資料填寫</span>
            <span style={styles.smallTitle}>托育基本資料</span>
          </div>
          <div style={styles.buttonLayout}>
            <TextField
              required
              id="name"
              label="孩童暱稱"
              variant="outlined"
              value={babyName}
              onChange={(e) => setBabyName(e.target.value)}
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
              }}
            />
            <FormControl>
              <InputLabel id="gender-label">性別</InputLabel>
              <Select
                required
                labelId="gender-label"
                id="gender"
                label="性別"
                value={babyGender}
                onChange={(e) => setBabyGender(e.target.value)}
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
                <MenuItem value="male">男</MenuItem>
                <MenuItem value="female">女</MenuItem>
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="生日"
                value={selectedDate}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
                disableFuture
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
              />
            </LocalizationProvider>
            <FormControl>
              <InputLabel id="gender-label">胎別</InputLabel>
              <Select
                required
                labelId="gender-label"
                id="gender"
                label="胎別"
                value={babyBirthOrder}
                onChange={(e) => setBabyBirthOrder(e.target.value)}
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
                <MenuItem value="1">第一胎</MenuItem>
                <MenuItem value="2">第二胎</MenuItem>
                <MenuItem value="3">第三胎</MenuItem>
                <MenuItem value="4">第四胎</MenuItem>
                <MenuItem value="5">第五胎</MenuItem>
              </Select>
            </FormControl>

            <div style={styles.hopeLayout}>
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div key={num} style={styles.componentLayout}>
                  <span>{getLabel(num)}</span>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <IOSSwitch
                          sx={{ m: 1 }}
                          checked={!!switchStates[num]} // ✅ 確保 `checked` 不為 `undefined`
                          onChange={(e) =>
                            handleSwitchChange(num, e.target.checked)
                          }
                        />
                      }
                      style={{ marginRight: "0px" }}
                    />
                  </FormGroup>
                </div>
              ))}
            </div>

            <TextField
              required
              id="phone-number"
              variant="outlined"
              label="托育理念"
              multiline
              value={babyHope}
              onChange={(e) => setBabyHope(e.target.value)}
              rows={4}
              maxRows={4}
              InputProps={{
                sx: {
                  padding: "16px 16px",
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
              }}
            />
          </div>
          <div style={styles.buttonLayout}>
            <button style={styles.nextBtn} onClick={handleNextClick}>
              確認送出
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
