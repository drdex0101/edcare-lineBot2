import { useState,useRef } from "react";
import selectedFiles from "../../../utils/selectedFiles";
import Image from "next/image";
import  { PutBlobResult } from '@vercel/blob';
import agentsTeam from "../../../data/agents";
const CreateList = () => {
  const [propertySelectedImgs, setPropertySelectedImgs] = useState([]);
  const propertyTitle = useRef();
  const propertyDescription = useRef();
  const formGroupExamplePrice = useRef();
  const formGroupExampleArea = useRef();
  const propertyFeature = useRef();
  const formArea = useRef();
  const Area = useRef();
  const year = useRef();
  const ping = useRef();
  const parking = useRef();
  const waiter = useRef();
  const typeSelectRef = useRef();
  const classSelectRef = useRef();
  const isrecommendRef = useRef();
  const [isLoading, setIsLoading] = useState(false); // 加载状态
  // multiple image select
  const multipleImage = (e) => {
    // checking is same file matched with old stored array
    const isExist = propertySelectedImgs?.some((file1) =>
      selectedFiles(e)?.some((file2) => file1.name === file2.name)
    );

    if (!isExist) {
      setPropertySelectedImgs((old) => [...old, ...selectedFiles(e)]);
    } else {
      alert("You have selected one image already!");
    }
  };

  // delete image
  const deleteImage = (name) => {
    const deleted = propertySelectedImgs?.filter((file) => file.name !== name);
    setPropertySelectedImgs(deleted);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault(); // 防止默认表单提交行为
    setIsLoading(true); // 开始上传
    try {
      const response = await fetch('/api/propertiesData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          propertyTitle: propertyTitle.current.value,
            propertyDescription: propertyDescription.current.value,
            formGroupExamplePrice: formGroupExamplePrice.current.value,
            formGroupExampleArea: formGroupExampleArea.current.value,
            propertyFeature: propertyFeature.current.value,
            formArea: formArea.current.value,
            Area: Area.current.value,
            year: year.current.value,
            ping: ping.current.value,
            parking: parking.current.value,
            waiter: waiter.current.value,
            typeSelectRef: typeSelectRef.current.value,
            classSelectRef: classSelectRef.current.value,
            isrecommendRef:isrecommendRef.current.value
        }),
      });

      if (response.ok) {
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
            console.log(responseData.secure_url);
            const responsepic = await fetch('/api/propertiespicData', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                propertyTitle: propertyTitle.current.value,
                 Url: responseData.secure_url,
              }),
            })
          } catch (error) {
            console.error("Error uploading file:", error);
          }
        }
      } 
    } catch (error) {
      console.error("发生错误:", error);
      alert("提交失败，请重试。");
    }
    finally {
      setIsLoading(false); // 结束上传
    }
    alert("上傳成功");
    window.location.reload();
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="container">
      <div className="row">
      <div className="col-lg-12">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="propertyTitle">物件名稱*</label>
          <input type="text" className="form-control" id="propertyTitle" ref={propertyTitle} required/>
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-12">
        <div className="my_profile_setting_textarea">
          <label htmlFor="propertyDescription">物件介紹</label>
          <textarea
            className="form-control"
            id="propertyDescription"
            rows="7"
            ref={propertyDescription}
          ></textarea>
        </div>
      </div>
      {/* End .col */}
      
      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>種類</label>
          <select
            className="selectpicker form-select"
            data-live-search="true"
            data-width="100%"
            ref={typeSelectRef}
          >
            <option data-tokens="type1">住宅</option>
            <option data-tokens="Type2">農地</option>
            <option data-tokens="Type3">建地</option>
            <option data-tokens="Type4">其他</option>
          </select>
        </div>
      </div>

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>是否為精選物件</label>
          <select
            className="selectpicker form-select"
            data-live-search="true"
            data-width="100%"
            ref={isrecommendRef}
          >
            <option data-tokens="Y">是</option>
            <option data-tokens="N">否</option>
          </select>
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>型態/類別*</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExamplePrice"
            ref={classSelectRef}
            required
          />
        </div>
      </div>
      {/* End .col */}
      <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleArea">地點*</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleArea"
            ref={formGroupExampleArea}
            required
          />
        </div>
      </div>
      <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExamplePrice">價格*</label>
          <input
            type="number"
            className="form-control"
            id="formGroupExamplePrice"
            ref={formGroupExamplePrice}
            required
          />
        </div>
      </div>
      {/* End .col */}
      <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleArea">地坪</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleArea"
            ref={ping}
          />
        </div>
      </div>
      <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleArea">屋齡</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleArea"
            ref={year}
          />
        </div>
      </div>
      <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleArea">格局*</label>
          <input
            type="text"
            className="form-control"
            ref={formArea}
            required
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleArea">建坪</label>
          <input
            type="text"
            className="form-control"
            ref={Area}
          />
        </div>
      </div>

      <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleArea">車位</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleArea"
            ref={parking}
          />
        </div>
      </div>

      <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleArea">服務人員</label>
          <select className="form-control" id="formGroupExampleArea" ref={waiter}>
              {agentsTeam.map(agent => (
                <option key={agent.id} value={agent.name}>
                  {agent.name}
                </option>
              ))}
            </select>
        </div>
      </div>

      <div className="col-lg-12">
        <div className="my_profile_setting_textarea">
          <label htmlFor="propertyDescription">物件特色</label>
          <textarea
            className="form-control"
            id="propertyDescription"
            rows="7"
            ref={propertyFeature}
          ></textarea>
        </div>
      </div>

      <div className="col-lg-12">
        <ul className="mb-0">
          {propertySelectedImgs.length > 0
            ? propertySelectedImgs?.map((item, index) => (
                <li key={index} className="list-inline-item">
                  <div className="portfolio_item">
                    <Image
                      width={200}
                      height={200}
                      className="img-fluid cover"
                      src={URL.createObjectURL(item)}
                      alt="fp1.jpg"
                    />
                    <div
                      className="edu_stats_list"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Delete"
                      data-original-title="Delete"
                    >
                      <a onClick={() => deleteImage(item.name)}>
                        <span className="flaticon-garbage"></span>
                      </a>
                    </div>
                  </div>
                </li>
              ))
            : undefined}

          {/* End li */}
        </ul>
      </div>
      <div className="col-lg-12">
        <div className="portfolio_upload">
          <input
            type="file"
            onChange={multipleImage}
            multiple
            accept="image/png, image/gif, image/jpeg"
          />
          <div className="icon">
            <span className="flaticon-download"></span>
          </div>
          <p>物件照片上傳</p>
        </div>
      </div>
      {/* End .col */}

      <div className="col-xl-12">
        <div className="my_profile_setting_input">
          <button className="btn btn2 float-end">送出</button>
        </div>
      </div>
      </div>
      </div>
      {isLoading && (
        <div className="loading-indicator">
          <p>上傳中，請稍後...</p>
        </div>
      )}
    </form>
    
  );
};

export default CreateList;