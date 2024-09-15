const FilterTopBar = ({ sort, setSort }) => { 
  return (
    <>

      <div className="col-sm-12 col-md-8 col-lg-8 col-xl-7">
        <div className="right_area text-end tac-xsd">
          <ul>
            <li className="list-inline-item">
              <span className="shrtby">排序</span>
              <select onChange={(e) => setSort(e.target.value)} value={sort}>
                <option value="recent">從新到舊</option>
                <option value="old">從舊到新</option>
                <option value="high">價格高到低</option>
                <option value="low">價格低到高</option>
              </select>
            </li>
          </ul>
        </div>
      </div>
      {/* End .col */}
    </>
  );
};

export default FilterTopBar;
