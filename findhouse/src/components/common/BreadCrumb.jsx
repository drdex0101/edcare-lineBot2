const BreadCrumb = ({ title = "" }) => {
  return (
    <>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="#">首頁</a>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          {title}
        </li>
      </ol>
    </>
  );
};

export default BreadCrumb;
