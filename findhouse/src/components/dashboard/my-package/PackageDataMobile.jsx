import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell
} from "@nextui-org/react";
const TableData = ({ fullcontact }) => {
  // 按 type 分组联系人数据
  const groupedByType = fullcontact.reduce((acc, item) => {
    const type = item.type || '其他';  // 如果没有 type，则分到 '其他'
    acc[type] = acc[type] || [];
    acc[type].push(item);
    return acc;
  }, {});

  const theadContent = ["品名", "單價", "單位"];

  return (
    <>
      {Object.entries(groupedByType).map(([type, contacts], index) => (
        <div key={index} >
          <Table aria-label="Example static collection table">
              <TableHeader>
              {theadContent.map((column) =>
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
            </TableHeader>
           <TableBody>
              {contacts.map((contact) => (
                <TableRow key={contact.id} >
                  <TableCell style={{color:'black',fontSize:'20px',width:'150px',textAlign:'center'}}>{contact.name}</TableCell>
                  <TableCell style={{color:'black',fontSize:'20px',width:'150px',textAlign:'center'}}>{contact.price}</TableCell>
                  <TableCell style={{color:'black',fontSize:'20px',width:'150px',textAlign:'center'}}>{contact.category}</TableCell>
                </TableRow>
              ))}
           </TableBody>
          </Table>
        </div>
      ))}
    </>
  );
};

export default TableData;
