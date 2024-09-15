import Link from "next/link";
import Slider from "react-slick";

const HeroSlider = () => {
  const settings = {
    dots: false,
    arrow: true,
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
  };
  const sliderContent = [
    {
      id: 1,
      bgImage: "slidebg-4",
      price: "13000",
      title: "幸福菁英匯",
      itemDetails: [
        { name: "Beds", number: "4" },
        { name: "Baths", number: "2" },
        { name: "SqFt", number: "5280" },
      ],
    },
    {
      id: 2,
      bgImage: "slidebg-5",
      price: "12000",
      title: "Luxury Family Home",
      itemDetails: [
        { name: "Beds", number: "4" },
        { name: "Baths", number: "2" },
        { name: "SqFt", number: "5280" },
      ],
    },
    {
      id: 3,
      bgImage: "slidebg-6",
      price: "15000",
      title: "Single Family Villa View",
      itemDetails: [
        { name: "Beds", number: "4" },
        { name: "Baths", number: "2" },
        { name: "SqFt", number: "5280" },
      ],
    },
  ];

  return (
    <Slider {...settings} arrows={true}>
      {sliderContent.map((item) => (
        <div
          className={`slide slide-one d-flex align-items-center ${item.bgImage}`}
          style={{ height: "620px" }}
          key={item.id}
        >
          <div className="container">
            <div className="home-content position-relative text-center p0">
              <ul className="prop_details ">
                {item.itemDetails.map((val, i) => (
                  <li className="list-inline-item" key={i}>
                    <a href="#">
                    </a>
                  </li>
                ))}
              </ul>
              <div className="active">
                <Link href="/blog-list-2" className="banner-btn">
                  立即預約
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default HeroSlider;
