import React from 'react';
import Rating from '@mui/material/Rating';

const RatingComponent = ({ score }) => {
  return (
    <Rating
      name="read-only"
      value={score}
      precision={0.1}
      readOnly
    />
  );
};

export default RatingComponent;
