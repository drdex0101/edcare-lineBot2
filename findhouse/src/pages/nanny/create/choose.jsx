import React from 'react';
import { useRouter } from 'next/router';
const ApplicationPage = () => {
  const router = useRouter();

  const handleNextClick = () => {
    router.push('/nanny/create/suddenly'); // 替换 '/next-page' 为你想要跳转的路径
  };

  const handleLastClick = () => {
    router.push('/nanny/create/'); // 替换 '/next-page' 为你想要跳转的路径
  };

  const handleLongClick = () => {
    router.push('/nanny/longTern'); // 替换 '/next-page' 为你想要跳转的路径
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
        <div style={{ backgroundColor: 'white', width: '100%', display:'flex', justifyContent:'center' }}>
          <div style={styles.contentLayout}>
              <div style={styles.rollerLayout}>
                <div style={styles.roller}></div>
                <div style={styles.roller}></div>
                <div style={styles.roller}></div>
                <div style={styles.roller}></div>
                <div style={styles.rollerActive}></div>
              </div>
              <div style={styles.titleLayout}>
                <span style={styles.subTitle}>托育資料填寫</span>
                <span style={styles.smallTitle}>選擇托育方式</span>
              </div>
              <div style={styles.buttonLayout}>
                <button style={styles.suddenlyBtn} onClick={handleNextClick}>
                  <span style={styles.typeFont}>臨時托育</span>
                </button>
                <button style={styles.longBtn} onClick={handleLongClick}>
                  <span style={styles.typeFont}>長期托育</span>
                </button>
              </div>
          </div>
        </div>
    </div>
  );
};

const styles = {
  titleLayout:{
    display:'flex',
    flexDirection:'column',
    alignItems:'flex-start',
    width:'100%',
    marginLeft:'30px'
  },
      smallTitle:{
        color: 'var(---Primary-OnContainer, #6F2E2A)',
        fontFamily: "LINE Seed JP_TTF",
        fontSize: '16px',
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 'normal'
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
    marginTop:'35px'
  },
  imgLayout: {
    height: '180px',
    alignSelf: 'stretch',
    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
    backgroundColor:'#FFF'
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

export default ApplicationPage;
