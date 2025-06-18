import React from "react";
import { useSelector } from "react-redux";

function Filter({categoryId}) {
  
  const categories = useSelector(state => state.gShare.categories)

  return (
    <div className="sidebar_section">
      <div className="sidebar_title">
        <h5>Loại mũ bảo hiểm</h5>
      </div>
      <ul className="sidebar_categories">
        {categories && categories.map((ct, index) => {
          return (
            <li className={ct.category_Id == categoryId ? "active" : ""} key={ct.category_Id}> 
              <a href={`/trang-chu/danh-muc/${ct.category_Id}`}>
                <span>
                  <i className="fa fa-angle-double-right" aria-hidden="true"></i>
                </span>
                {ct.category_Name}
              </a>
            </li>
          );
        })}
        <li>
          <a href="/">Trang chủ</a>
        </li>
      </ul>
    </div>
  );
}

export default Filter;
