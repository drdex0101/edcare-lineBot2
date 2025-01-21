import React from 'react';
import Cookies from 'js-cookie';
const ApplicationPage = () => {
  const [kycInfoList, setKycInfoList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);  // 新增加載狀態
  const [error, setError] = React.useState(null);  // 新增錯誤狀態

  const fetchKycInfoList = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('/api/kycInfo/getKycInfoList');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setKycInfoList(data.kycInfoList);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const changeRichMenu = async (richMenuId) => {
    console.log('richMenuId:',Cookies.get('userId'))
    try {
      const response = await fetch('/api/line/changeRichMenu', {
        method: 'POST',  // 確保是POST方法
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: Cookies.get('userId'), 
          richMenuId: richMenuId
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Update Response:', data);
      window.location.reload();
    } catch (err) {
      console.error('Error updating status:', err);
      setError(err.message);
    }
  };

  const updateStatus = async (id, status, lineId, job) => {
    try {
      const response = await fetch('/api/kycInfo/updateStatus', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      if (status == '通過') {
        if (job == '保母') {
          changeRichMenu('richmenu-80140f174c84df860ab6e4b2f1382634')
        }
        else {
          changeRichMenu('richmenu-dbfe9df32ebd1e9aba105ca6fc996955')
        }
      }
      window.location.reload();
    } catch (err) {
      console.error('Error updating status:', err);
      setError(err.message);
    }
  };
  
  React.useEffect(() => {
    fetchKycInfoList();
  }, []);

  return (
    <div style={styles.main}>  
        <div style={styles.header}> 
            <span style={styles.headerFont}>
              改變狀態測試頁面
            </span>
        </div>
        <div style={{ backgroundColor: 'white', width: '100%',display: 'flex',justifyContent:'center', alignItems: 'center',width: '100%',}}>
          <div style={styles.contentLayout}>
              {isLoading ? (
                <div>Loading...</div>
              ) : error ? (
                <div style={{ color: 'red' }}>{error}</div>
              ) : kycInfoList.length === 0 ? (
                <div>No data available</div>
              ) : (
                <table style={styles.table}>
                    <tr>
                        <td style={styles.tableCell}>id</td>
                        <td style={styles.tableCell}>name</td>
                        <td style={styles.tableCell}>job</td>
                        <td style={styles.tableCell}>identityCard</td>
                        <td style={styles.tableCell}>gender</td>
                        <td style={styles.tableCell}>birthday</td>
                        <td style={styles.tableCell}>address</td>
                        <td style={styles.tableCell}>communicateAddress</td>
                        <td style={styles.tableCell}>welfareCertNo</td>
                        <td style={styles.tableCell}>identityFrontUploadId</td>
                        <td style={styles.tableCell}>identityBackUploadId</td>
                        <td style={styles.tableCell}>iconUploadId</td>
                        <td style={styles.tableCell}>status</td>
                        <td style={styles.tableCell}>操作</td>
                    </tr>
                  {kycInfoList.map((kycInfo) => (
                    <tr key={kycInfo.id}>
                      <td style={styles.tableCell}>{kycInfo.id}</td>
                      <td style={styles.tableCell}>{kycInfo.name}</td>
                      <td style={styles.tableCell}>{kycInfo.job}</td>
                      <td style={styles.tableCell}>{kycInfo.identityCard}</td>
                      <td style={styles.tableCell}>{kycInfo.gender}</td>
                      <td style={styles.tableCell}>{kycInfo.birthday}</td>
                      <td style={styles.tableCell}>{kycInfo.address}</td>
                      <td style={styles.tableCell}>{kycInfo.communicateAddress}</td>
                      <td style={styles.tableCell}>{kycInfo.welfareCertNo}</td>
                      <td style={styles.tableCell}>{kycInfo.identityFrontUploadId}</td>
                      <td style={styles.tableCell}>{kycInfo.identityBackUploadId}</td>
                      <td style={styles.tableCell}>{kycInfo.iconUploadId}</td>
                      <td style={styles.tableCell}>{kycInfo.status}</td>
                      <td style={styles.tableCell}>
                        <button style={styles.button} onClick={() => updateStatus(kycInfo.id, '通過', kycInfo.line_id, kycInfo.job)}>通過</button>
                        <button style={styles.button} onClick={() => updateStatus(kycInfo.id, '不通過', kycInfo.line_id, kycInfo.job)}>不通過</button>
                      </td>
                    </tr>
                  ))}
                </table>
              )}
          </div>
        </div>
    </div>
  );
};

const styles = {
    button:{
        backgroundColor:'#E3838E',
        color:'#fff',
        border:'none',
        borderRadius:'5px',
        padding:'5px 10px',
        cursor:'pointer',
        margin:'5px'
    },
  inputFont:{
    color: 'var(---Surface-Black-25, #252525)',
    fontFamily: "LINE Seed JP_TTF",
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 'normal',
  },
  checkBox: {
    display:'flex',
    gap:'4px',
    justifyContent:'flex-start',
    width:'100%'
  },
  mainContent: {
    color: 'var(---Surface-Black-25, #252525)',
    fontFamily: "LINE Seed JP_TTF",
    fontSize: '11px',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 'normal',
  },
  topTitle:{
    color: 'var(---Surface-Black-25, #252525)',
    fontFamily: "LINE Seed JP_TTF",
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 'normal',
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
    maxWidth: '320px',
    minWidth:'300px',
    padding: '18.5px 18px 19.5px 17px',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '20px',
    border: '2px solid var(---Button-01, #FBDBD6)',
    background: '#FFF'
  },
  nextBtn: {
    padding: '10px 20px',
    backgroundColor: 'var(---Primary-Primary, #E3838E)',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    gap:'8px'
  },
  table: {
    borderCollapse: 'collapse',
    width: '100%',
    border: '1px solid black',
  },
  tableCell: {
    border: '1px solid black',
    padding: '8px',
    textAlign: 'center',
  },
};

export default ApplicationPage;
