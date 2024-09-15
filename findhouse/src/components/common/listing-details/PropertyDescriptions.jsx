import { useState } from "react";

const PropertyDescriptions = ({ data }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleShowMore = () => {
    setShowFullDescription(!showFullDescription);
  };
  const shortDescription = data.description.substring(0, 50) + "...";
  return (
    <>
      <p className="mb25" style={{ whiteSpace: 'pre-wrap' }}>
        {showFullDescription ? data.description : shortDescription}
      </p>
      {showFullDescription && (
        
        <div className="collapse" id="collapseExample">
          <div >
          {data.description &&
            data.description.split('\n').map((line, index) => (
              <p key={index}  style={{ marginBottom: '1em' }}>
                {line}
              </p>
            ))}
          </div>
        </div>
      )}
      <p className="overlay_close">
        <a
          className="text-thm fz14"
          data-bs-toggle="collapse"
          href="#collapseExample"
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
          onClick={handleShowMore}
        >
          看更多 <span className="flaticon-download-1 fz12"></span>
        </a>
      </p>
    </>
  );
};

export default PropertyDescriptions;
