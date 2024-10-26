import Image from "next/image";
import React, { useState, useEffect } from 'react';

const TableData = ({ properties, handleDelete, handleUpdate,handleUpdateCategory }) => {
  const categories = ['台斤', '公斤', '件', '板', '瓶', '把', '尾', '朵', '片', '包', '盒', '塊', '粒']; // 示例分类
    

  const [selectedCategories, setSelectedCategories] = useState(
    properties.reduce((acc, item) => ({ ...acc, [item.id]: item.category || categories[0] }), {})
  );
  

  const handleCategoryChange = (id, value) => {
    setSelectedCategories({ ...selectedCategories, [id]: value });
  };
  

  const [editingId, setEditingId] = useState(null);
  const [editedPrice, setEditedPrice] = useState({});
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  console.log(properties);
  const startEdit = (id, price) => {
    setEditingId(id);
    setEditedPrice({ ...editedPrice, [id]: price });
  };

  const handlePriceChange = (id, value) => {
    setEditedPrice({ ...editedPrice, [id]: value });
  };

  const saveEdit = (id) => {
    handleUpdate(id, editedPrice[id]);
    setEditingId(null);
  };
  const saveCategoryEdit = (id) => {
  // 直接傳遞類別名稱給 handleUpdateCategory 函數
  if (selectedCategories[id]==null){
    selectedCategories[id]=categories[0];
  }
  handleUpdateCategory(id, selectedCategories[id]);
  setEditingCategoryId(null);
};

  let theadContent = [
    "品名", "單價","單位", "刪除"
  ];

  let tbodyContent = properties.map((item) => (
    <tr key={item.id}>
      <td style={{textAlign:'center',width:'200px'}}>{item.name}</td>
      <td style={{textAlign:'center',width:'200px'}}>
        {editingId === item.id ? (
          <>
            <input
              type="text"
              value={editedPrice[item.id]}
              onChange={(e) => handlePriceChange(item.id, e.target.value)}
            />
            <button onClick={() => saveEdit(item.id)}>儲存</button>
          </>
        ) : (
          <>
            {item.price}
            <a href="#" onClick={() => startEdit(item.id, item.price)}>
              <span className="flaticon-edit"></span>
            </a>
          </>
        )}
      </td>
      <td style={{textAlign:'center',width:'200px'}}>
      {editingCategoryId === item.id ? (
        <>
          <select
            value={selectedCategories[item.id]}
            onChange={(e) => handleCategoryChange(item.id, e.target.value)}
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          <button onClick={() => saveCategoryEdit(item.id)}>儲存</button>
        </>
      ) : (
        <>
          {item.category}
          <a href="javascript:void(0)" onClick={() => setEditingCategoryId(item.id)}>
            <span className="flaticon-edit"></span>
          </a>
        </>
      )}
    </td>
      <td style={{textAlign:'center',width:'200px'}}>
        <ul className="view_edit_delete_list mb0">
          <li className="list-inline-item" data-toggle="tooltip" data-placement="top" title="Delete">
            <button onClick={() => handleDelete(item.id)} className="delete-button">
              <span className="flaticon-garbage"></span>
            </button>
          </li>
        </ul>
      </td>
    </tr>
  ));

  return (
    <>
      <table className="table">
        <thead className="thead-light">
          <tr>
            {theadContent.map((value, i) => (
              <th scope="col" key={i} style={{textAlign:'center',width:'200px'}}>
                {value}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{tbodyContent}</tbody>
      </table>
    </>
  );
};

export default TableData;
