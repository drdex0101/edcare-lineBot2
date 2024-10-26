import React from 'react';

const SearchData = ({ fullcontact, setFullContact }) => {
  // 处理删除操作
  const handleDelete = async (id) => {
    // 显示确认对话框
    const confirmDelete = window.confirm('您确定要删除這筆紀錄嗎？');
    if (!confirmDelete) {
      return; // 如果用户点击“取消”，则停止函数执行
    }

    try {
      const response = await fetch('/api/deleteshortcontact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }), // 将 ID 包含在请求体中
      });
  
      if (response.ok) {
        // 删除操作成功
        const updatedContacts = fullcontact.filter(contact => contact.id !== id);
        setFullContact(updatedContacts);
      } else {
        // 删除操作失败
        const errorData = await response.json();
        console.error('Failed to delete the record:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <table className="table">
      <thead className="thead-light">
        <tr>
          <th scope="col">id</th>
          <th scope="col">姓名</th>
          <th scope="col">手機</th>
          <th scope="col">刪除資料</th> {/* 新增的表头 */}
        </tr>
      </thead>
      <tbody>
        {fullcontact.map((contact, index) => (
          <tr key={index}>
            <th scope="row">{contact.id}</th>
            <td>{contact.name}</td>
            <td>{contact.phone}</td>
            <td>
              {/* 添加删除按钮 */}
              <button onClick={() => handleDelete(contact.id)} className="delete-button">
                <span className="flaticon-garbage"></span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SearchData;
