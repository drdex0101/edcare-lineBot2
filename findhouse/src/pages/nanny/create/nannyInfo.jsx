import React from 'react';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
const ApplicationPage = () => {
  const router = useRouter();

  const handleNextClick = async () => {
    const nannyData = {
      memberId: '',
      experienment: 0,
      age: 0,
      kidCount: 0,
      way: localStorage.getItem('way'),
      scenario: selectedCareType,
      environmentPic: [],
      serviceLocation: address,
      introduction: introduction,
      service: selectedOptions,
      score: '',
      isShow: true,
      location: address,
      kycId: 0,
      uploadId: headIcon
    };

    try {
      const response = await fetch('/api/nanny/createNanny', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nannyData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit nanny data');
      }
      const data = await response.json();
      if (localStorage.getItem('way') === 'suddenly') {
        await createSuddenlyRecord(data.nanny.id, selectedCareType, address);
      }
      else if (localStorage.getItem('way') === 'longTerm') {
        await createLongTermRecord(data.nanny.id);
      }
      router.push('/nanny/finish');
    } catch (error) {
      console.error('Error submitting nanny data:', error);
    }
  };

  const handleLastClick = () => {
    router.back(); // 替换 '/next-page' 为你想要跳转的路径
  };
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(''); // 新增狀態以存儲檔案名稱
  const [headIcon, setHeadIcon] = useState(null);
  const [message, setMessage] = useState('');
  const [uploadedImages, setUploadedImages] = useState([]); // State to track uploaded images
  const [selectedCareType, setSelectedCareType] = useState(null);
  const [address, setAddress] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [introduction, setIntroduction] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setFileName(file?.name || '');
    handleUpload(file, 'avator'); // 指定文件类型
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

        // Check if the response is OK
        if (!res.ok) {
            const errorText = await res.text(); // Get the full response text
            console.error(`HTTP error! status: ${res.status}, response: ${errorText}`);
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const result = await res.json();
        console.log(result);
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
        if (type === 'environment') {
          setUploadedImages(prevImages => [...prevImages, uploadId]);
        }
        else {
          setHeadIcon(uploadId);
        }
    } catch (error) {
        console.error('Upload error:', error);
        setMessage('Upload failed.');
    }
  };

  const handleEnvironmentImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (uploadedImages.length + files.length > 6) {
      alert('最多只能上傳6張照片');
      return;
    }

    files.forEach(file => {
      handleUpload(file, 'environment'); // Call handleUpload for each fil
    });
    console.log(uploadedImages);
  };

  const handleSwitchChange = (optionId, isChecked) => {
    setSelectedOptions(prevOptions => {
      if (isChecked) {
        return [...prevOptions, optionId];
      } else {
        return prevOptions.filter(id => id !== optionId);
      }
    });
  };

  const handleCareTypeChange = (e) => {
    setSelectedCareType(e.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const createLongTermRecord = async (nannyId) => {
    const weekdaysString = localStorage.getItem('longTermDays');
    const weekdaysArray = weekdaysString.split(',').map(Number); // 將字串轉換成數字數組

    const response = await fetch('/api/nanny/createLongTern', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nannyId: nannyId,
        weekdays: weekdaysArray, // 使用轉換後的數組
        scenario: localStorage.getItem('careScenario'),
        careTime: localStorage.getItem('longTermCareTime'),
        idType: 'nanny'
      })
    });

    if (!response.ok) {
      throw new Error('Failed to insert data into long_term table');
    }

    return response.json();
  }

  const createSuddenlyRecord = async (nannyId, selectedCareType, address) => {
    const response = await fetch('/api/nanny/createSuddenly', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nannyId: nannyId,
        startDate: localStorage.getItem('suddenlyStartDate'),
        endDate: localStorage.getItem('suddsuddenlyEndDate'),
        scenario: selectedCareType,
        location: address,
        careTime: '',
        idType: 'nanny'
      })
    });

    if (!response.ok) {
      throw new Error('Failed to insert data into suddenly table');
    }

    return response.json();
  };

  return (
    <div style={styles.main}>  
      <div style={styles.header}> 
        <span style={styles.headerFont}>
        編輯保母資料
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
      <div style={{ backgroundColor: 'white', width: '100%',display: 'flex',justifyContent:'center', alignItems: 'center',width: '100%'}}>
        <div style={styles.contentLayout}>
          <div style={styles.rollerLayout}>
            <div style={styles.rollerActive}></div>
            <div style={styles.rollerActive}></div>
            <div style={styles.rollerActive}></div>
          </div>
          <div style={styles.titleLayout}>
            <span style={styles.subTitle}>托育資料填寫</span>
          </div>

          <div style={styles.iconLayout}>
            <div style={styles.fontLayout}>
              <span style={styles.smallTitle}>上傳個人照</span>
              <span style={styles.noticeTitle}>僅提供家長能更快認識保母。</span>
            </div>
          </div>

          <div style={styles.uploadAvatorLayout}>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="file-input"
            />
            <label htmlFor="file-input" style={styles.avatorLayout}>
              <span>上傳照片</span>
            </label>
          </div>

          <div style={styles.checkBoxLayout}>
            <input
              type='radio'
              name='careType'
              value='在宅托育'
              checked={selectedCareType === '在宅托育'}
              onChange={handleCareTypeChange}
              style={{
                ...styles.radioButton,
                ...(selectedCareType === '在宅托育' && styles.radioButtonChecked),
              }}
            /> 在宅托育
            <input
              type='radio'
              name='careType'
              value='到宅托育'
              checked={selectedCareType === '到宅托育'}
              onChange={handleCareTypeChange}
              style={{
                ...styles.radioButton,
                ...(selectedCareType === '到宅托育' && styles.radioButtonChecked),
              }}
            /> 到宅托育
          </div>

          <div style={styles.buttonLayout}>
            <TextField
              required
              id="address"
              label="服務地址"
              variant="outlined"
              value={address}
              onChange={handleAddressChange}
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
              
            <div style={styles.hopeLayout}>
              <div style={styles.componentLayout}>
                <span>可接送小朋友</span>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <IOSSwitch
                        sx={{ m: 1 }}
                        onChange={(e) => handleSwitchChange(1, e.target.checked)}
                      />
                    }
                    style={{ marginRight: '0px' }}
                  />
                </FormGroup>
              </div>
              <div style={styles.componentLayout}>
                <span>寶寶衣物清洗</span>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <IOSSwitch
                        sx={{ m: 1 }}
                        onChange={(e) => handleSwitchChange(2, e.target.checked)}
                      />
                    }
                    style={{ marginRight: '0px' }}
                  />
                </FormGroup>
              </div>
              <div style={styles.componentLayout}>
                <span>製作副食品</span>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <IOSSwitch
                        sx={{ m: 1 }}
                        onChange={(e) => handleSwitchChange(3, e.target.checked)}
                      />
                    }
                    style={{ marginRight: '0px' }}
                  />
                </FormGroup>
              </div>
              <div style={styles.componentLayout}>
                <span>可遠端查看育兒情形</span>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <IOSSwitch
                        sx={{ m: 1 }}
                        onChange={(e) => handleSwitchChange(4, e.target.checked)}
                      />
                    }
                    style={{ marginRight: '0px' }}
                  />
                </FormGroup>
              </div>
              <div style={styles.componentLayout}>
                <span>可配合不使用3C育兒</span>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <IOSSwitch
                        sx={{ m: 1 }}
                        onChange={(e) => handleSwitchChange(5, e.target.checked)}
                      />
                    }
                    style={{ marginRight: '0px' }}
                  />
                </FormGroup>
              </div>
              <div style={{...styles.componentLayout, borderBottom: "none"}}>
                <span>可配合家長外出</span>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <IOSSwitch
                        sx={{ m: 1 }}
                        onChange={(e) => handleSwitchChange(6, e.target.checked)}
                      />
                    }
                    style={{ marginRight: '0px' }}
                  />
                </FormGroup>
              </div>
            </div>

            <div style={styles.iconLayout}>
              <div style={styles.fontLayout}>
                <span style={styles.smallTitle}>上傳托育環境照</span>
                <span style={styles.noticeTitle}>{`${uploadedImages.length}/6`}</span>
              </div>
            </div>

            <div style={styles.uploadAvatorLayout}>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleEnvironmentImageChange}
                style={{ display: 'none' }}
                id="environment-file-input"
              />
              <label htmlFor="environment-file-input" style={styles.environmentLayout}>
                <img></img>
              </label>
            </div>

            <TextField
              required
              id="phone-number"
              variant="outlined"
              label="自我介紹"
              multiline
              rows={4}
              maxRows={4}
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
          </div>
          <div style={styles.buttonLayout}>
            <button style={styles.nextBtn} onClick={handleNextClick}>
              確認送出
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <g clip-path="url(#clip0_45_10393)">
                    <path d="M14.29 5.71047C13.9 6.10047 13.9 6.73047 14.29 7.12047L18.17 11.0005H3C2.45 11.0005 2 11.4505 2 12.0005C2 12.5505 2.45 13.0005 3 13.0005H18.18L14.3 16.8805C13.91 17.2705 13.91 17.9005 14.3 18.2905C14.69 18.6805 15.32 18.6805 15.71 18.2905L21.3 12.7005C21.69 12.3105 21.69 11.6805 21.3 11.2905L15.7 5.71047C15.32 5.32047 14.68 5.32047 14.29 5.71047Z" fill="#FFFFFF"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_45_10393">
                      <rect width="24" height="24" fill="white"/>
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

  environmentLayout: {
    height: '177px',
    alignSelf: 'stretch',
    boxShadow: '-1px 6px 12px -6px rgba(186, 186, 186, 0.25), 0px 8px 24px -4px rgba(186, 186, 186, 0.25)'
  },
  avatorLayout:{
    display: 'flex',
    width: '115px',
    height: '115px',
    padding: '18px 17.342px 18.536px 19px',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '1000px',
    border: '6px solid var(---Button-01, #FBDBD6)',
    background: 'var(---SurfaceContainer-Lowest, #FFF)',
  },
  uploadAvatorLayout: {
    display:'flex',
    alignItems:'center',
    width:'100%',
    justifyContent: 'center',
  },
  checkBoxLayout: {
    display: 'flex',
    height: '40px',
    alignItems: 'center',
    gap: '31px',
    alignSelf: 'stretch'
  },
  noticeTitle: {
    color: 'var(---Surface-Black-25, #252525)',
    fontFamily: "LINE Seed JP_TTF",
    fontSize: '10px',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 'normal'
  },
  smallTitle: {
    color: 'var(---Surface-Black-25, #252525)',
    fontFamily: "LINE Seed JP_TTF",
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: '800',
    lineHeight: 'normal'
  },
  fontLayout: {
    display:'flex',
    alignItems:'flex-start',
    width:'100%',
    flexDirection:'column'
  },
  iconLayout: {
    display:'flex',
    flexDirection:'column',
    gap:'24px',
    width:'100%'
  },
  nextBtn: {
    padding: '10px 20px',
    backgroundColor: 'var(---Primary-Primary, #E3838E)',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  componentLayout:{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderBottom: '1px solid #f4f4f4',   
  },
  hopeLayout: {
    width: '100%',
    display: 'flex',
    padding: '5px 10px',
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderRadius: '8px',
    border: '1px solid var(---OutLine-OutLine, #78726D)',
    background: 'var(---SurfaceContainer-Lowest, #FFF)',
  },
  titleLayout:{
    display:'flex',
    flexDirection:'column',
    alignItems:'flex-start',
    width:'100%',
  },
  typeFont:{
    color: 'var(---SurfaceContainer-Lowest, #FFF)',
    /* Line/bold/24pt */
    fontFamily: "LINE Seed JP_TTF",
    fontSize: '24px',
    fontStyle: 'normal',
    fontWeight: '700',
    linHeight: 'normal'
  },
  buttonLayout: {
    display:'flex',
    flexDirection:'column',
    gap:'10px',
    gap:'24px',
    width:'100%',
    marginBottom:'28px'
  },
  imgLayout: {
    height: '180px',
    alignSelf: 'stretch',
    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
    backgroundColor:'#FFF'
  },
  inputField: {
    padding: '28px 14px',
    borderRadius: '8px',
    border: '1px solid #000',
    background: 'var(---SurfaceContainer-Lowest, #FFF)',
    color: 'gray',
    width:'100%',
    position: 'relative',
    cursor: 'pointer',
  },
  dateInput: {
    opacity: 1,
    cursor: 'pointer',
    position: 'absolute',
    width:'100%',
    height: '100%',
    top: 0,
    left: 0,
    border: 'none',
    zIndex: 999,
    outline:'none',
    background:'transparent',
    padding:'10px',
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
    fontWeight: 'bold',
    marginTop: '15px',
    marginBottom: '15px',
    color:'#E3838E',
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
  suddenlyBtn: {
    display: 'flex',
    width: '320px',
    height: '130px',
    padding: '16px 12px',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    background:'var(---Primary-Primary, #E3838E)',
    border:'none',
    borderRadius:'12px'
  },
  longBtn: {
    display: 'flex',
    width: '320px',
    height: '130px',
    padding: '16px 12px',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    background:'var(---Primary-Primary, #F3CCD4)',
    border:'none',
    borderRadius:'12px'
  },
  radioButton: {
    appearance: 'none',
    width: '16px',
    height: '16px',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '2px',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
  },
  radioButtonChecked: {
    backgroundColor: '#e3838e',
    border: '1px solid #e3838e',
  },
};

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#e3838e',
      '& + .MuiSwitch-track': {
        backgroundColor: '#f5e5e5',
        opacity: 1,
        border: 0,
        ...theme.applyStyles('dark', {
          backgroundColor: '#2ECA45',
        }),
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.grey[100],
      ...theme.applyStyles('dark', {
        color: theme.palette.grey[600],
      }),
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.7,
      ...theme.applyStyles('dark', {
        opacity: 0.3,
      }),
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: '#fcf7f7',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
    ...theme.applyStyles('dark', {
      backgroundColor: '#39393D',
    }),
  },
}));

export default ApplicationPage;
