import PropertyDescriptions from "../common/listing-details/PropertyDescriptions";
import PropertyDetails from "../common/listing-details/PropertyDetails";
import PropertyFeatures from "../common/listing-details/PropertyFeatures";
import PropertyItem from "../common/listing-details/PropertyItem";

const DetailsContent = ({ property }) => {
  return (
    <>
      <div className="listing_single_description">
        <div className="lsd_list">
          <PropertyItem data={ property }/>
        </div>
        {/* End .lsd_list */}

        <h4 className="mb30">物件介紹</h4>
        <PropertyDescriptions data={ property }/>
      </div>
      {/* End .listing_single_description */}

      <div className="additional_details">
        <div className="row">
          <div className="col-lg-12">
            <h4 className="mb15">基本資料</h4>
          </div>
          <PropertyDetails data={ property }/>
        </div>
      </div>

      <div className="application_statics mt30">
        <div className="row">
          <div className="col-lg-12">
            <h4 className="mb10">特色</h4>
          </div>
          {/* End .col */}

          <PropertyFeatures data={ property }/>
        </div>
      </div>
      {/* End .feature_area */}
    </>
  );
};

export default DetailsContent;
