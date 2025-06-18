import React, { useState, useEffect } from "react";
import SingleProduct from "../../components/Products/SingleProduct";
import Auth from "../../modules/Auth";
import LoginRegister from "../../components/LoginRegisterModal";
import Filter from "./components/Filter";
import { useParams, useLocation } from "react-router-dom";
import { getProductsByCategory } from "redux/actions/productAction";
import { getProductsByCategoryApi } from "api/categoryApi";
import { postCart, addToCart } from "redux/actions/cartAction";
import Pagination from "components/Common/Pagination";
import commonData from "utils/commonData";
import { Select } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { showToast, SUCCESS, ERROR, WARNING } from "components/Common/CustomToast";


const { Option } = Select;

function Category() {
  const { categoryId } = useParams();

  const location = useLocation();
  const dispatch = useDispatch();

  const [products, setProducts] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [login, setLogin] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [listOptions, setListOptions] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [listOrderBy, setListOrderBy] = useState([]);
  const [orderBy, setOrderBy] = useState('');

  const allcodes = useSelector(state => state.AllcodeReducer.data);

  const startIndex = (currentPage - 1) * parseInt(itemsPerPage);
  const endIndex = startIndex + parseInt(itemsPerPage);

  useEffect(() => {
  if (allcodes && allcodes.length > 0) {
    let _optionRowPerPage = allcodes.filter(item => item.cdName == 'COMMON' && item.cdType == 'ROWPERPAGE');
    if (_optionRowPerPage && Array.isArray(_optionRowPerPage))
      _optionRowPerPage = _optionRowPerPage.sort((a, b) => a.lstodr - b.lstodr);

    setListOptions(_optionRowPerPage);
    setItemsPerPage(_optionRowPerPage[0]?.cdVal);

    let _listOrderBy = allcodes.filter(item => item.cdName == 'CATEGORY' && item.cdType == 'ORDERBY');
    if (_listOrderBy && Array.isArray(_listOrderBy))
      _listOrderBy = _listOrderBy.sort((a, b) => a.lstodr - b.lstodr);

    setListOrderBy(_listOrderBy);

    getProducts();
  }
}, [allcodes]);


  useEffect(()=>{
    getProducts()
  }, [orderBy])

  const getProducts = () => {
    try {
      console.log(`categoryId=${JSON.stringify(categoryId)}`);
      if (!products) {
        var params = {
          categoryId: categoryId ? categoryId : 0,
          p_order_by: orderBy,
        }

        getProductsByCategoryApi(params)
        .then((data) => {
          setAllProducts(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      }
      
      
    } catch (error) {
      console.error(error)
    }
  }


  const showHideModal = () => {
    setModalShow(false);
  };

  const loginclicked = () => {
    setModalShow(true);
    setLogin(true);
  };

  const registerclicked = () => {
    setModalShow(true);
    setLogin(false);
  };

  const addToBag = (product) => {
    // if (
    //   Auth.getUserDetails() !== undefined &&
    //   Auth.getUserDetails() !== null
    //   //&& Auth.getToken() !== undefined
    // ) {
    //   let cart = postCart(product);
    //   cart.then((res) => {
    //     console.log(res);
    //   });
    // } else {
    //use cart redux
    dispatch(addToCart(product))
    showToast('Thêm vào giỏ hàng thành công', SUCCESS);
    // }
  };

  const handleOptionClick = (value) => {
    setItemsPerPage(value);
  };

  const handlePageChange = (value) => {
    setCurrentPage(value);
  }

  return (
    <div className="container product_section_container">
      <div className="row">
        <div className="col product_section clearfix">
          <div className="breadcrumbs d-flex flex-row align-items-center">
            <ul>
              <li>
                <a href="/">Trang chủ</a>
              </li>
              <li className="active">
                <a href="/">
                  <i className="fa fa-angle-right" aria-hidden="true"></i>
                  {location.pathname.split("/")[2]}
                </a>
              </li>
              <li className="active">
                <a href="#">
                  <i className="fa fa-angle-right" aria-hidden="true"></i>
                  {location.pathname.split("/")[3]}
                </a>
              </li>
            </ul>
          </div>

          <div className="main_content">
            <div className="products_iso">
              <div className="sidebar">
                <Filter categoryId={categoryId} />
              </div>
              <div className="row">
                <div className="col">
                  <div className="product_sorting_container product_sorting_container_top">
                    <ul className="product_sorting">
                      <li>
                        <span className="type_sorting_text">Sắp xếp</span>
                        <i className="fa fa-angle-down"></i>
                        <ul className="sorting_type">
                          {
                            listOrderBy && Array.isArray(listOrderBy) && listOrderBy.length > 0 && listOrderBy.map((item, index) => {
                              console.log('render product:', item); 
                              return (
                                <li key={item.cdVal}
                                  className="type_sorting_btn"
                                  onClick={() => setOrderBy((item.cdVal || ""))}
                                >
                                  <span>{item.content}</span>
                                </li>
                              )
                            })
                          }
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="row">
                
                {allProducts && Array.isArray(allProducts) && allProducts.length > 0 ? allProducts.slice(startIndex, endIndex).map((item, index) => {
                  console.log('render product:', item);                  
                  return (
                    <div
                      className="col-lg-3 col-sm-6"
                      key={index}
                      data-aos="zoom-in"
                    >
                      <SingleProduct
                        productItem={item}
                        addToBag={() => { addToBag(item) }}
                      />
                    </div>
                  );
                }) : "Không có dữ liệu"}


              </div>
              {
                allProducts && allProducts.length > 0 && (
                  <div className="row">
                    <div className="product_sorting_container product_sorting_container_bottom clearfix" style={{ width: "100%" }}>

                      <ul className="product_sorting">
                        <li>
                          <span>Hiển thị:</span>
                          <span className="num_sorting_text">{listOptions && listOptions.length > 0 && listOptions[0].cdVal}</span>
                          <i className="fa fa-angle-down"></i>
                          <ul className="sorting_num">
                            {listOptions && Array.isArray(listOptions) && listOptions.map((item, index) => {
                              return (
                                <li className="num_sorting_btn" key={item.cdVal}>
                                  <span onClick={() => handleOptionClick(item.cdVal)}>{item.cdVal}</span>
                                </li>
                              )
                            })}
                          </ul>
                        </li>
                      </ul>
                      <span className="showing_results">{`Hiển thị ${startIndex + 1}–${endIndex <= (allProducts?.length || 0) ? (endIndex + 1) : allProducts?.length} trên ${allProducts && allProducts.length} sản phẩm`}</span>

                      <Pagination itemsPerPage={itemsPerPage} data={allProducts} onPageChange={handlePageChange} />

                    </div>
                  </div>
                )
              }


            </div>
          </div>
        </div>
      </div>
      <LoginRegister
        show={modalShow}
        login={login}
        registerclicked={() => this.registerclicked()}
        loginclicked={() => this.loginclicked()}
        onHide={() => this.showHideModal()}
      />
    </div>
  )
}
export default Category;