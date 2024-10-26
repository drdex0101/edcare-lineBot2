import Link from "next/link";
import Slider from "react-slick";
import properties from "../../data/properties";
import Image from "next/image";
import { useEffect, useState } from "react";
const FeaturedProperties = () => {
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
  const settings = {
    dots: true,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: false,
    speed: 1200,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 3,
        },
      },
    ],
  };

  let content = data?.slice(0, 12)?.map((item) => (
    <div className="item" key={item.id}>
      <div className="feat_property">
        <div className="thumb">
        {item.url ? (
              <Image
                width={342}
                height={220}
                src={item.url }
                alt={item.url }
              />
            ) : <Image
            width={342}
            height={220}
            src={'https://res.cloudinary.com/def15n5qh/image/upload/v1698558995/fp1_qe6l3e.jpg'}
            alt={'https://res.cloudinary.com/def15n5qh/image/upload/v1698558995/fp1_qe6l3e.jpg'}
          />}
          <div className="thmb_cntnt">
            {/* End .tag */}

            <ul className="icon mb0">
              <li className="list-inline-item">
                <a href="#">
                  <span className="flaticon-transfer-1"></span>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#">
                  <span className="flaticon-heart"></span>
                </a>
              </li>
            </ul>
            {/* End .icon */}

            <Link href={`/listing-details-v1/${item.id}`} className="fp_price">
              ${item.price}
              <small>/元</small>
            </Link>
          </div>
        </div>
        {/* End .thumb */}

        <div className="details">
          <div className="tc_content">
            <p className="text-thm">{item.type}</p>
            <h4>
              <Link href={`/listing-details-v1/${item.id}`}>{item.title}</Link>
            </h4>
            <p>
              <span className="flaticon-placeholder"></span>
              {item.location}
            </p>
          </div>
          {/* End .tc_content */}
        </div>
        {/* End .details */}
      </div>
    </div>
  ));

  return (
    <>
      <Slider {...settings} arrows={false}>
        {content}
      </Slider>
    </>
  );
};

export default FeaturedProperties;
