import BreadCrumb from "../common/BreadCrumb";
import BreadCrumb_copy from "../common/BreadCrumb-copy";
const BreadCrumbBanner = () => {
  return (
    <section className="inner_page_breadcrumb_gallery">
      <div className="container">
        <div className="row">
          <div className="col-xl-6">
            <div className="breadcrumb_content">
              <BreadCrumb_copy title="代銷業績" />
              <h4 className="breadcrumb_title">代銷業績</h4>
            </div>
          </div>
          {/* End .col */}
        </div>
      </div>
    </section>
  );
};

export default BreadCrumbBanner;
