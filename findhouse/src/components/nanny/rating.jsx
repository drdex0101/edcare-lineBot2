import React from 'react';
import Rating from '@mui/material/Rating';

const RatingComponent = ({ score, size = 'medium' }) => {
  return (
    <Rating
      name="read-only"
      value={score}
      precision={0.1}
      readOnly
      size={size}
    />
  );
};

export default RatingComponent;
