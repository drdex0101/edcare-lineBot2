import agentsTeam from "../../data/agents";
import Slider from "react-slick";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import Modal from 'react-modal';

const Team = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);

  const toggleDetails = (agent) => {
    if (agent) {
      setSelectedAgent(agent);
    } else {
      setSelectedAgent(null);
    }
    setShowDetails(!showDetails);
  };

  const settings = {
    dots: false,
    arrows: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    speed: 1200,
    draggable: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },

      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <Slider {...settings} arrows={true}>
        {agentsTeam.slice(0, 6).map((item) => (
          <div className="item" key={item.id} onClick={() => toggleDetails(item)}>
            <div className="team_member">
              <div className="thumb">
                <Image
                  width={245}
                  height={307}
                  className="img-fluid w100 h-100 cover"
                  src={item.img}
                  alt="5.jpg"
                />
                <div className="overylay">
                  <ul className="social_icon">
                    {item.socialList.map((social, i) => (
                      <li className="list-inline-item" key={i}>
                        <a
                          href={social.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className={`fa ${social.icon}`}></i>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* End .thumb */}

              <div className="details">
                <h4>
                  {" "}
                  {item.name}
                </h4>
                <p>{item.type}</p>
              </div>
              {/* End .details */}
            </div>
          </div>
        ))}
      </Slider>
        {selectedAgent && showDetails && (
          <>
            <div className="detailsOverlay">
                  <div className="feat_property list style2 agent align-items-center">
                  <div className="thumb modalImage">
                      <Image
                        width={286}
                        height={220}
                        className="img-whp w-100 h-100 cover"
                        src={selectedAgent?.img}
                        alt={selectedAgent?.img}
                      />
                      <div className="thmb_cntnt">
                        <ul className="tag mb0">
                          <li className="list-inline-item dn"></li>
                          <li className="list-inline-item">
                            <a href="#">{selectedAgent?.noOfListings} Listings</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    {/* End .thumb */}

                    <div className="details">
                      <div className="tc_content">
                        <h4>{selectedAgent?.name}</h4>
                        <p className="text-thm">{selectedAgent?.type}</p>
                        <ul className="prop_details mb0">
                          <li>
                            <a href="#">{selectedAgent?.num1}</a>
                          </li>
                          <li>
                            <a href="#">{selectedAgent?.num2}</a>
                          </li>
                          <li>
                          <a href={`tel:${selectedAgent?.mobile}`}>手機: {selectedAgent?.mobile}</a>
                          </li>
                          <li>
                          <a href={`mailto:${selectedAgent?.email}`}>Email: {selectedAgent?.email}</a>
                          </li>
                          <li>
                            <a href={selectedAgent?.line}>
                              
                                <Image 
                                    src="/assets/images/team/line.png" // 替換成你的圖片路徑
                                    alt="Line Link" 
                                    width={50} // 原始宽度
                                    height={50} // 原始高度，根据宽高比来设置
                                />
                            </a>
                        </li>
                        </ul>
                      </div>
                      {/* End .tc_content */}

                      {/* End .fp_footer */}
                    </div>
                  </div>
                  {/* End .feat_property */}
                  <button onClick={() => toggleDetails()}>Close</button>
                </div>
                {/* End .col-12 */}
            </>
        )}
    </>
  );
};

export default Team;
