import Image from "next/image";
import React, { useState, useEffect } from 'react';

const TableData = ({ properties, handleDelete, handleUpdate }) => {
  const [editingId, setEditingId] = useState(null);
  const [editedPrice, setEditedPrice] = useState({});

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

  let theadContent = [
    "品名", "單價", "品名", "單價","品名", "單價","品名", "單價","編輯/刪除"
    // 假設每行只有一個產品和價格
  ];

  let tbodyContent = properties.map((item) => (
    <tr key={item.id}>
      <td>{item.name}</td>
      <td>
        {editingId === item.id ? (
          <>
            <input
              type="text"
              value={editedPrice[item.id]}
              onChange={(e) => handlePriceChange(item.id, e.target.value)}
            />
            <button onClick={() => saveEdit(item.id)}>Save</button>
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
      <td>
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
              <th scope="col" key={i}>
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
