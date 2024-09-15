const WhyChoose = ({ style = "" }) => {
  const whyCooseContent = [
    {
      id: 1,
      icon: "/assets/images/icon/icon-02.svg",
      title: "建築代銷",
      descriptions: `從建築規劃到銷售全程參與，全方位保障您的購屋權益．`,
    },
    {
      id: 2,
      icon: "/assets/images/icon/icon-03.svg",
      title: "土地開發",
      descriptions: `協助您整合，買賣等相關業務，創造土地最大價值．`,
    },
    {
      id: 3,
      icon: "/assets/images/icon/icon-04.svg",
      title: "土地房屋仲介",
      descriptions: `幫助您房屋買賣精準分析，滿足需求，達到最理想的成交．`,
    },{
      id: 3,
      icon: "/assets/images/icon/icon-05.svg",
      title: "法規稅務諮詢",
      descriptions: `用最專業的知識，為您解答有關房產的疑難雜症．`,
    },
  ];

  return (
    <>
      {whyCooseContent.map((item) => (
        <div className="col-md-6 col-lg-3 col-xl-3" key={item.id}>
          <div className={`why_chose_us ${style}`}>
            <div className="icon">
            <img src={item.icon} alt={item.title} />
            </div>
            <div className="details">
              <h4>{item.title}</h4>
              <p>{item.descriptions}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default WhyChoose;
