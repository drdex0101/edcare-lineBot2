import React from 'react';
import { useRouter } from 'next/router';
const ApplicationPage = () => {
  const router = useRouter();

  const handleNextClick = () => {
    router.push('/parent/upload'); // 替换 '/next-page' 为你想要跳转的路径
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
            <div style={styles.lawLayout}>
              <div style={styles.imgLayout}>

              </div>
            </div>
            <div style={styles.buttonLayout}>
              <button style={styles.nextBtn} onClick={handleNextClick}>
                進行身分認證
              </button>
              <button style={styles.nextBtn} onClick={handleNextClick}>
                稍後再驗證
              </button>
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
  nextBtn : {
    display: 'flex',
    padding:'8px 12px',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    alignItems: 'flex-start',
    borderRadius: '6px',
    background: 'var(---Primary-Primary, #E3838E)',
    border:'none',
    maxWidth:'120px'
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
    background: '#FFF',
    gap:'20px'
  },
  subTitle: {
    color: '#E3838E',
    textAlign: 'center',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: 'normal',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'center',
    alignItem:'center' ,
    height:'100%'
  },
  header: {
    backgroundColor: '#FFF',
    display: 'flex',
    justifyContent:'space-between',
    alignItem:'center'
  },
  headerFont: {
    color: '#E3838E',
    textAlign: 'center',
    fontSize: '24px',
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 'normal',
  },
  contentLayout : {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor:'#F8ECEC',
    alignItem:'center',
    justifyContent:'center',
    width:'100%',
    flex:1
  },
  rollerLayout: {
    display: 'flex',
    width: '390px',
    height: '52px',
    padding: '21px 24px',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    flexShrink: '0'
  },
  rollerActive: {
    width: '42px',
    height: '6px',
    borderRadius: '2px',
    background: '#E3838E'
  },
  roller: {
    width: '42px',
    height: '6px',
    borderRadius: '2px',
    background: '#FFF'
  }
};

export default ApplicationPage;
