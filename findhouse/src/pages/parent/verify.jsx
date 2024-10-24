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
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                <path d="M18.2095 21.5H5.79048C4.8 21.5 4 20.7042 4 19.7189V18.3358C4 16.6495 4.95238 15.0958 6.4381 14.3947C7.27619 13.9968 8.22857 13.6937 9.21905 13.5042C9.50476 13.4474 9.71429 13.2011 9.71429 12.9168C9.71429 12.7274 9.61905 12.5568 9.46667 12.4242C8.36191 11.4958 7.71429 10.0179 7.71429 8.42632C7.71429 5.71684 9.6381 3.5 12 3.5C14.3619 3.5 16.2857 5.71684 16.2857 8.44526C16.2857 10.0179 15.619 11.5147 14.5143 12.4432C14.3619 12.5758 14.2667 12.7463 14.2667 12.9358C14.2667 13.22 14.4762 13.4663 14.7619 13.5232C15.7714 13.7126 16.7048 14.0158 17.5429 14.4137C19.0476 15.0958 20 16.6495 20 18.3358V19.7189C20 20.7042 19.2 21.5 18.2095 21.5ZM12 4.92105C10.419 4.92105 9.14286 6.49368 9.14286 8.44526C9.14286 9.60105 9.61905 10.6811 10.4 11.3442C10.8762 11.7421 11.1619 12.3105 11.1619 12.9168C11.1619 13.8832 10.4571 14.7168 9.50476 14.9063C8.60952 15.0768 7.79048 15.3421 7.04762 15.6832C6.07619 16.1568 5.42857 17.1989 5.42857 18.3358V19.7189C5.42857 19.9084 5.58095 20.0789 5.79048 20.0789H18.2286C18.419 20.0789 18.5905 19.9274 18.5905 19.7189V18.3358C18.5905 17.1989 17.9619 16.1568 16.9714 15.6832C16.2476 15.3421 15.4095 15.0768 14.5143 14.9063C13.5619 14.7168 12.8571 13.8832 12.8571 12.9168C12.8571 12.3105 13.1238 11.7421 13.619 11.3442C14.4 10.6811 14.8762 9.60105 14.8762 8.44526C14.8571 6.49368 13.581 4.92105 12 4.92105Z" fill="white"/>
              </svg>
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
    gap:'10px',
    marginTop:'35px'
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
    background: '#FFF',
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
