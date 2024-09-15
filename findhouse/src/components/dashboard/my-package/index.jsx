import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu";
import PackageData from "./PackageData";
import SearchBox from "./SearchBox";
import { useEffect, useState } from 'react';

const Index = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/getproperties');
        if (response.ok) {
          const result = await response.json();
          setData(result);
        } else {
          console.error("Error fetching data:", await response.text());
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    }

    fetchData();
  }, []);
  return (
    <>

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />


      <div id="main-page" >
      <div  style={{display:'flex',justifyContent:'center'}}>
        <div className="breadcrumb_content style2 mb30-991 ">
          <h2 className="breadcrumb_title ">一二三蔬果行&大方蔬果行</h2>
        </div>
      </div>
      {/* <!-- Our Dashbord --> */}
   
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 ">
              <div className="row">
                <div className="col-lg-12">
                  <div className="my_dashboard_review mb40">
                    <div className="property_table">
                      <div className="table-responsive mt0">
                      <PackageData  fullcontact={data} setFullContact={setData}/>
                      </div>
                      {/* End .table-responsive */}

                      
                      {/* End .mbp_pagination */}
                    </div>
                    {/* End .property_table */}
                  </div>
                </div>
                {/* End .col */}
              </div>
              {/* End .row */}

              <div className="row mt50">
                <div className="col-lg-12">
                  <div className="copyright-widget text-center">
                    <p>© 2024 123蔬果行.</p>
                  </div>
                </div>
              </div>
              {/* End .row */}
            </div>
            {/* End .col */}
          </div>
        </div>

    </div>
    </>
  );
};

export default Index;
