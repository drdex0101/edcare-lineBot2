import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu";
import TableData from "./TableData";
import Pagination from "./Pagination";
import React, { useState, useEffect } from 'react';


const Index = () => {
  const [properties, setProperties] = useState([]);
  const [vegetableType, setVegetableType] = useState('蔬果根莖類');
  useEffect(() => {
    async function fetchData() {
      try {
        // 根据选中的类型构造 URL
        const url = `/api/getproperties?type=${encodeURIComponent(vegetableType)}`;
        const response = await fetch(url);
        if (response.ok) {
          const result = await response.json();
          setProperties(result);
        } else {
          console.error("Error fetching data:", await response.text());
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    }

    fetchData();
  }, [vegetableType]); // 当 propertyType 变化时重新获取数据
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('您確定要删除這筆物件嗎？');
    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch('/api/deleteshortproperty', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
      });

      if (response.ok) {
        const updatedProperties = properties.filter(property => property.id !== id);
        setProperties(updatedProperties);
      } else {
        const errorData = await response.json();
        console.error('Failed to delete the record:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // 价格更新
const handleUpdate = async (id, newPrice) => {
  console.log('id:', id, 'price:', newPrice);
  try {
    const response = await fetch('/api/updateVegetable', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, price: newPrice }),
    });

    if (response.ok) {
      console.log('Price updated successfully');
      alert('價格更新成功');
      // 直接更新 properties 状态而非重新加载页面
      setProperties(properties.map(item =>
        item.id === id ? { ...item, price: newPrice } : item
      ));
    } else {
      console.error('Failed to update the price');
    }
  } catch (error) {
    console.error('Error updating the price:', error);
  }
};

// 分类更新
const handleUpdateCategory = async (id, newCategory) => {
  try {
    const response = await fetch('/api/updateCategory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, category: newCategory }),
    });

    if (response.ok) {
      console.log('Category updated successfully');
      alert('單位更新成功');
      // 直接更新 properties 状态而非重新加载页面
      setProperties(properties.map(item =>
        item.id === id ? { ...item, category: newCategory } : item
      ));
    } else {
      console.error('Failed to update the category');
    }
  } catch (error) {
    console.error('Error updating the category:', error);
  }
};

  return (
    <>
      {/* <!--  Mobile Menu --> */}
      <Header />
      <MobileMenu />

      <div id="root">
        <div></div>
      <div  style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:60}}>
          <div >
          <select style={{
            borderColor: 'black', // 设置边框颜色为蓝色
            borderWidth: '2px', // 设置边框宽度为2px
            height: '70px', // 设置选择框的高度
            fontSize:  '30px', // 设置文字的大小
            borderRadius: '20px', // 设置边框圆角
            textAlign: 'center', // 设置文字居中
            borderStyle: 'solid', // 设置边框样式为实线
            fontWeight:700,
            margin:15
          }}  value={vegetableType} onChange={e => setVegetableType(e.target.value)}>
            <option value="蔬果根莖類">蔬果根莖類</option>
            <option value="菇類">菇類</option>
            <option value="其他類">其他類</option>
            <option value="豆蛋類">豆蛋類</option>
            <option value="冷凍類">冷凍類</option>
            <option value="筍類醃菜類">筍類醃菜類</option>
            <option value="生鮮類">生鮮類</option>
            <option value="香料類">香料類</option>
            {/* 更多类别选项 */}
          </select>
          </div>
        </div>
      <div >
        {/* <!-- Our Dashbord --> */}
        <div style={{display:'flex',justifyContent:'center'}}>
        <TableData properties={properties} handleDelete={handleDelete} handleUpdate={handleUpdate} handleUpdateCategory={handleUpdateCategory}/>
        </div>
      </div>
      {/* <!-- Our Footer --> */}
      </div>
    </>
  );
};
{/* <TableData properties={properties} handleDelete={handleDelete} handleUpdate={handleUpdate} handleUpdateCategory={handleUpdateCategory}/> */}
export default Index;
