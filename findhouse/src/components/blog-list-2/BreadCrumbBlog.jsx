import BreadCrumb from "../common/BreadCrumb";

const BreadCrumbBlog = () => {
  return (
    <div className="breadcrumb_content style2">
       <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="#">代銷經典</a>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
        熱銷建案
        </li>
      </ol>
      <h2 className="breadcrumb_title">熱銷建案</h2>
    </div>
  );
};

export default BreadCrumbBlog;
