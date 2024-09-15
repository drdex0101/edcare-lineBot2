const PropertyDetails = ({data}) => {
  return (
    <>
      <div className="col-md-6 col-lg-6 col-xl-4">
        <ul className="list-inline-item">
          <li>
            <p>
              種類 : <span>{data.type}</span>
            </p>
          </li>
          <li>
            <p>
              類別/型態 : <span>{data.category}</span>
            </p>
          </li>
          <li>
            <p>
              價格 : <span>{data.price}</span>
            </p>
          </li>
          <li>
            <p>
              地坪 : <span>{data.size}</span>
            </p>
          </li>
          <li>
            <p>
              屋齡 : <span>{data.age}</span>
            </p>
          </li>
        </ul>
      </div>
      {/* End .col */}
      <div className="col-md-6 col-lg-6 col-xl-4">
        <ul className="list-inline-item">
          <li>
            <p>
              格局 : <span>{data.layout}</span>
            </p>
          </li>
          <li>
            <p>
              車位 : <span>{data.parking}</span>
            </p>
          </li>
          <li>
            <p>
              建坪 : <span>{data.builtarea}</span>
            </p>
          </li>
        </ul>
      </div>
      {/* End .col */}
    </>
  );
};

export default PropertyDetails;