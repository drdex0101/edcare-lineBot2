import { useEffect , React} from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { setMemberId } from "../../features/member/memberSlice";
import axios from "axios";
import Loading from "../../components/base/Loading";
import { useState } from "react";
import useStore from "../../lib/store";
import Cookies from 'js-cookie';

const ApplicationPage = () => {
  const router = useRouter();
  const dispatch = useDispatch(); // Redux 的 dispatch 函数
  const [isLoading, setIsLoading] = useState(false);
  const { memberInfo, setMemberInfo } = useStore();
  const accountName = decodeURIComponent(Cookies.get('displayName'));


  useEffect(() => {
    const fetchMemberInfo = async () => {
      setIsLoading(true);
      const response = await axios.get("/api/member/getMemberData");
      setMemberInfo(response.data.member[0]);
      console.log(memberInfo);
      setIsLoading(false);
    };
    fetchMemberInfo();
  }, []);

  const handleNextClick = async () => {
    const memberData = {
      memberId: memberInfo.id,
      accountName: accountName,
      phoneNumber: document.getElementById("cellphone").value,
      email: document.getElementById("email").value,
      job: document.getElementById("job").value,
    };
    setMemberInfo(memberData);
    const account = document.getElementById("account").value;
    const phoneNumber = document.getElementById("cellphone").value;
    const email = document.getElementById("email").value;

    if (!account || !phoneNumber || !email || !job) {
      alert("請填寫所有必填欄位。");
      return; // 終止函數執行
    }

    // 驗證手機號碼格式（假設為台灣的手機號碼格式）
    const phonePattern = /^09\d{8}$/;
    if (!phonePattern.test(memberData.phoneNumber)) {
      console.error("Invalid phone number format:", memberData.phoneNumber);
      alert("請輸入有效的手機號碼（例如：0912345678）。");
      return; // 終止函數執行
    }

    // 驗證電子郵件格式
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(memberData.email)) {
      console.error("Invalid email format:", memberData.email);
      alert("請輸入有效的電子郵件地址。");
      return; // 終止函數執行
    }
    
    try {
      setIsLoading(true);
      if (memberInfo.id) {
        const response = await fetch("/api/member/createMember", {
          method: "POST",
          body: JSON.stringify(memberData),
        });
      }
      else {
        const response = await fetch("/api/member/updateMember", {
          method: "PATCH",
          body: JSON.stringify(memberData),
        });
      }
      const memberId = response.data.member.id; // 獲取返回的 memberId
      setMemberId(memberId); // 保存到 Redux Store
      router.push("/parent/verify");
    } catch (error) {
      setIsLoading(false);
      alert("申請失敗，請重新嘗試。");
      console.error("Error creating member:", error);
    }
  };

  const handleLastClick = () => {
    router.back(); // 替换 '/next-page' 为你想要跳转的路径
  };

  return (
    <div style={styles.main}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div style={styles.header}>
            <span style={styles.headerFont}>申請成為家長</span>
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
                <div style={styles.rollerActive}></div>
                <div style={styles.roller}></div>
                <div style={styles.roller}></div>
                <div style={styles.roller}></div>
              </div>
              <div style={styles.subTitleLayout}>
                <span style={styles.subTitle}>會員資料填寫</span>
              </div>
              <Box
                component="form"
                sx={{
                  display: "flex",
                  width: "320px",
                  padding: "18.5px 18px 19.5px 17px",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "20px",
                  gap: "20px",
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="account"
                  label="帳號名稱"
                  variant="outlined"
                  disabled
                  InputProps={{
                    sx: {
                      padding: "0px 16px",
                      borderRadius: "8px",
                      backgroundColor: "var(--SurfaceContainer-Lowest, #FFF)",
                    },
                  }}
                  value={accountName}
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

                <TextField
                  id="cellphone"
                  label="常用電話"
                  variant="outlined"
                  InputProps={{
                    sx: {
                      padding: "0px 16px",
                      borderRadius: "8px",
                      backgroundColor: "var(--SurfaceContainer-Lowest, #FFF)",
                    },
                  }}
                  value={memberInfo?.cellphone}
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

                <TextField
                  id="job"
                  label="職業"
                  variant="outlined"
                  value={memberInfo?.job}
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

                <TextField
                  id="email"
                  label="聯絡信箱"
                  variant="outlined"
                  value={memberInfo?.email}
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
              </Box>

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
        </>
      )}
    </div>
  );
};

const styles = {
  buttonLayout: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    gap: "24px",
    width: "100%",
    marginBottom: "28px",
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
  buttonLayout: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  imgLayout: {
    height: "180px",
    alignSelf: "stretch",
    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
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
    width: "320px",
    padding: "18.5px 18px 19.5px 17px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "20px",
    border: "2px solid var(---Button-01, #FBDBD6)",
    gap: "20px",
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
