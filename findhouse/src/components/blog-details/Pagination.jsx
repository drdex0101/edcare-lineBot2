const Pagination = ({ currentPage }) => {
  const prevPage = Number(currentPage) - 1 > 0 ? Number(currentPage) - 1 : 1;
  const nextPage = Number(currentPage) + 1;

  return (
    <div className="row">
      <div className="col-sm-6 col-lg-6">
        <div className="pag_prev">
          <a href={`/blog-details/${prevPage}`}>
            <span className="flaticon-back"></span>
          </a>
          <div className="detls">
            <h5>Previous Post</h5> <p> Housing Markets That</p>
          </div>
        </div>
      </div>
      {/* End .col */}

      <div className="col-sm-6 col-lg-6">
        <div className="pag_next text-right">
          <a href={`/blog-details/${nextPage}`}>
            <span className="flaticon-next"></span>
          </a>
          <div className="detls">
            <h5>Next Post</h5> <p> Most This Decade</p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Pagination;
