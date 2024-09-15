import GlobalFilter from "./GlobalFilter";

const GlobalHeroFilter = ({ className = "" ,type ,setType , keyword, setKeyword, ...props}) => {
  const handleTypeChange = (newType) => {
    setType(newType); // this function updates the type state in the parent component
  };
  return (
    <div className={`home_adv_srch_opt ${className}`}>
      <ul className="nav nav-pills" id="pills-tab" role="tablist">
      <li className="nav-item">
          <a
            className="nav-link active"
            id="pills-home-tab"
            data-bs-toggle="pill"
            href="#pills-home"
            role="tab"
            aria-controls="pills-home"
            aria-selected="true"
            onClick={() => handleTypeChange('全部')}
          >
            全部
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link "
            id="pills-3-tab"
            data-bs-toggle="pill"
            href="#pills-4"
            role="tab"
            aria-controls="pills-4"
            aria-selected="false"
            onClick={() => handleTypeChange('住宅')}
          >
            住宅
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="pills-art-tab"
            data-bs-toggle="pill"
            href="#pills-profile"
            role="tab"
            aria-controls="pills-profile"
            aria-selected="false"
            onClick={() => handleTypeChange('農地')}
          >
            農地
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link "
            id="pills-2-tab"
            data-bs-toggle="pill"
            href="#pills-2"
            role="tab"
            aria-controls="pills-2"
            aria-selected="false"
            onClick={() => handleTypeChange('建地')}
          >
            建地
          </a>
        </li>

        <li className="nav-item">
          <a
            className="nav-link "
            id="pills-3-tab"
            data-bs-toggle="pill"
            href="#pills-3"
            role="tab"
            aria-controls="pills-3"
            aria-selected="false"
            onClick={() => handleTypeChange('其他')}
          >
            其他
          </a>
        </li>
      </ul>
      {/* End nav-pills */}

      <div className="tab-content home1_adsrchfrm" id="pills-tabContent">
      <div
          className="tab-pane fade"
          id="pills-4"
          role="tabpanel"
          aria-labelledby="pills-4-tab"
        >
          <GlobalFilter keyword={keyword} setKeyword={setKeyword}/>
        </div>
        <div
          className="tab-pane fade show active"
          id="pills-home"
          role="tabpanel"
          aria-labelledby="pills-home-tab"
        >
          <GlobalFilter keyword={keyword} setKeyword={setKeyword}/>
        </div>
        <div
          className="tab-pane fade "
          id="pills-profile"
          role="tabpanel"
          aria-labelledby="pills-profile-tab"
        >
          <GlobalFilter keyword={keyword} setKeyword={setKeyword}/>
        </div>
        <div
          className="tab-pane fade "
          id="pills-2"
          role="tabpanel"
          aria-labelledby="pills-2-tab"
        >
          <GlobalFilter keyword={keyword} setKeyword={setKeyword}/>
        </div>
        <div
          className="tab-pane fade "
          id="pills-3"
          role="tabpanel"
          aria-labelledby="pills-3-tab"
        >
          <GlobalFilter keyword={keyword} setKeyword={setKeyword}/>
        </div>
      </div>
    </div>
  );
};

export default GlobalHeroFilter;
