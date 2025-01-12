import React from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import { MenuItem, InputLabel,FormControl } from '@mui/material';
import { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { setMemberId } from '../../features/member/memberSlice';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
const ApplicationPage = () => {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [fileBack, setFileBack] = useState(null);
  const [message, setMessage] = useState('');
  const [frontImg, setFrontImg] = useState(null);
  const [backImg, setBackImg] = useState(null);
  const [headIcon, setHeadIcon] = useState(null);
  const [gender, setGender] = useState('');
  const [selectedDate, setSelectedDate] = useState();
  const memberId = useSelector((state) => state.member.memberId);

  const handleNextClick = async () => {
    const kycInfoData = {
      name: document.getElementById('name').value,
      identityCard: document.getElementById('identityCard').value,
      gender: gender,
      birthday: selectedDate,
      address: document.getElementById('address').value,
      communicateAddress: document.getElementById('communicateAddress').value,
      welfareCertNo: null,
      identityFrontUploadId: frontImg,
      identityBackUploadId: backImg,
      iconUploadId: null,
      status: '通過'
    };
    try {
      const response = await fetch('/api/kycInfo/createKycInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(kycInfoData)
      });
      const kycData = await response.json();
      const kycId = kycData.member.id; // 獲取返回的 kycId
      const kycInfoUpdateData = {
        kycId: kycId,
        memberId: memberId
      };
      const response2 = await fetch('/api/member/updateKycId', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(kycInfoUpdateData)
      });
      router.push('/parent/create/choose');
    } catch (error) {
      console.error('Error creating member:', error);
    }
  };

  const [fileName, setFileName] = useState(''); // 新增狀態以存儲檔案名稱
  const [fileNameBack, setFileNameBack] = useState(''); // 新增狀態以存儲檔案名稱

  const handleLastClick = () => {
    router.push('/parent/verify/'); // 替换 '/next-page' 为你想要跳转的路径
  };

  const handleUpload = async (file, type) => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();
      const resUpload = await fetch('/api/kycInfo/uploadImg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fileUrl: result.fileUrl,
          type: type
        })
      });
      const uploadResponse = await resUpload.json();
      const uploadId = uploadResponse.uploadId.id;
      if(type === 'ID Front'){
        setFrontImg(uploadId);
      }else if(type === 'ID Back'){
        setBackImg(uploadId);
      }else if(type === 'Head Icon'){
        setHeadIcon(uploadId);
      }
    } catch (error) {
      console.error('Upload error:', error);
      setMessage('Upload failed.');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setFileName(file?.name || '');
    handleUpload(file, 'ID Front'); // 指定文件类型
  };

  const handleFileChangeBack = (e) => {
    const file = e.target.files[0];
    setFileBack(file);
    setFileNameBack(file?.name || '');
    handleUpload(file, 'ID Back'); // 指定文件类型
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleClearFront = () => {
    setFile(null);
    setFileName('');
    setFrontImg(null);
    // 清空 file input
    const fileInput = document.getElementById('file-upload');
    if (fileInput) fileInput.value = '';
  };

  const handleClearBack = () => {
    setFileBack(null);
    setFileNameBack('');
    setBackImg(null);
    // 清空 file input
    const fileInput = document.getElementById('file-backend');
    if (fileInput) fileInput.value = '';
  };

  return (
    <div style={styles.main}>  
        <div style={styles.header}> 
            <span style={styles.headerFont}>
              申請成為家長
            </span>
            <button onClick={handleLastClick} style={styles.lastButton}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <g clip-path="url(#clip0_45_10396)">
                  <path d="M7.77223 12.9916L18.7822 12.9916C19.3322 12.9916 19.7822 12.5416 19.7822 11.9916C19.7822 11.4416 19.3322 10.9916 18.7822 10.9916L7.77223 10.9916L7.77223 9.20162C7.77223 8.75162 7.23223 8.53162 6.92223 8.85162L4.14223 11.6416C3.95223 11.8416 3.95223 12.1516 4.14223 12.3516L6.92223 15.1416C7.23223 15.4616 7.77223 15.2316 7.77223 14.7916L7.77223 12.9916V12.9916Z" fill="#074C5F"/>
                </g>
                <defs>
                  <clipPath id="clip0_45_10396">
                    <rect width="24" height="24" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </button>
        </div>
        <div style={{ backgroundColor: 'white', width: '100%',display: 'flex',justifyContent:'center', alignItems: 'center' }}>
          <div style={styles.contentLayout}>
              <div style={styles.rollerLayout}>
                <div style={styles.roller}></div>
                <div style={styles.roller}></div>
                <div style={styles.rollerActive}></div>
                <div style={styles.roller}></div>
                <div style={styles.roller}></div>
              </div>
              <span style={styles.subTitle}>身分驗證</span>
              <Box
                  component="form"
                  sx={{
                    display: 'flex',
                    width: '320px',
                    padding: '18.5px 18px 19.5px 17px',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '20px'
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="name"
                    label="真實姓名"
                    variant="outlined"
                    InputProps={{
                      sx: {
                        padding: '0px 16px',
                        borderRadius: '8px',
                        backgroundColor: 'var(--SurfaceContainer-Lowest, #FFF)'
                      },
                    }}
                    sx={{
                      alignSelf: 'stretch',
                      borderRadius: '8px',
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'var(--OutLine-OutLine, #78726D)',
                        },
                        '&:hover fieldset': {
                          borderColor: '#E3838E',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#E3838E',
                        },
                      },
                    }}
                  />

                  <TextField
                    id="identityCard"
                    label="身分證字號"
                    variant="outlined"
                    InputProps={{
                      sx: {
                        padding: '0px 16px',
                        borderRadius: '8px',
                        backgroundColor: 'var(--SurfaceContainer-Lowest, #FFF)'
                      },
                    }}
                    sx={{
                      alignSelf: 'stretch',
                      borderRadius: '8px',
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'var(--OutLine-OutLine, #78726D)',
                        },
                        '&:hover fieldset': {
                          borderColor: '#E3838E',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#E3838E',
                        },
                      },
                    }}
                  />

                  <FormControl fullWidth sx={{ alignSelf: 'stretch' }}>
                    <InputLabel id="gender-label">性別</InputLabel>
                    <Select
                      labelId="gender-label"
                      id="gender"
                      value={gender}
                      onChange={handleGenderChange}
                      label="性別"
                      sx={{
                        backgroundColor:'#FFF',
                        borderRadius: '8px',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'var(--OutLine-OutLine, #78726D)',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#E3838E',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#E3838E',
                        },
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
                    onChange={(newValue) => setSelectedDate(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                    disableFuture
                    shouldDisableDate={(date) => date.day() === 0 || date.day() === 6} // 禁用週末
                    InputProps={{
                      sx: {
                        padding: '0px 16px',
                        borderRadius: '8px',
                        backgroundColor: 'var(--SurfaceContainer-Lowest, #FFF)'
                      },
                    }}
                    sx={{
                      alignSelf: 'stretch',
                      borderRadius: '8px',
                      '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                              borderColor: 'var(--OutLine-OutLine, #78726D)',
                          },
                          '&:hover fieldset': {
                              borderColor: '#E3838E',
                          },
                          '&.Mui-focused fieldset': {
                              borderColor: '#E3838E',
                          },
                      },
                      backgroundColor: 'var(--SurfaceContainer-Lowest, #FFF)',
                    }}
                  />
                </LocalizationProvider>
                  <TextField
                    id="address"
                    label="戶籍地址"
                    variant="outlined"
                    InputProps={{
                      sx: {
                        padding: '0px 16px',
                        borderRadius: '8px',
                        backgroundColor: 'var(--SurfaceContainer-Lowest, #FFF)'
                      },
                    }}
                    sx={{
                      alignSelf: 'stretch',
                      borderRadius: '8px',
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'var(--OutLine-OutLine, #78726D)',
                        },
                        '&:hover fieldset': {
                          borderColor: '#E3838E',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#E3838E',
                        },
                      },
                    }}
                  />
                  <TextField
                    id="communicateAddress"
                    label="通訊地址"
                    variant="outlined"
                    InputProps={{
                      sx: {
                        padding: '0px 16px',
                        borderRadius: '8px',
                        backgroundColor: 'var(--SurfaceContainer-Lowest, #FFF)'
                      },
                    }}
                    sx={{
                      alignSelf: 'stretch',
                      borderRadius: '8px',
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'var(--OutLine-OutLine, #78726D)',
                        },
                        '&:hover fieldset': {
                          borderColor: '#E3838E',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#E3838E',
                        },
                      },
                    }}
                  />
                </Box>
              <div style={styles.imgStyle}>
                <div style={styles.uplaodLayout}>
                  <span style={styles.mainCode}>上傳身分證正反面</span>
                  <span style={styles.subCode}>僅供通托育平台身分驗證使用，請提供清晰正見正反照。</span>
                </div>
                <div style={styles.uploadimgLayout}>
                    <span style={styles.mainCode}>證件照正面</span>
                    <input type="file" onChange={handleFileChange} style={{ display: 'none' }} id="file-upload" />
                    <div style={styles.imgLayout} onClick={() => document.getElementById('file-upload').click()}>
                      <img src="/ID-f.png" alt="Description of image F" style={styles.imgSize}/>
                    </div>
                    {fileName && <span>{fileName}</span>} {/* 顯示檔案名稱 */}
                    <div style={styles.imgBtnLayout}>
                      <button style={styles.uploadBtn} onClick={() => document.getElementById('file-upload').click()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                          <g clip-path="url(#clip0_52_6150)">
                            <path d="M12.9 6.71708C12.4467 4.41708 10.4267 2.69041 8 2.69041C6.07333 2.69041 4.4 3.78374 3.56667 5.38374C1.56 5.59708 0 7.29708 0 9.35708C0 11.5637 1.79333 13.3571 4 13.3571H12.6667C14.5067 13.3571 16 11.8637 16 10.0237C16 8.26374 14.6333 6.83708 12.9 6.71708ZM9.33333 8.69041V11.3571H6.66667V8.69041H4.66667L7.76667 5.59041C7.9 5.45708 8.10667 5.45708 8.24 5.59041L11.3333 8.69041H9.33333Z" fill="white"/>
                          </g>
                          <defs>
                            <clipPath id="clip0_52_6150">
                              <rect width="16" height="16" fill="white" transform="translate(0 0.0237427)"/>
                            </clipPath>
                          </defs>
                        </svg>
                        上傳照片
                      </button>
                      <button style={styles.redoBtn} onClick={handleClearFront}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="17" viewBox="0 0 14 17" fill="none">
                          <path d="M9.42756 0.0237427H4.57245C2.06179 0.0237427 0 2.09532 0 4.65538V8.69754C0 9.06807 0.299228 9.37117 0.665024 9.37117C1.03082 9.37117 1.33005 9.06807 1.33005 8.69754L1.33016 4.65538C1.33016 2.85319 2.77669 1.38797 4.55582 1.38797H9.3943C11.2066 1.38797 12.6532 2.85322 12.6532 4.65538V8.19227C12.6532 9.99446 11.2067 11.4597 9.42755 11.4597L3.42518 11.4596L5.43711 9.42158C5.70317 9.15208 5.70317 8.73102 5.43711 8.46151C5.17105 8.19201 4.75537 8.19201 4.48931 8.46151L1.33016 11.6616C1.0641 11.9311 1.0641 12.3521 1.33016 12.6216L4.48931 15.8217C4.62234 15.9564 4.78854 16.0237 4.97144 16.0237C5.13775 16.0237 5.32066 15.9564 5.45356 15.8217C5.71962 15.5522 5.71962 15.1311 5.45356 14.8616L3.42518 12.824H9.42755C11.9549 12.824 14 10.7524 14 8.19234V4.65545C14 2.09538 11.9382 0.0238056 9.42755 0.0238056L9.42756 0.0237427Z" fill="#CCCCCC"/>
                          <path d="M9.42756 0.0237427H4.57245C2.06179 0.0237427 0 2.09532 0 4.65538V8.69754C0 9.06807 0.299228 9.37117 0.665024 9.37117C1.03082 9.37117 1.33005 9.06807 1.33005 8.69754L1.33016 4.65538C1.33016 2.85319 2.77669 1.38797 4.55582 1.38797H9.3943C11.2066 1.38797 12.6532 2.85322 12.6532 4.65538V8.19227C12.6532 9.99446 11.2067 11.4597 9.42755 11.4597L3.42518 11.4596L5.43711 9.42158C5.70317 9.15208 5.70317 8.73102 5.43711 8.46151C5.17105 8.19201 4.75537 8.19201 4.48931 8.46151L1.33016 11.6616C1.0641 11.9311 1.0641 12.3521 1.33016 12.6216L4.48931 15.8217C4.62234 15.9564 4.78854 16.0237 4.97144 16.0237C5.13775 16.0237 5.32066 15.9564 5.45356 15.8217C5.71962 15.5522 5.71962 15.1311 5.45356 14.8616L3.42518 12.824H9.42755C11.9549 12.824 14 10.7524 14 8.19234V4.65545C14 2.09538 11.9382 0.0238056 9.42755 0.0238056L9.42756 0.0237427Z" stroke="#CCCCCC"/>
                        </svg>
                      </button>
                    </div>
                    <span style={styles.mainCode}>證件照反面</span>
                    <input type="file" onChange={handleFileChangeBack} style={{ display: 'none' }} id="file-backend" />
                    <div style={styles.imgLayout} onClick={() => document.getElementById('file-backend').click()}>
                      <img src="/ID-B.png" alt="身分證反面圖片" style={styles.imgSize}/>
                    </div>
                    {fileNameBack && <span>{fileNameBack}</span>} {/* 顯示檔案名稱 */}
                    <div style={styles.imgBtnLayout}>
                      <button style={styles.uploadBtn} onClick={() => document.getElementById('file-backend').click()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                          <g clip-path="url(#clip0_52_6150)">
                            <path d="M12.9 6.71708C12.4467 4.41708 10.4267 2.69041 8 2.69041C6.07333 2.69041 4.4 3.78374 3.56667 5.38374C1.56 5.59708 0 7.29708 0 9.35708C0 11.5637 1.79333 13.3571 4 13.3571H12.6667C14.5067 13.3571 16 11.8637 16 10.0237C16 8.26374 14.6333 6.83708 12.9 6.71708ZM9.33333 8.69041V11.3571H6.66667V8.69041H4.66667L7.76667 5.59041C7.9 5.45708 8.10667 5.45708 8.24 5.59041L11.3333 8.69041H9.33333Z" fill="white"/>
                          </g>
                          <defs>
                            <clipPath id="clip0_52_6150">
                              <rect width="16" height="16" fill="white" transform="translate(0 0.0237427)"/>
                            </clipPath>
                          </defs>
                        </svg>
                        上傳照片
                      </button>
                      <button style={styles.redoBtn} onClick={handleClearBack}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="17" viewBox="0 0 14 17" fill="none">
                          <path d="M9.42756 0.0237427H4.57245C2.06179 0.0237427 0 2.09532 0 4.65538V8.69754C0 9.06807 0.299228 9.37117 0.665024 9.37117C1.03082 9.37117 1.33005 9.06807 1.33005 8.69754L1.33016 4.65538C1.33016 2.85319 2.77669 1.38797 4.55582 1.38797H9.3943C11.2066 1.38797 12.6532 2.85322 12.6532 4.65538V8.19227C12.6532 9.99446 11.2067 11.4597 9.42755 11.4597L3.42518 11.4596L5.43711 9.42158C5.70317 9.15208 5.70317 8.73102 5.43711 8.46151C5.17105 8.19201 4.75537 8.19201 4.48931 8.46151L1.33016 11.6616C1.0641 11.9311 1.0641 12.3521 1.33016 12.6216L4.48931 15.8217C4.62234 15.9564 4.78854 16.0237 4.97144 16.0237C5.13775 16.0237 5.32066 15.9564 5.45356 15.8217C5.71962 15.5522 5.71962 15.1311 5.45356 14.8616L3.42518 12.824H9.42755C11.9549 12.824 14 10.7524 14 8.19234V4.65545C14 2.09538 11.9382 0.0238056 9.42755 0.0238056L9.42756 0.0237427Z" stroke="#CCCCCC"/>
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
    display: 'flex',
    width: '320px',
    padding: '15px',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px'
  },
  imgSize: {
    maxWidth:'300px',
  },
  uploadBtn: {
    display: 'flex',
    padding: '8px 12px',
    alignItems: 'center',
    gap: '8px',
    borderRadius: '6px',
    background: 'var(---Primary-Primary, #E3838E)',
    border:'none',
    color:'#FFF',
    height: '36px'
  },
  redoBtn:{
    display: 'flex',
    padding: '8px 12px',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    borderRadius: '6px',
    background: 'var(---SurfaceContainer-Lowest, #FFF)',
    border:'none'
  },
  imgBtnLayout:{
    display:'flex',
    gap:'12px',
    alignItems:'flex-start',
    width:'100%'
  },
  uploadIconLayout:{
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    gap:'20px',
    width:'100%'
  },
  uploadimgLayout:{
    display:'flex',
    flexDirection:'column',
    alignItems:'flex-start',
    justifyContent:'center',
    padding:'20px',
    gap:'20px'
  },
  headIconLayout: {
    maxHeight: '120px',
    alignSelf: 'stretch',
    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
    backgroundColor:'#FFF',
    maxWidth:'90px'
  },
  imgLayout: {
    maxHeight: '180px',
    alignSelf: 'stretch',
    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
    backgroundColor:'#FFF',
  },
  mainCode : {
    color: 'var(---Surface-Black-25, #252525)',
    fontFamily: "LINE Seed JP_TTF",
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 'normal'
  },
  subCode : {
    color: 'var(---Surface-Black-25, #252525)',
    fontFamily: "LINE Seed JP_TTF",
    fontSize: '12px',
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 'normal',
    gap:'12px'
  },
  uplaodLayout: {
    display:'flex',
    flexDirection:'column',
    width:'100%',
    justifyContent:'flex-start'
  },
  buttonLayout: {
    display:'flex',
    flexDirection:'column',
    gap:'10px',
    marginTop:'35px'
  },
  inputField: {
    display: 'flex',
    padding: '0px 16px',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '12px',
    alignSelf: 'stretch',
    borderRadius: '8px',
    border: '1px solid var(---OutLine-OutLine, #78726D)',
    background: 'var(---SurfaceContainer-Lowest, #FFF)'
  },
  lastButton: {
    border:'none',
    backgroundColor:'#FFF'
  },
  subTitleLayout:{
    width:'100%',
    display:'flex',
    justifyContent:'flex-start',
    backgroundColor: '#FBDBD6',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh', // 占满整个视口高度
    backgroundColor: '#f8ecec',
    marginBottom:'28px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: '600px',
    // marginBottom: '20px',
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '0px 0px 40px 0px', // 左上、右上、右下、左下的圓角
  },
  headerFont: {
    fontSize: '24px',
    fontWeight: 'bold',
    color:'#E3838E',
  },
  contentLayout: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '600px',
    backgroundColor: '#f8ecec',
    paddingLeft:'35px',
    paddingRight:'35px',
    paddingTop: '20px',
    borderRadius: '40px 0px 0px 0px', // 左上、右上、右下、左下的圓角
  },
  rollerLayout: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '10px',
  },
  roller: {
    width: '42px',
    height: '6px',
    borderRadius: '2px',
    backgroundColor: '#FFF',
    margin: '0 5px',
  },
  rollerActive: {
    width: '42px',
    height: '6px',
    borderRadius: '2px',
    backgroundColor: 'var(---Primary-Primary, #E3838E)',
    margin: '0 5px',
  },
  subTitle: {
    fontSize: '18px',
    marginBottom: '10px',
    color:'#E3838E'
  },
  lawLayout: {
    display: 'flex',
    width: '320px',
    padding: '18.5px 18px 19.5px 17px',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '20px',
    border: '2px solid var(---Button-01, #FBDBD6)',
    gap:'20px'
  },
  nextBtn: {
    padding: '10px 20px',
    backgroundColor: 'var(---Primary-Primary, #E3838E)',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop:'20px',
    marginBottom:'20px'
  },
};

export default ApplicationPage;
