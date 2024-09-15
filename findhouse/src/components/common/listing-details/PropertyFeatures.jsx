const PropertyFeatures = ({ data }) => {
  const propertyFeatures = data && data.feature && typeof data.feature === 'string'
  ? data.feature.split(',')
  : [];

  let groupedFeatures = [];
  for (let i = 0; i < propertyFeatures.length; i += 5) {
    groupedFeatures.push(propertyFeatures.slice(i, i + 5));
  }

  return (
    <>
      {groupedFeatures.map((group, index) => (
        <div className="col-sm-6 col-md-6 col-lg-4" key={index}>
          <ul className="order_list list-inline-item">
            {group.map((feature) => (
              <li key={feature}>
                <span className="flaticon-tick"></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );

    
};

export default PropertyFeatures;
