import React from "react";

import BackgroundImage1 from "../../assets/images/mybanner1.jpg";
import BackgroundImage2 from "../../assets/images/mybanner2.jpg";
import { Carousel } from "react-bootstrap";

function HomeBanner(props) {
  return (
    <Carousel>
      <Carousel.Item>
        <div
          className="d-block w-100 main_slider"
          style={{
            backgroundImage: `url(${BackgroundImage1})`,
          }}
        >
          <div className="container fill_height">
            <div className="row align-items-center fill_height">
              <div className="col">
                <div className="main_slider_content" data-aos="fade-right">
                  {/* <h6>Bộ sưu tập 2023</h6>
                  <h1>Giảm tới 30%</h1> 
                  <div className="red_button shop_now_button">
                    <a href="#">Mua ngay</a>
                  </div>*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div
          className="d-block w-100 main_slider"
          style={{
            backgroundImage: `url(${BackgroundImage2})`,
          }}
        >
          <div className="container fill_height">
            <div className="row align-items-center fill_height">
              <div className="col">
                <div className="main_slider_content" data-aos="fade-right">
                  {/* <h6>Bộ sưu tập 2023</h6>
                  <h1>Giảm tới 30%</h1> 
                  <div className="red_button shop_now_button">
                    <a href="#">Mua ngay</a>
                  </div>*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default HomeBanner;
