import React from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux';
import { setMemberId } from '../../features/member/memberSlice';
import axios from 'axios';
const ApplicationPage = () => {
  const router = useRouter();
  const dispatch = useDispatch(); // Redux 的 dispatch 函数

  const handleNextClick = async () => {
    const memberData = {
      accountName: document.getElementById('account').value,
      phoneNumber: document.getElementById('cellphone').value,
      email: document.getElementById('email').value,
      job: document.getElementById('job').value,
    };
    console.log(memberData);
    try {
      const response = await axios.post('/api/member/createMember', memberData);
      const memberId = response.data.member.id; // 獲取返回的 memberId
      dispatch(setMemberId(memberId)); // 保存到 Redux Store
      router.push('/parent/verify');
    } catch (error) {
      console.error('Error creating member:', error);
    }
  };

  const handleLastClick = () => {
    router.push('/parent/'); // 替换 '/next-page' 为你想要跳转的路径
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
        <div style={{ backgroundColor: 'white', width: '100%',display: 'flex',justifyContent:'center', alignItems: 'center',width: '100%',}}>
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
                    display: 'flex',
                    width: '320px',
                    padding: '18.5px 18px 19.5px 17px',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '20px',
                    gap: '20px'
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="account"
                    label="帳號名稱"
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
                    id="cellphone"
                    label="常用電話"
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
                    id="job"
                    label="職業"
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
                    id="email"
                    label="聯絡信箱"
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

              <div style={styles.buttonLayout}>
                <button style={styles.nextBtn} onClick={handleNextClick}>
                  下一步
                </button>
              </div>
            </div>
        </div>
    </div>
  );
};

const styles = {
  buttonLayout: {
    display:'flex',
    flexDirection:'column',
    gap:'10px'
  },
  imgLayout: {
    height: '180px',
    alignSelf: 'stretch',
    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
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
  buttonLayout:{
    width:'100%',
    display:'flex',
    justifyContent:'flex-end',
    marginTop:'12px'
  },
  subTitleLayout:{
    width:'100%',
    display:'flex',
    justifyContent:'flex-start',
    backgroundColor: '#f8ecec',
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
    marginBottom: '20px',
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
  nextBtn: {
    padding: '10px 20px',
    backgroundColor: 'var(---Primary-Primary, #E3838E)',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default ApplicationPage;
