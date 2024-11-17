import React from 'react';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Pagination from '../../../components/base/pagenation';
const ApplicationPage = () => {
  const router = useRouter();

  const handleNextClick = () => {
    router.push('/parent/create/choose'); // 替换 '/next-page' 为你想要跳转的路径
  };

  const handleLastClick = () => {
    router.push('/parent/create/'); // 替换 '/next-page' 为你想要跳转的路径
  };

  return (
    <div style={styles.main}>  
      <div style={styles.header}> 
        <div style={styles.createInfoLayout} onClick={handleNextClick}>
            <span style={styles.headerFont}>
            + 建立托育資料
            </span>
        </div>
        <div style={styles.createButtonLayout}>
            <div style={styles.iconLayout}>
                <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
                <rect width="38" height="38" rx="4" fill="#F5E5E5"/>
                <path d="M26.0231 9C25.2613 9 24.4994 9.29013 23.9179 9.87171L22.6843 11.1053L26.8949 15.3158L28.1284 14.0822C29.2905 12.9201 29.2905 11.0349 28.1284 9.87171C27.5468 9.29013 26.785 9 26.0231 9ZM21.1053 12.6842L9 24.7895V29H13.2106L25.3159 16.8947L21.1053 12.6842Z" fill="#E3838E"/>
                </svg>
            </div>
            <div style={styles.iconLayout}>
                <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
                <rect width="38" height="38" rx="4" fill="#F5E5E5"/>
                <path d="M30.8209 18.2351C29.8547 16.2781 28.4397 14.5436 26.6759 13.1543L29.7079 10.3225L28.2929 9L24.9999 12.0728C23.1772 11.0881 21.1054 10.5776 18.9999 10.5943C11.4999 10.5943 8.05687 16.4419 7.17887 18.2351C7.06101 18.4754 7 18.7366 7 19.0009C7 19.2653 7.06101 19.5265 7.17887 19.7668C8.14501 21.7237 9.56009 23.4583 11.3239 24.8476L8.29287 27.6794L9.70687 29L12.9999 25.9272C14.8225 26.9119 16.8944 27.4224 18.9999 27.4057C26.4999 27.4057 29.9429 21.5581 30.8209 19.7649C30.9385 19.5249 30.9994 19.264 30.9994 19C30.9994 18.736 30.9385 18.4751 30.8209 18.2351ZM12.9999 19C12.998 17.9713 13.2998 16.9621 13.8721 16.0832C14.4445 15.2043 15.2652 14.4899 16.244 14.0183C17.2229 13.5468 18.322 13.3364 19.4206 13.4104C20.5191 13.4844 21.5745 13.8398 22.4709 14.4376L21.0189 15.7937C20.4093 15.4504 19.7117 15.2674 18.9999 15.2641C17.939 15.2641 16.9216 15.6577 16.1714 16.3583C15.4213 17.0589 14.9999 18.0092 14.9999 19C15.0034 19.6648 15.1993 20.3164 15.5669 20.8857L14.1149 22.2418C13.3898 21.2965 12.9999 20.1628 12.9999 19ZM18.9999 24.6038C17.7548 24.6038 16.541 24.2396 15.5289 23.5624L16.9809 22.2063C17.5904 22.5496 18.2881 22.7326 18.9999 22.7359C20.0607 22.7359 21.0782 22.3423 21.8283 21.6417C22.5784 20.941 22.9999 19.9908 22.9999 19C22.9964 18.3352 22.8005 17.6836 22.4329 17.1143L23.8849 15.7582C24.5249 16.5953 24.9055 17.5811 24.9847 18.6071C25.0639 19.6331 24.8386 20.6596 24.3338 21.5739C23.8289 22.4881 23.0639 23.2546 22.1229 23.7891C21.1819 24.3237 20.1013 24.6056 18.9999 24.6038Z" fill="#E3838E"/>
                </svg>
            </div>
        </div>
      </div>
      <div style={{ backgroundColor: 'white', width: '100%',display:'flex',alignItems:'center',flexDirection:'column' }}>
        <div style={styles.contentLayout}>
          <div style={styles.rollerLayout}>
            <div style={styles.searchInput}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M8.94286 3C10.519 3 12.0306 3.62612 13.1451 4.74062C14.2596 5.85512 14.8857 7.36671 14.8857 8.94286C14.8857 10.4149 14.3463 11.768 13.4594 12.8103L13.7063 13.0571H14.4286L19 17.6286L17.6286 19L13.0571 14.4286V13.7063L12.8103 13.4594C11.768 14.3463 10.4149 14.8857 8.94286 14.8857C7.36671 14.8857 5.85512 14.2596 4.74062 13.1451C3.62612 12.0306 3 10.519 3 8.94286C3 7.36671 3.62612 5.85512 4.74062 4.74062C5.85512 3.62612 7.36671 3 8.94286 3ZM8.94286 4.82857C6.65714 4.82857 4.82857 6.65714 4.82857 8.94286C4.82857 11.2286 6.65714 13.0571 8.94286 13.0571C11.2286 13.0571 13.0571 11.2286 13.0571 8.94286C13.0571 6.65714 11.2286 4.82857 8.94286 4.82857Z" fill="#999999"/>
                </svg>
                <input></input>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M6 13H18V11H6V13ZM3 6V8H21V6H3ZM10 18H14V16H10V18Z" fill="#252525"/>
            </svg>
          </div>
          <div style={styles.titleLayout}>
          </div>
        </div>
        <div style={{ backgroundColor: '#f8ecec', width: '100%',display:'flex',alignItems:'center',flexDirection:'column' }}>
        <div style={styles.nannyItemLayout}>
            <div style={styles.nannyItem}  onClick={() => router.push('/nanny/profile')}>
                <div style={styles.rightPart}>
                    <div>
                        <img src='/nannyIcon.jpg' style={styles.nannyIcon}></img>
                    </div>
                    <div style={styles.nannyFontLayout}>
                        <div style={styles.nannyNameFont}>王保母</div>
                        <div style={styles.nannySubInfo}>6年 3 月 托育經驗</div>
                    </div>
                </div>
                <div style={styles.scoreLayout}>
                    <span style={styles.scoreFont}>4.8</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                    <g clip-path="url(#clip0_75_7187)">
                        <path d="M12 0.5C5.38 0.5 0 5.88 0 12.5C0 19.12 5.38 24.5 12 24.5C18.62 24.5 24 19.12 24 12.5C24 5.88 18.62 0.5 12 0.5ZM17.17 12.12L15 13.89L15.9 16.62C16.02 16.99 15.9 17.4 15.59 17.63C15.28 17.87 14.86 17.88 14.53 17.67L12.01 16.03L9.53 17.69C9.38 17.79 9.2 17.84 9.02 17.84C8.83 17.84 8.63 17.78 8.47 17.66C8.16 17.43 8.03 17.02 8.15 16.65L9.01 13.89L6.83 12.12C6.54 11.87 6.43 11.47 6.56 11.11C6.69 10.75 7.04 10.51 7.42 10.51H10.17L11.14 7.9C11.27 7.54 11.62 7.3 12 7.3C12.38 7.3 12.73 7.54 12.86 7.9L13.83 10.51H16.58C16.96 10.51 17.31 10.75 17.44 11.11C17.57 11.47 17.46 11.88 17.17 12.13V12.12Z" fill="#FFD22F"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_75_7187">
                        <rect width="24" height="24" fill="white" transform="translate(0 0.5)"/>
                        </clipPath>
                    </defs>
                    </svg>
                </div>
            </div>
            <div style={styles.nannyItem}  onClick={() => router.push('/nanny/profile')}>
                <div style={styles.rightPart}>
                    <div>
                        <img src='/nannyIcon.jpg' style={styles.nannyIcon}></img>
                    </div>
                    <div style={styles.nannyFontLayout}>
                        <div style={styles.nannyNameFont}>王保母</div>
                        <div style={styles.nannySubInfo}>6年 3 月 托育經驗</div>
                    </div>
                </div>
                <div style={styles.scoreLayout}>
                    <span style={styles.scoreFont}>4.8</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                    <g clip-path="url(#clip0_75_7187)">
                        <path d="M12 0.5C5.38 0.5 0 5.88 0 12.5C0 19.12 5.38 24.5 12 24.5C18.62 24.5 24 19.12 24 12.5C24 5.88 18.62 0.5 12 0.5ZM17.17 12.12L15 13.89L15.9 16.62C16.02 16.99 15.9 17.4 15.59 17.63C15.28 17.87 14.86 17.88 14.53 17.67L12.01 16.03L9.53 17.69C9.38 17.79 9.2 17.84 9.02 17.84C8.83 17.84 8.63 17.78 8.47 17.66C8.16 17.43 8.03 17.02 8.15 16.65L9.01 13.89L6.83 12.12C6.54 11.87 6.43 11.47 6.56 11.11C6.69 10.75 7.04 10.51 7.42 10.51H10.17L11.14 7.9C11.27 7.54 11.62 7.3 12 7.3C12.38 7.3 12.73 7.54 12.86 7.9L13.83 10.51H16.58C16.96 10.51 17.31 10.75 17.44 11.11C17.57 11.47 17.46 11.88 17.17 12.13V12.12Z" fill="#FFD22F"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_75_7187">
                        <rect width="24" height="24" fill="white" transform="translate(0 0.5)"/>
                        </clipPath>
                    </defs>
                    </svg>
                </div>
            </div>
            <div style={styles.nannyItem}  onClick={() => router.push('/nanny/profile')}>
                <div style={styles.rightPart}>
                    <div>
                        <img src='/nannyIcon.jpg' style={styles.nannyIcon}></img>
                    </div>
                    <div style={styles.nannyFontLayout}>
                        <div style={styles.nannyNameFont}>王保母</div>
                        <div style={styles.nannySubInfo}>6年 3 月 托育經驗</div>
                    </div>
                </div>
                <div style={styles.scoreLayout}>
                    <span style={styles.scoreFont}>4.8</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                    <g clip-path="url(#clip0_75_7187)">
                        <path d="M12 0.5C5.38 0.5 0 5.88 0 12.5C0 19.12 5.38 24.5 12 24.5C18.62 24.5 24 19.12 24 12.5C24 5.88 18.62 0.5 12 0.5ZM17.17 12.12L15 13.89L15.9 16.62C16.02 16.99 15.9 17.4 15.59 17.63C15.28 17.87 14.86 17.88 14.53 17.67L12.01 16.03L9.53 17.69C9.38 17.79 9.2 17.84 9.02 17.84C8.83 17.84 8.63 17.78 8.47 17.66C8.16 17.43 8.03 17.02 8.15 16.65L9.01 13.89L6.83 12.12C6.54 11.87 6.43 11.47 6.56 11.11C6.69 10.75 7.04 10.51 7.42 10.51H10.17L11.14 7.9C11.27 7.54 11.62 7.3 12 7.3C12.38 7.3 12.73 7.54 12.86 7.9L13.83 10.51H16.58C16.96 10.51 17.31 10.75 17.44 11.11C17.57 11.47 17.46 11.88 17.17 12.13V12.12Z" fill="#FFD22F"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_75_7187">
                        <rect width="24" height="24" fill="white" transform="translate(0 0.5)"/>
                        </clipPath>
                    </defs>
                    </svg>
                </div>
            </div>
            <Pagination></Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
profilePic: {
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        marginBottom: '10px'
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
  smallTitle: {
    color: 'var(---Primary-OnContainer, #6F2E2A)',
    fontFamily: "LINE Seed JP_TTF",
    fontSize: '16px',
    fontWeight: '800',
    lineHeight: 'normal',
    marginBottom: '15px',
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
  nannySubInfo:{
    color: 'var(---Outline-OnSurface, #252525)',
    fontFamily: "LINE Seed JP_TTF",
    fontSize: '11px',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 'normal'
  },
  nannyNameFont:{
    color: 'var(---Outline-OnSurface, #252525)',
    fontFamily: "LINE Seed JP_TTF",
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 'normal'
  },
  nannyFontLayout:{
    display:'flex',
    flexDirection:'column',
    gap:'10px'
  },
  nannyIcon:{
    display: 'flex',
    width: '60px',
    height: '60px',
    padding: '7.982px',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:'50%'
  },
  rightPart:{
    display:'flex',
    gap:'20px',
    justifyContent:'center',
    alignItems:'center'
  },
  nannyItem:{
    display: 'flex',
    height: '70px',
    padding: '6px 9px 4px 8px',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderRadius: '8px',
    border: '2px solid var(---Button-01, #FBDBD6)',
    background: 'var(---SurfaceContainer-Lowest, #FFF)',
    cursor:'pointer'
  },
  nannyItemLayout: {
    display:'flex',
    flexDirection:'column',
    gap:'10px',
    gap:'24px',
    width:'100%',
    marginBottom:'28px',
    justifyContent:'space-between',
    backgroundColor: '#F3CCD4',
    paddingLeft:'35px',
    paddingRight:'35px',
    paddingTop: '20px',
    borderRadius: '40px 0px 0px 0px', // 左上、右上、右下、左下的圓角
  },
  buttonLayout: {
    display:'flex',
    flexDirection:'column',
    gap:'10px',
    gap:'24px',
    width:'100%',
    marginBottom:'28px',
    justifyContent:'space-between',
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
    marginBottom:'28px',
    backgroundColor: '#f8ecec',
    height:'100vh'
  },
  scoreLayout:{
    display:'flex',
    gap:'8px'
  },
  iconLayout:{
    height: '38px',
    alignSelf: 'stretch',
    fill: 'var(---SurfaceContainer-High, #F5E5E5)'
  },
  createButtonLayout:{
    display:'flex',
    flexDirection:'column',
    gap:'5px'
  },
  createInfoLayout:{
    display: 'flex',
    height: '85px',
    padding: '28.5px 38.5px 27.5px 39.5px',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '12px',
    border: '2px dashed var(---Primary-Container, #F3CCD4)',
    background: 'var(---SurfaceContainer-Lowest, #FFF)',
    gap:'8px',
    pointer:'cursor'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: '600px',
    // marginBottom: '20px',
    padding: '10px',
    paddingLeft: '50px',
    paddingRight: '50px',
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
    justifyContent:'center',
    width: '100%',
    maxWidth: '600px',
    backgroundColor: '#f8ecec',
    borderRadius: '40px 0px 0px 0px', // 左上、右上、右下、左下的圓角
  },
  searchInput:{
    display: 'flex',
    padding: '8px 52px 8px 12px',
    alignItems: 'center',
    gap: '8px',
    flex: '1 0 0',
    borderRadius: '100px',
    border: '1px solid #EBEBEB',
    background: '#FBFBFB',
  },
  rollerLayout: {
    display: 'flex',
    justifyContent: 'center',
    margin: '10px',
    alignItems:'center',
    gap:'10px'
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
