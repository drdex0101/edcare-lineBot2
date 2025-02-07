import React from 'react';
import './css/OrderHistoryItem.css'; // Ensure you have the corresponding CSS file

const OrderHistoryItem = ({
  name,
  way,
  scene,
  orderNumber,
  createdTime,
  status,
  orderId,
}) => {
  return (
    <div className='order-history-list-item'>
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
