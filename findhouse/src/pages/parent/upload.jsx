import React from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import { MenuItem, InputLabel, FormControl } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Loading from "../../components/base/Loading";
import useStore from "../../lib/store";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import "dayjs/locale/zh-tw"; // or 'zh-cn' 根據你想要用的語系

dayjs.locale("zh-tw"); // 設定為繁體中文

const ApplicationPage = () => {
  const router = useRouter();
  const [fileFront, setFileFront] = useState(null);
  const [fileBack, setFileBack] = useState(null);
  const [message, setMessage] = useState("");
  const [frontImg, setFrontImg] = useState(null);
  const [backImg, setBackImg] = useState(null);
  const [headIcon, setHeadIcon] = useState(null);
  const [gender, setGender] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const memberId = useSelector((state) => state.member.memberId);
  const [isLoading, setIsLoading] = useState(false);
  const { kycData, setKycData } = useStore();

  // 计算最大可选日期，即当前日期减去12年
  const maxSelectableDate = dayjs().subtract(12, "year");

  // 新增表單資料的 state
  const [formData, setFormData] = useState({
    name: "",
    identityCard: "",
    address: "",
    communicateAddress: "",
    welfareCertNo: "",
  });

  // 當 kycData 載入時更新表單資料
  useEffect(() => {
    if (kycData) {
      setFormData({
        name: kycData.name || "",
        identityCard: kycData.identitycard || "",
        address: kycData.address || "",
        communicateAddress: kycData.communicateaddress || "",
        welfareCertNo: kycData.welfarecertno || "",
      });
    }
  }, [kycData]);

  // 處理表單欄位變更
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleNextClick = async () => {
    setIsLoading(true);

    const requiredFields = {
      name: "真實姓名",
      identityCard: "身分證字號",
      gender: "性別",
      address: "戶籍地址",
      communicateAddress: "通訊地址",
      frontImg: "身分證正面照片",
      backImg: "身分證反面照片",
    };

    if (!selectedDate) {
      Swal.fire({
        icon: "warning",
        title: "請選擇生日！",
      });
      setIsLoading(false);
      return;
    }

    // 取得缺少的欄位
    const missingFields = Object.entries(requiredFields)
      .filter(([key]) => !formData[key] && !eval(key)) // 檢查 formData 和 state 變數
      .map(([_, label]) => label);

    if (missingFields.length > 0) {
      Swal.fire({
        icon: "warning",
        title: "請填寫所有必填欄位！",
        text: `以下欄位未填寫：\n${missingFields.join(", ")}`,
      });
      setIsLoading(false);
      return; // 停止提交
    }

    const kycInfoData = {
      name: formData.name,
      identityCard: formData.identityCard,
      gender: gender,
      birthday: selectedDate,
      address: formData.address,
      communicateAddress: formData.communicateAddress,
      welfareCertNo: formData.welfareCertNo,
      identityFrontUploadId: frontImg,
      identityBackUploadId: backImg,
      frontImg: frontImg,
      backImg: backImg,
      iconUploadId: null,
      status: "pending",
    };
    try {
      if (kycData != null) {
        try {
          setIsLoading(true);
          kycInfoData.id = kycData.id;
          const response = await fetch("/api/kycInfo/updateKycInfo", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(kycInfoData),
          });
          setKycData(response.member);
          router.push("/parent/create/choose");
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "更新失敗，請重新嘗試。",
          });
          console.error("Error updating kyc info:", error);
          setIsLoading(false);
          router.push("/parent/create/choose");
        }
      } else {
        const response = await fetch("/api/kycInfo/createKycInfo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(kycInfoData),
        });
        const kycData = await response.json();
        const kycId = kycData.member.id; // 獲取返回的 kycId
        const kycInfoUpdateData = {
          kycId: kycId,
          memberId: memberId,
        };
        setKycData(kycData.member);
        const response2 = await fetch("/api/member/updateKycId", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(kycInfoUpdateData),
        });
        await fetch("/api/line/changeRichMenu", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            richMenuId: "richmenu-bd0843b93a53c3df760bbd95c7871e23",
          }),
        });
        router.push("/parent/create/choose");
      }
    } catch (error) {
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "申請失敗，請重新嘗試。",
      });
      console.error("Error creating member:", error);
    }
  };

  const [fileName, setFileName] = useState(""); // 新增狀態以存儲檔案名稱
  const [fileNameBack, setFileNameBack] = useState(""); // 新增狀態以存儲檔案名稱

  const handleLastClick = () => {
    router.back(); // 替换 '/next-page' 为你想要跳转的路径
  };

  const fetchKycData = async () => {
    const response = await fetch("/api/kycInfo/getKycData", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setKycData(data.kycInfoList[0]);
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchKycData(); // Wait for KYC data to be fetched

      const parsedData = useStore.getState().kycData;
      console.log("parsedData", parsedData);

      if (parsedData) {
        try {
          if (parsedData) {
            const storedKycData = parsedData;
            setKycData(storedKycData);
            setSelectedDate(
              storedKycData.birthday ? dayjs(storedKycData.birthday) : null
            );
            setGender(storedKycData.gender || "");
            setFrontImg(storedKycData.identityfrontuploadid || null);
            setBackImg(storedKycData.identitybackuploadid || null);
          }
        } catch (error) {
          console.error("Error parsing stored data:", error);
        }
      }

      setIsLoading(false);
    };

    setIsLoading(true);
    loadData();
  }, []);

  const handleUpload = async (file, type) => {
    setIsLoading(true);
    const formData = new FormData();
    console.log("file:", file);
    if (type === "ID Front") {
      formData.append("file", file);
    } else if (type === "ID Back") {
      formData.append("file", file);
    }
    try {
      const res = await fetch("/api/kycInfo/uploadImg", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      console.log("Upload Response:", result);
      const uploadId = result.uploadId; // 确保 API 返回的是 id 而不是对象

      if (type === "ID Front") {
        setFrontImg(uploadId);
      } else if (type === "ID Back") {
        setBackImg(uploadId);
      } else if (type === "Head Icon") {
        setHeadIcon(uploadId);
      }

      if (result.success) {
        console.log("Uploaded Image URL:", result.url);
      } else {
        setIsLoading(false);
        Swal.fire({
          icon: "error",
          title: "上傳失敗，請重新嘗試。",
        });
        if (type === "ID Front") {
          setFileName("");
        } else if (type === "ID Back") {
          setFileNameBack("");
        }
        console.error("Upload Failed:", result.message);
      }
    } catch (error) {
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "上傳失敗，請重新嘗試。",
      });
      if (type === "ID Front") {
        setFrontImg(null);
      } else if (type === "ID Back") {
        setBackImg(null);
      }
      console.error("Upload Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileFront(file);
    setFileName(file?.name || "");
    handleUpload(file, "ID Front"); // 指定文件类型
  };

  const handleFileChangeBack = (e) => {
    const file = e.target.files[0];
    setFileBack(file);
    setFileNameBack(file?.name || "");
    handleUpload(file, "ID Back"); // 指定文件类型
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleClearFront = () => {
    setFileFront(null);
    setFileName("");
    setFrontImg(null);
    // 清空 file input
    const fileInput = document.getElementById("file-upload");
    if (fileInput) fileInput.value = "";
  };

  const handleClearBack = () => {
    setFileBack(null);
    setFileNameBack("");
    setBackImg(null);

    const fileInput = document.getElementById("file-backend");
    if (fileInput) fileInput.value = "";
  };

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
        }}
      >
        <div style={styles.contentLayout}>
          <div style={styles.rollerLayout}>
            <div style={styles.rollerActive}></div>
            <div style={styles.rollerActive}></div>
            <div style={styles.rollerActive}></div>
            <div style={styles.roller}></div>
            <div style={styles.roller}></div>
          </div>
          <span style={styles.subTitle}>身分驗證</span>
          <Box
            component="form"
            sx={{
              display: "flex",
              width: "320px",
              padding: "18.5px 18px 19.5px 17px",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="name"
              label="真實姓名"
              variant="outlined"
              required
              value={formData.name}
              onChange={handleInputChange}
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
              id="identityCard"
              label="身分證字號"
              required
              value={formData.identityCard}
              onChange={handleInputChange}
              variant="outlined"
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

            <FormControl required fullWidth sx={{ alignSelf: "stretch" }}>
              <InputLabel id="gender-label">性別</InputLabel>
              <Select
                labelId="gender-label"
                id="gender"
                value={gender}
                required
                onChange={handleGenderChange}
                label="性別"
                sx={{
                  backgroundColor: "#FFF",
                  borderRadius: "8px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--OutLine-OutLine, #78726D)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#E3838E",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#E3838E",
                  },
                }}
              >
                <MenuItem value="male">男</MenuItem>
                <MenuItem value="female">女</MenuItem>
              </Select>
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="生日*"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                maxDate={maxSelectableDate}
                renderInput={(params) => <TextField {...params} />}
                views={["year", "month", "day"]}
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
            <TextField
              id="address"
              label="戶籍地址"
              required
              value={formData.address}
              onChange={handleInputChange}
              variant="outlined"
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
              id="communicateAddress"
              label="通訊地址"
              required
              value={formData.communicateAddress}
              onChange={handleInputChange}
              variant="outlined"
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
          <div style={styles.imgStyle}>
            <div style={styles.uplaodLayout}>
              <span style={styles.mainCode}>上傳身分證正反面</span>
              <span style={styles.subCode}>
                僅供通托育平台身分驗證使用，請提供清晰正見正反照。
              </span>
            </div>
            <div style={styles.uploadimgLayout}>
              <span style={styles.mainCode}>證件照正面</span>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileChange}
                style={{ display: "none" }}
                id="file-upload"
              />
              <div
                style={styles.imgLayout}
                onClick={() => document.getElementById("file-upload").click()}
              >
                {kycData?.identityfrontuploadid || frontImg ? (
                  <img
                    src="/uploadSuccess.png"
                    alt="Description of image F"
                    style={styles.imgSize}
                  />
                ) : (
                  <img
                    src="/ID-f.png"
                    alt="Description of image F"
                    style={styles.imgSize}
                  />
                )}
              </div>
              <div style={styles.imgBtnLayout}>
                <button
                  style={styles.uploadBtn}
                  onClick={() => document.getElementById("file-upload").click()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_52_6150)">
                      <path
                        d="M12.9 6.71708C12.4467 4.41708 10.4267 2.69041 8 2.69041C6.07333 2.69041 4.4 3.78374 3.56667 5.38374C1.56 5.59708 0 7.29708 0 9.35708C0 11.5637 1.79333 13.3571 4 13.3571H12.6667C14.5067 13.3571 16 11.8637 16 10.0237C16 8.26374 14.6333 6.83708 12.9 6.71708ZM9.33333 8.69041V11.3571H6.66667V8.69041H4.66667L7.76667 5.59041C7.9 5.45708 8.10667 5.45708 8.24 5.59041L11.3333 8.69041H9.33333Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_52_6150">
                        <rect
                          width="16"
                          height="16"
                          fill="white"
                          transform="translate(0 0.0237427)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  上傳照片
                </button>
                <button style={styles.redoBtn} onClick={handleClearFront}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="17"
                    viewBox="0 0 14 17"
                    fill="none"
                  >
                    <path
                      d="M9.42756 0.0237427H4.57245C2.06179 0.0237427 0 2.09532 0 4.65538V8.69754C0 9.06807 0.299228 9.37117 0.665024 9.37117C1.03082 9.37117 1.33005 9.06807 1.33005 8.69754L1.33016 4.65538C1.33016 2.85319 2.77669 1.38797 4.55582 1.38797H9.3943C11.2066 1.38797 12.6532 2.85322 12.6532 4.65538V8.19227C12.6532 9.99446 11.2067 11.4597 9.42755 11.4597L3.42518 11.4596L5.43711 9.42158C5.70317 9.15208 5.70317 8.73102 5.43711 8.46151C5.17105 8.19201 4.75537 8.19201 4.48931 8.46151L1.33016 11.6616C1.0641 11.9311 1.0641 12.3521 1.33016 12.6216L4.48931 15.8217C4.62234 15.9564 4.78854 16.0237 4.97144 16.0237C5.13775 16.0237 5.32066 15.9564 5.45356 15.8217C5.71962 15.5522 5.71962 15.1311 5.45356 14.8616L3.42518 12.824H9.42755C11.9549 12.824 14 10.7524 14 8.19234V4.65545C14 2.09538 11.9382 0.0238056 9.42755 0.0238056L9.42756 0.0237427Z"
                      fill="#CCCCCC"
                    />
                    <path
                      d="M9.42756 0.0237427H4.57245C2.06179 0.0237427 0 2.09532 0 4.65538V8.69754C0 9.06807 0.299228 9.37117 0.665024 9.37117C1.03082 9.37117 1.33005 9.06807 1.33005 8.69754L1.33016 4.65538C1.33016 2.85319 2.77669 1.38797 4.55582 1.38797H9.3943C11.2066 1.38797 12.6532 2.85322 12.6532 4.65538V8.19227C12.6532 9.99446 11.2067 11.4597 9.42755 11.4597L3.42518 11.4596L5.43711 9.42158C5.70317 9.15208 5.70317 8.73102 5.43711 8.46151C5.17105 8.19201 4.75537 8.19201 4.48931 8.46151L1.33016 11.6616C1.0641 11.9311 1.0641 12.3521 1.33016 12.6216L4.48931 15.8217C4.62234 15.9564 4.78854 16.0237 4.97144 16.0237C5.13775 16.0237 5.32066 15.9564 5.45356 15.8217C5.71962 15.5522 5.71962 15.1311 5.45356 14.8616L3.42518 12.824H9.42755C11.9549 12.824 14 10.7524 14 8.19234V4.65545C14 2.09538 11.9382 0.0238056 9.42755 0.0238056L9.42756 0.0237427Z"
                      stroke="#CCCCCC"
                    />
                  </svg>
                </button>
              </div>
              <span style={styles.mainCode}>證件照反面</span>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileChangeBack}
                style={{ display: "none" }}
                id="file-backend"
              />
              <div
                style={styles.imgLayout}
                onClick={() => document.getElementById("file-backend").click()}
              >
                {kycData?.identitybackuploadid || backImg ? (
                  <img
                    src="/uploadSuccess.png"
                    alt="Description of image B"
                    style={styles.imgSize}
                  />
                ) : (
                  <img
                    src="/ID-B.png"
                    alt="Description of image B"
                    style={styles.imgSize}
                  />
                )}
              </div>
              <div style={styles.imgBtnLayout}>
                <button
                  style={styles.uploadBtn}
                  onClick={() =>
                    document.getElementById("file-backend").click()
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_52_6150)">
                      <path
                        d="M12.9 6.71708C12.4467 4.41708 10.4267 2.69041 8 2.69041C6.07333 2.69041 4.4 3.78374 3.56667 5.38374C1.56 5.59708 0 7.29708 0 9.35708C0 11.5637 1.79333 13.3571 4 13.3571H12.6667C14.5067 13.3571 16 11.8637 16 10.0237C16 8.26374 14.6333 6.83708 12.9 6.71708ZM9.33333 8.69041V11.3571H6.66667V8.69041H4.66667L7.76667 5.59041C7.9 5.45708 8.10667 5.45708 8.24 5.59041L11.3333 8.69041H9.33333Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_52_6150">
                        <rect
                          width="16"
                          height="16"
                          fill="white"
                          transform="translate(0 0.0237427)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  上傳照片
                </button>
                <button style={styles.redoBtn} onClick={handleClearBack}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="17"
                    viewBox="0 0 14 17"
                    fill="none"
                  >
                    <path
                      d="M9.42756 0.0237427H4.57245C2.06179 0.0237427 0 2.09532 0 4.65538V8.69754C0 9.06807 0.299228 9.37117 0.665024 9.37117C1.03082 9.37117 1.33005 9.06807 1.33005 8.69754L1.33016 4.65538C1.33016 2.85319 2.77669 1.38797 4.55582 1.38797H9.3943C11.2066 1.38797 12.6532 2.85322 12.6532 4.65538V8.19227C12.6532 9.99446 11.2067 11.4597 9.42755 11.4597L3.42518 11.4596L5.43711 9.42158C5.70317 9.15208 5.70317 8.73102 5.43711 8.46151C5.17105 8.19201 4.75537 8.19201 4.48931 8.46151L1.33016 11.6616C1.0641 11.9311 1.0641 12.3521 1.33016 12.6216L4.48931 15.8217C4.62234 15.9564 4.78854 16.0237 4.97144 16.0237C5.13775 16.0237 5.32066 15.9564 5.45356 15.8217C5.71962 15.5522 5.71962 15.1311 5.45356 14.8616L3.42518 12.824H9.42755C11.9549 12.824 14 10.7524 14 8.19234V4.65545C14 2.09538 11.9382 0.0238056 9.42755 0.0238056L9.42756 0.0237427Z"
                      stroke="#CCCCCC"
                    />
                  </svg>
                </button>
              </div>
            </div>
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
  imgStyle: {
    display: "flex",
    width: "320px",
    padding: "15px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
  },
  imgSize: {
    maxWidth: "300px",
  },
  uploadBtn: {
    display: "flex",
    padding: "8px 12px",
    alignItems: "center",
    gap: "8px",
    borderRadius: "6px",
    background: "var(---Primary-Primary, #E3838E)",
    border: "none",
    color: "#FFF",
    height: "36px",
  },
  redoBtn: {
    display: "flex",
    padding: "8px 12px",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    borderRadius: "6px",
    background: "var(---SurfaceContainer-Lowest, #FFF)",
    border: "none",
  },
  imgBtnLayout: {
    display: "flex",
    gap: "12px",
    alignItems: "flex-start",
    width: "100%",
  },
  uploadIconLayout: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
    width: "100%",
  },
  uploadimgLayout: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "20px",
    gap: "20px",
  },
  headIconLayout: {
    maxHeight: "120px",
    alignSelf: "stretch",
    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
    backgroundColor: "#FFF",
    maxWidth: "90px",
  },
  imgLayout: {
    maxHeight: "180px",
    alignSelf: "stretch",
    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
    backgroundColor: "#FFF",
  },
  mainCode: {
    color: "var(---Surface-Black-25, #252525)",
    fontFamily: "LINE Seed JP_TTF",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: "normal",
  },
  subCode: {
    color: "var(---Surface-Black-25, #252525)",
    fontFamily: "LINE Seed JP_TTF",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: "normal",
    gap: "12px",
  },
  uplaodLayout: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "flex-start",
  },
  buttonLayout: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "35px",
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
    marginBottom: "10px",
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
    marginTop: "20px",
    marginBottom: "20px",
  },
};

export default ApplicationPage;
