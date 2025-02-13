import React from 'react';
import './css/OrderHistoryItem.css'; // Ensure you have the corresponding CSS file
import { useRouter } from 'next/router';
import useStore from '../../lib/store';

const OrderHistoryItem = ({
  name,
  way,
  scene,
  createdTime,
  status,
  orderId,
  item
}) => {
  const router = useRouter();
  const setItem = useStore((state) => state.setItem);
  const handleClick = () => {
    setItem(item);
    router.push(`/parent/order/details/choose`);
  }
  
  return (
    <div className='order-history-list-item' onClick={() => handleClick()} >
      <div className='order-history-list-item-icon'>
        <img src='/icon/detailsIcon.png' alt='details-icon' />
      </div>
      <div className='order-history-list-item-name-layout'>
        <span className='name-font'>{name}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div className='wayLayout'>
            <span className='normalFont'>{way}</span>
          </div>
          <div className='sceneLayout'>
            <span className='normalFont'>{scene}</span>
          </div>
        </div>
      </div>
      <div className='order-history-list-item-content'>
        <span className='order-history-list-item-content-title'>
          訂單編號：{orderId}
        </span>
        <span className='order-history-list-item-content-title'>
          建立時間：{createdTime.slice(0, 10)}
        </span>
      </div>
      <div className='order-status-success'>
        <span className='order-status-success-font'>{status}</span>
      </div>
    </div>
  );
};

export default OrderHistoryItem;
