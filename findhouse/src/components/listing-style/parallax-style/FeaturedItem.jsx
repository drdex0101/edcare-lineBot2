import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

const FeaturedItem = ({ data }) => {
  // 从Redux store中获取筛选条件
  const { isGridOrList, featured } = useSelector(state => state.filter);

 
  return (
    <>
      {data.map(row => (
        <div
        className={`col-lg-4 ${
          isGridOrList ? "feature-list" : "" // 如果只要兩兩一列，可以直接使用 col-6
        } `}
        key={row.id}
      >
        <div
          className={`feat_property home7 style4 ${
            isGridOrList ? "d-flex align-items-center" : undefined
          }`}
        >
          <div className="thumb">
          {row.url ? (
              <Image
                width={342}
                height={220}
                className="img-whp w-100 h-100 cover"
                src={row.url }
                alt=""
              />
            ) : <Image
            width={342}
            height={220}
            className="img-whp w-100 h-100 cover"
            src={'https://res.cloudinary.com/def15n5qh/image/upload/v1698558995/fp1_qe6l3e.jpg'}
            alt=""
          />}
            <div className="thmb_cntnt">
            {row.isrecommend === '是' && (
                <ul className="tag mb0">
                  <li className="list-inline-item">
                    <a href="#">精選推薦</a>
                  </li>
                </ul>
              )}
              <Link
                href={`/listing-details-v1/${row.id}`}
                className="fp_price"
              >
                ${row.price}
              </Link>
            </div>
          </div>
          <div className="details">
            <div className="tc_content">
              <p className="text-thm">{row.type}</p>
              <h4>
                <Link href={`/listing-details-v1/${row.id}`}>
                  {row.title}
                </Link>
              </h4>
              <p>
                <span className="flaticon-placeholder"></span>
                {row.location}
              </p>
            </div>
            {/* End .tc_content */}
          </div>
        </div>
      </div>
      ))}
    </>
  );
};

export default FeaturedItem;
