import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import galleryContent from "../../data/gallery.js";
import Image from "next/image.js";
import React, { useState } from 'react';
const outerContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',  // 確保容器撐滿整個可用高度
};

const customContentStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
};

const titleContainerStyle = {
  marginLeft: '20px',
  textAlign: 'left', 
};

const titleStyle = {
  color: 'white',
  marginBottom: '10px',
};

const subtitleStyle = {
  color: 'white',
};

const CustomContent = ({ img, title, subtitle }) => (
  <div style={outerContainerStyle}>
    <div style={customContentStyle}>
      <img src={img} alt={title} width="752" />
      <div style={titleContainerStyle}>
        <h2 style={titleStyle}>{title}</h2>
        <p style={subtitleStyle}>{title}</p>
      </div>
    </div>
  </div>
);


const GalleryBox = () => {
  return (
    <>
      <Gallery withCaption>
        {galleryContent.map((singleItem) => (
          <div className="col-sm-6 col-md-6 col-lg-4" key={singleItem.id}>
            <div className="gallery_item">
              <Image
                width={364}
                height={218}
                className="img-fluid img-circle-rounded w100 cover"
                src={singleItem.img}
                alt="fp1.jpg"
              />
              <div className="gallery_overlay">
                <div className="icon popup-img">
                  <Item
                    original={singleItem.img}
                    thumbnail={singleItem.img}
                    content={<CustomContent img={singleItem.img} title={singleItem.title} />}
                  >
                    {({ ref, open }) => (
                      <>
                      <span 
                          className="flaticon-zoom-in"
                          role="button"
                          ref={ref}
                          onClick={open}
                      ></span>
                      </>
                    )}
                  </Item>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Gallery>
    </>
  );
};

export default GalleryBox;
