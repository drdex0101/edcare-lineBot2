import React from 'react';
const TOTAL_ENTRIES = 117; // 总行数设定为116
const SearchData = ({ fullcontact }) => {
  const fixedLength = 117;
  const groupedByType = fullcontact.reduce((acc, item) => {
    const type = item.type || '其他'; // 如果没有type，则归类到'其他'
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(item);
    return acc;
  }, {});
  
  return (
    <>
      {Object.entries(groupedByType).map(([type, contacts]) => (
        <div key={type} >
          <table className='table_page_breadcrumb_main' >
            <thead >
              <tr style={{ textAlign: 'center'}}>
                <th scope="col">品名</th>
                <th scope="col">單位</th>
                <th scope="col">價格</th>
                <th scope="col">品名</th>
                <th scope="col">單位</th>
                <th scope="col">價格</th>
                <th scope="col">品名</th>
                <th scope="col">單位</th>
                <th scope="col">價格</th>
                <th scope="col">品名</th>
                <th scope="col">單位</th>
                <th scope="col">價格</th>
              </tr>
            </thead>
            <tbody >
              {Array.from({ length: Math.ceil(117 / 4) }).map((_, rowIndex) => (
                <tr key={rowIndex} style={{ textAlign: 'center' }}>
                  {[0, 1, 2, 3].map((offset) => {
                    const contact = contacts[rowIndex * 4 + offset];
                    return contact ? (
                      <React.Fragment key={rowIndex * 4 + offset}>
                        <th scope="row">{contact.name}</th>
                        <td>{contact.category}</td>
                        <td>{contact.price}</td>
                      </React.Fragment>
                    ) : (
                      <React.Fragment key={rowIndex * 4 + offset}>
                        <th scope="row"></th>
                        <td></td>
                        <td></td>
                      </React.Fragment>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </>
  );
};

export default SearchData;
