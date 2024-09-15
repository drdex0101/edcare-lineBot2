import Image from "next/image";
import PopupVideo from "../common/PopupVideo";

const OurMission = () => {
  const missionContent = [
    {
      id: 1,
      icon: "flaticon-user",
      number: "80,123",
      meta: "Customers to date",
    },
    {
      id: 2,
      icon: "flaticon-home",
      number: "$74 Billion",
      meta: "In home sales",
    },
    {
      id: 3,
      icon: "flaticon-transfer",
      number: "$468 Million",
      meta: "In Savings",
    },
  ];

  return (
    <>
      <div className="col-lg-8 col-xl-7">
        <div className="about_content">
          <p className="large">
          以仲介+代銷兩大資源領銜業界，全面一條龍尊榮服務
          </p>
          <p>
          買屋賣屋不僅需要熱忱，更重要的是誠信務實的品格，
          丞名不動產團隊深耕房屋銷售領域已逾30年，
          有別於一般房仲，除了清楚掌握房屋時價與地段特質，
          更擁有經紀人及地政士證照，熟知建築相關法規與稅務制度，
          無論是預售屋、新成屋、中古屋，我們皆以自己要住的房子審慎對待，
          以最專業的角度分析到位，幫您找尋符合需求的物件，
          也為您充滿回憶的房子創造最滿意的價值與價格，找到新主人，
          有關房產領域的疑難雜症，也歡迎您前來訪問諮詢，
          只要是客戶的「家」事，我們都將全力協助您完善解決。
          </p>
          <p>
          丞名用在乎老朋友的真誠感情，永遠站在您這邊。
          </p>
          {/* End .ab_counting */}
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-4 col-xl-5">
        <div className="about_thumb">
          <Image
            width={461}
            height={509}
            priority
            className="img-fluid w100 cover"
            src="/assets/images/about/2.jpg"
            alt="2.jpg"
          />
        </div>
      </div>
    </>
  );
};

export default OurMission;
