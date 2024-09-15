import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import CopyrightFooter from "../../components/common/footer/CopyrightFooter";
import Footer from "../../components/common/footer/Footer";
import Header from "../../components/common/header/DefaultHeader";
import MobileMenu from "../../components/common/header/MobileMenu";
import PopupSignInUp from "../../components/common/PopupSignInUp";
import properties from "../../data/properties";
import DetailsContent from "../../components/listing-details-v1/DetailsContent";
import Sidebar from "../../components/listing-details-v1/Sidebar";
import Image from "next/image";
const ListingDynamicDetailsV1 = () => {
  const router = useRouter();
  const id = 20;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      if (router.isReady) {
        try {
          const response = await fetch(`/api/propertiespic?propertyId=${id}`);
          if (response.ok) {
            const result = await response.json();
            setData(result);
            console.log(result)
          } else {
            console.error("Error fetching data:", await response.text());
          }
        } catch (error) {
          console.error("Network error:", error);
        } finally {
          setLoading(false); // 在这里设置loading为false
        }
      }
    }
    fetchData();
  }, [router.isReady, router.query]);
  if (loading) {
    return <h1>Loading...</h1>;
  }
  const property = data
  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      {/* <!-- Modal --> */}
      <PopupSignInUp />

      {/* <!-- Listing Single Property --> */}
      <section className="listing-title-area mt85 md-mt0">
        <div className="container">
          <Gallery>
            <div className="row mb30">
              <div className="col-lg-7 col-xl-8">
                <div className="single_property_title mt30-767">
                  <h2>{property[0].title}</h2>
                  <p>{property[0].location}</p>
                </div>
              </div>
              <div className="col-lg-5 col-xl-4">
                <div className="single_property_social_share position-static transform-none">
                  <div className="price float-start fn-400">
                    <h2>
                      ${property[0].price}
                    </h2>
                  </div>

                  <div className="spss style2 mt20 text-end tal-400">
                    <ul className="mb0">
                      <li className="list-inline-item">
                        <a href="#">
                          <span className="flaticon-share"></span>
                        </a>
                      </li>
                    </ul>
                  </div>
                  {/* End activity and social sharing */}
                </div>
              </div>
            </div>
            {/* End .row */}
            <div className="row">
              <div className="col-sm-7 col-lg-8">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="spls_style_two mb30-520">
                      <Item
                        original={property[0].url || 'https://res.cloudinary.com/def15n5qh/image/upload/v1698558995/fp1_qe6l3e.jpg'}
                        thumbnail={property[0].url || 'https://res.cloudinary.com/def15n5qh/image/upload/v1698558995/fp1_qe6l3e.jpg'}
                        width={752}
                        height={450}
                      >
                        {({ ref, open }) => (
                          <div role="button" ref={ref} onClick={open}>
                            <Image
                              width={752}
                              height={450}
                              className="img-fluid w100 cover lds-1"
                              src={property[0].url || 'https://res.cloudinary.com/def15n5qh/image/upload/v1698558995/fp1_qe6l3e.jpg'}
                              alt="Image"
                            />
                          </div>
                        )}
                      </Item>
                    </div>
                  </div>
                </div>
              </div>
              {/* End .col-sm-7 .col-lg-8 */}

              <div className="col-sm-5 col-lg-4">
                <div className="row">
                {property.slice(0, 7).map((val, i) => (
                    <div className="col-6" key={i}>
                      <div className="spls_style_two img-gallery-box mb24">
                        <Item
                          original={val.url || 'https://res.cloudinary.com/def15n5qh/image/upload/v1698558995/fp1_qe6l3e.jpg'}
                          thumbnail={val.url || 'https://res.cloudinary.com/def15n5qh/image/upload/v1698558995/fp1_qe6l3e.jpg'}
                          width={752}
                          height={450}
                        >
                          {({ ref, open }) => (
                            <div role="button" ref={ref} onClick={open}>
                              <Image
                                width={170}
                                height={133}
                                className="img-fluid w100 cover"
                                src={val.url || 'https://res.cloudinary.com/def15n5qh/image/upload/v1698558995/fp1_qe6l3e.jpg'}
                                alt="Image"
                              />
                            </div>
                          )}
                        </Item>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* End  col-sm-5 col-lg-4 */}
            </div>
            {/* End .row */}
          </Gallery>
        </div>
      </section>

      {/* <!-- Agent Single Grid View --> */}
      <section className="our-agent-single bgc-f7 pb30-991">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-8">
              <DetailsContent property={property[0]}/>
            </div>
            {/* End details content .col-lg-8 */}

            <div className="col-lg-4 col-xl-4">
              <Sidebar property={property[0]}/>
            </div>
            {/* End sidebar content .col-lg-4 */}
          </div>
          {/* End .row */}
        </div>
      </section>

      {/* <!-- Our Footer --> */}
      <section className="footer_one">
        <div className="container">
          <div className="row">
            <Footer />
          </div>
        </div>
      </section>

      {/* <!-- Our Footer Bottom Area --> */}
      
    </>
  );
};

export default ListingDynamicDetailsV1;
