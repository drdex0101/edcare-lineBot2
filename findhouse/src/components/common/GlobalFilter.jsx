import Router from "next/router";
import { useDispatch } from 'react-redux';
import { addKeyword, addLocation } from "../../features/properties/propertiesSlice";

const GlobalFilter = ({ className = "" , keyword, setKeyword, ...props}) => {
  const dispatch = useDispatch();
  // submit handler
  const submitHandler = async () => {
    // Dispatch actions to update the state with the keyword and priceRange
    dispatch(addKeyword(keyword));
    // Add other dispatch actions for other filter states like addLocation, etc.
  
    // Prepare the filter criteria as query parameters
    const queryParameters = new URLSearchParams({
      keyword: keyword,
      // Add other filter parameters here
    });
    // Append the query parameters to the URL
    const apiUrl = `/api/filterData?${queryParameters.toString()}`;
  
    // Make an API call to fetch data based on the filter criteria
    try {
      const response = await fetch(apiUrl); // Only passing the URL as fetch default method is 'GET'
  
      if (response.ok) {
        const data = await response.json();
        // Optionally redirect or do something with the data
        Router.push({
          pathname: "/parallax-style",
          query: data
        });
      } else {
        // Handle errors
        console.error('API call failed:', response.status, response.statusText);
      }
    } catch (error) {
      // Handle network errors
      console.error('Networking error:', error);
    }
  };
  return (
    <div className={`home1-advnc-search ${className}`}>
      <ul className="h1ads_1st_list mb0">
        <li className="list-inline-item">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="輸入關鍵字"
              style={{ width: '300px' }}
              onChange={(e) => {
                setKeyword(e.target.value); // Update local state
                dispatch(addKeyword(e.target.value)); // Update Redux state if necessary
              }}
            />
          </div>
        </li>

        <li className="list-inline-item">
          <div className="search_option_button">
            <button
              type="submit"
              className="btn btn-thm"
              onClick={submitHandler}
            >
              搜尋
            </button>
          </div>
        </li>
        {/* End li */}
      </ul>
    </div>
  );
};

export default GlobalFilter;
