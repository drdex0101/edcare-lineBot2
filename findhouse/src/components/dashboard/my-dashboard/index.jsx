


import { useState, useRef } from 'react';

const UploadForm = () => {
  const imageInputRef = useRef(null);
  const [propertySelectedImgs, setPropertySelectedImgs] = useState([]);
  const [filenames, setFilenames] = useState([]);

  const selectedFiles = (event) => {
    return Array.from(event.target.files);
  };

  const multipleImage = (e) => {
    const isExist = propertySelectedImgs?.some((file1) =>
      selectedFiles(e)?.some((file2) => file1.name === file2.name)
    );

    if (!isExist) {
      setPropertySelectedImgs((old) => [...old, ...selectedFiles(e)]);
      const fileNamesArray = selectedFiles(e).map(file => file.name);
      setFilenames(fileNamesArray);
    } else {
      alert("You have selected one image already!");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    for (let i = 0; i < propertySelectedImgs.length; i++){
      const file = propertySelectedImgs[i];

      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "cmhomes");

      try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/def15n5qh/image/upload`, {
          method: "POST",
          body: data,
        });
        const responseData = await response.json();
        console.log(responseData);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input type='file' accept="image/png, image/gif, image/jpeg" ref={imageInputRef} multiple onChange={multipleImage} />
        <ul>
          {filenames.map((name, index) => (
            <li key={index}>{name}</li>
          ))}
        </ul>
      </div>
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadForm;

