import React from 'react';
import { useRouter } from 'next/router';
const ApplicationPage = () => {
  const router = useRouter();

  const handleNextClick = () => {
    router.push('/parent/create/choose'); // 替换 '/next-page' 为你想要跳转的路径
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
            <span style={styles.subTitle}>托育資料填寫</span>
            <div style={styles.buttonLayout}>
              <button style={styles.suddenlyBtn} onClick={handleNextClick}>
                <span style={styles.typeFont}>臨時托育</span>
              </button>
              <button style={styles.longBtn} onClick={handleNextClick}>
                <span style={styles.typeFont}>長期托育</span>
              </button>
            </div>
        </div>
    </div>
  );
};

const styles = {
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
