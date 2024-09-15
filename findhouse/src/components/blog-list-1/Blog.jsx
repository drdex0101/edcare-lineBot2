import Link from "next/link";
import blogContent from "../../data/blogs";
import Image from "next/image";

const Blog = () => {
  return (
    <>
      {blogContent.slice(0, 3).map((item) => (
        <div className="for_blog feat_property" key={item.id}>
          <div className="thumb">
            <a href={`/blog-details/${item.id}`} target="_blank" rel="noopener noreferrer">
              <Image
                width={731}
                height={438}
                priority
                className="img-whp cover w-100"
                src={item.img}
                alt={item.img}
              />
            </a>
            <div className="blog_tag">{item.postMeta}</div>
          </div>
          {/* End .thumb */}

          <div className="details">
            <div className="tc_content">
              <h4 className="mb15">
                <a href={`/blog-details/${item.id}`} target="_blank" rel="noopener noreferrer">{item.title}</a>
              </h4>
              <p>{item.postDescriptions.slice(0, 285)}</p>
            </div>
            {/* End .tc_content */}

            <div className="fp_footer">
              <ul className="fp_meta float-start mb0">
                <li className="list-inline-item">
                  <a href="#">
                    <span className="flaticon-calendar pr10"></span>{" "}
                    {item.postedDate}
                  </a>
                </li>
              </ul>
              <a className="fp_pdate float-end text-thm"  href={`/blog-details/${item.id}`}>
                看更多 <span className="flaticon-next"></span>
              </a>
            </div>
            {/* End fb_footer */}
          </div>
          {/* End .thumb */}
        </div>
      ))}
    </>
  );
};

export default Blog;
