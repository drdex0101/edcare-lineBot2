import ContactWithAgent from "../common/agent-view/ContactWithAgent";
import Categorie from "../common/listing/Categorie";
import ListingCreator from "../common/listing/ListingCreator";
import FeaturedListings from "../common/listing/FeaturedListings";
import FeatureProperties from "../common/listing/FeatureProperties";

const Sidebar = ({ property }) => {
  return (
    <>
      <div className="sidebar_listing_list">
        <div className="sidebar_advanced_search_widget">
          <div className="sl_creator">
            <h4 className="mb25">服務人員</h4>
            <ListingCreator data={ property }/>
          </div>
          {/* End .sl_creator */}
          <ContactWithAgent />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
