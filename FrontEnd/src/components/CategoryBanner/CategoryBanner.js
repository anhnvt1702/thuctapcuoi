import React from "react";
import Banner1 from "../../assets/images/mybanner2.jpg";
import Banner2 from "../../assets/images/children_helmet.jpg";
import Banner3 from "../../assets/images/mybanner1.jpg";

function CategoryBanner(props) {
  return (
    <div className="banner">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div
              className="banner_item align-items-center"
              style={{
                backgroundImage: `url(${Banner1})`
              }}
              data-aos="fade-right"
            >
              <div className="banner_category">
                <a href="/trang-chu/danh-muc/1">Mũ 3/4</a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="banner_item align-items-center"
              style={{
                backgroundImage: `url(${Banner2})`
              }}
              data-aos="fade-up"
            >
              <div className="banner_category">
                <a href="/trang-chu/danh-muc/2">Mũ nửa đầu</a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="banner_item align-items-center"
              style={{
                backgroundImage: `url(${Banner3})`
              }}
              data-aos="fade-left"
            >
              <div className="banner_category">
                <a href="/trang-chu/danh-muc/3">Mũ Fullface</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryBanner;
