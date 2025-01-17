import React from 'react';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import "./css/finish.css";
const ApplicationPage = () => {
  const router = useRouter();

  const handleNextClick = () => {
    router.push('/nanny/create/choose'); // 替换 '/next-page' 为你想要跳转的路径
  };

  const handleLastClick = () => {
    router.push('/nanny/create/'); // 替换 '/next-page' 为你想要跳转的路径
  };

  return (
    <div style={styles.main}>  
      <div style={styles.header}> 
        <span style={styles.headerFont}>
          申請成為保母
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
            <div style={styles.rollerActive}></div>
            <div style={styles.rollerActive}></div>
          </div>
          <div className='outlineBorder'>
            <div className='flexColumn'>
              <span className='outlineTitle'>
              您的資料已完成，
              </span>
              <span className='outlineTitle'>
              請稍等資料審核。
              </span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="31" height="30" viewBox="0 0 31 30" fill="none">
              <circle cx="15.5" cy="15" r="15" fill="#F5E5E5"/>
              <path d="M12.1637 19.8949L8.5146 16.0678C8.10798 15.6414 7.46157 15.6414 7.05496 16.0678C6.64835 16.4943 6.64835 17.1722 7.05496 17.5987L11.4234 22.1802C11.8301 22.6066 12.4869 22.6066 12.8935 22.1802L23.945 10.6006C24.3517 10.1742 24.3517 9.49627 23.945 9.06983C23.5384 8.64339 22.892 8.64339 22.4854 9.06983L12.1637 19.8949Z" fill="#E3838E"/>
            </svg>
          </div>
          <div className='outlineBorderSecond'>
            <div className='flexColumnSecond'>
              <span className='secondTitle'>
              我需要完成哪些步驟？
              </span>
              <span className='secondSubTitle'>
              除了完整填寫資料外，您還需要驗證您的手機號碼，送出資料後可進行驗證流程。
              </span>
            </div>
            <div className='flexColumnSecond'>
              <span className='secondTitle'>
              什麼時候會通過審核？ 
              </span>
              <span className='secondSubTitle'>
              審核時間約2~3天的時間，我們會撥電話給您做身分確認與審核。
              </span>
            </div>
            <div className='flexColumnSecond'>
              <span className='secondTitle'>
              我可以修改資料嗎？
              </span>
              <span className='secondSubTitle'>
              可以的，您送出資料後，可以在此頁進入修改申請資料頁面，若您有修改手機號碼，必須重新驗證。
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  lastButton: {
    border:'none',
    backgroundColor:'#FFF'
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh', // 占满整个视口高度
    backgroundColor: '#f8ecec'
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
