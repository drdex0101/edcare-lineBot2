import React from 'react';
import './css/OrderHistoryItem.css'; // Ensure you have the corresponding CSS file

const OrderHistoryItem = ({
  customerName,
  serviceType,
  location,
  orderNumber,
  creationDate,
  status,
}) => {
  return (
    <div className='order-history-list-item'>
      <div className='order-history-list-item-icon'>
        <img src='/icon/detailsIcon.png' alt='details-icon' />
      </div>
      <div className='order-history-list-item-name-layout'>
        <span className='name-font'>{customerName}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div className='wayLayout'>
            <span className='normalFont'>{serviceType}</span>
          </div>
          <div className='sceneLayout'>
            <span className='normalFont'>{location}</span>
          </div>
        </div>
      </div>
      <div className='order-history-list-item-content'>
        <span className='order-history-list-item-content-title'>
          訂單編號：{orderNumber}
        </span>
        <span className='order-history-list-item-content-title'>
          建立時間：{creationDate}
        </span>
      </div>
      <div className='order-status-success'>
        <span className='order-status-success-font'>{status}</span>
      </div>
    </div>
  );
};

export default OrderHistoryItem;
