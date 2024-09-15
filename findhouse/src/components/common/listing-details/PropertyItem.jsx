const PropertyItem = ({ data }) => {
  let displayValue=''
  
  if (data.builtarea === "") {
    displayValue = '地坪: '+data.size;
  } else {
    displayValue = '建坪: '+(data.builtarea);
  }
  return (
    <ul className="mb0">
      <li className="list-inline-item">
        <a href="#">{data.type}</a>
      </li>
      <li className="list-inline-item">
        <a href="#">{data.layout}</a>
      </li>
      <li className="list-inline-item">
        <a href="#">{displayValue}</a>
      </li>
    </ul>
  );
};

export default PropertyItem;
