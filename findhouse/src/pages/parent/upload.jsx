import React from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import { MenuItem, InputLabel } from '@mui/material';
const ApplicationPage = () => {
  const router = useRouter();

  const handleNextClick = () => {
    router.push('/parent/finish'); // 替换 '/next-page' 为你想要跳转的路径
  };

  return (
    <div style={styles.main}>  
        <div style={styles.header}> 
            <span style={styles.headerFont}>
              申請成為家長
            </span>
            <button>
              <img src="./publoc/IconMask.svg" alt="描述" />
            </button>
        </div>
        <div style={styles.contentLayout}>
            <div style={styles.rollerLayout}>
              <div style={styles.roller}></div>
              <div style={styles.roller}></div>
              <div style={styles.rollerActive}></div>
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
                  borderRadius: '20px',
                  border: '2px solid #FBDBD6',
                  gap: '20px'
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="account-name"
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

                <InputLabel id="gender-label">性別</InputLabel>
                  <Select
                      labelId="gender-label"
                      id="gender"
                      label="性別"
                      defaultValue=""
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
                  >
                      <MenuItem value="male">男</MenuItem>
                      <MenuItem value="female">女</MenuItem>
                  </Select>

                <TextField
                  id="phone-number"
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


                <TextField
                  id="phone-number"
                  label="出生日期"
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
                  id="phone-number"
                  label="出生日期"
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
                  id="phone-number"
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
                  id="phone-number"
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
            <div style={styles.uplaodLayput}>
              <span style={styles.mainCode}>上傳身分證正反面</span>
              <span style={styles.subCode}>僅供通托育平台身分驗證使用，請提供清晰正見正反照。</span>
            </div>
            <div style={styles.uploadimgLayout}>
                <span style={styles.mainCode}>證件照正面</span>
                <div style={styles.imgLayout}></div>
                <span style={styles.mainCode}>證件照反面</span>
                <div style={styles.imgLayout}></div>
            </div>
            <button style={styles.nextBtn} onClick={handleNextClick}>
              確認送出
            </button>
        </div>
    </div>
  );
};

const styles = {
  uploadimgLayout:{
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    width:'100%',
    justifyContent:'center',
    padding:'20px'
  },
  imgLayout: {
    height: '180px',
    alignSelf: 'stretch',
    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
    background:'#FFF',
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
  uplaodLayput: {
    display:'flex',
    flexDirection:'column'
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
    backgroundColor: '#FBDBD6',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: '600px',
    marginBottom: '20px',
    padding: '10px',
    backgroundColor: '#fff',
  },
  headerFont: {
    fontSize: '24px',
    fontWeight: 'bold',
    color:'#E3838E'
  },
  contentLayout: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '600px',
    backgroundColor: '#FBDBD6',
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
    marginTop:'20px'
  },
};

export default ApplicationPage;
