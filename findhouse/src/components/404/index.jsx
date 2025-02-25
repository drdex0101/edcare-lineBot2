import ErrorPageContent from "./ErrorPageContent";

const index = () => {
  return (
    <>
      {/* <!-- Our Error Page --> */}
      <section className="our-error bgc-f7">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1 text-center">
              <ErrorPageContent />
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Our Footer --> */}
      <section className="footer_one">
        <div className="container">
          <div className="row"></div>
        </div>
      </section>

      {/* <!-- Our Footer Bottom Area --> */}
      <section className="footer_middle_area pt40 pb40">
        <div className="container"></div>
      </section>
    </>
  );
};

export default index;
