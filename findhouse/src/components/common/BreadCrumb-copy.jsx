const BreadCrumb_copy = ({ title = "" }) => {
  return (
    <>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="#">代銷經典</a>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          {title}
        </li>
      </ol>
    </>
  );
};

export default BreadCrumb_copy;
