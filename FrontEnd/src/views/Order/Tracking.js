import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from 'react';
import { getOrderByTrackingId } from "api/orderApi";
import { useParams } from 'react-router-dom';
import { orderInfo } from "objectInfo/orderInfo";
import { Stepper, Step, StepLabel, Paper } from '@mui/material';
import { Typography } from "antd";
import { DateTimeDisplay_1, formatNumberWithCommas } from "utils/commonFunction";


function Tracking() {

  const [order, setOrder] = useState(orderInfo)
  const allcodes = useSelector(state => state.AllcodeReducer.data);
  const reloadTrackingOrder = useSelector(state => state.gShare.reloadTrackingOrder);
  const [settle_Types, setSettle_Types] = useState([])
  const [order_statuss, setOrder_statuss] = useState([])
  const { trackId } = useParams();
  const [orderStatus, setOrderStatus] = useState([])


  useEffect(() => {
    let ac_set_type = allcodes.filter(item => item.cdName == 'ORDER' && item.cdType == 'SETTLE_TYPE');
    if (ac_set_type)
      setSettle_Types(ac_set_type);

    let order_statuss = allcodes
      .filter(item => item.cdName == 'ORDER' && item.cdType == 'STATUS')
      .sort((a, b) => a.lstodr - b.lstodr);

    console.log(`orderStatus=${JSON.stringify(order_statuss)}`);


    if (order_statuss)
      setOrder_statuss(order_statuss)

  }, [allcodes]);

  useEffect(() => {
    getTrackingOrder()
  }, [trackId, reloadTrackingOrder]);

  const getTrackingOrder = async () => {
    try {

      getOrderByTrackingId('', trackId).then((data) => {
        console.log(`run tracking=${JSON.stringify(trackId)}`);
        
        setOrder(data);
      }).catch((error) => {
        console.error("Error:", error);
      });
    }
    catch (error) {
      console.error(error);
    }
  }


  return (
    <>
      <div className="maincontainer">
        <div className="container">
          <div className="py-5 text-center">
            <h2>THEO DÕI ĐƠN HÀNG (MÃ ĐƠN {order.order_Id})</h2>
          </div>

          <div className="row">
            <Paper elevation={3} style={{ padding: '20px', margin: '20px auto' }}>
              <Typography variant="h5"></Typography>
              <Stepper activeStep={order_statuss.findIndex(item => item.cdVal === order.order_Status)} alternativeLabel>
                {order_statuss && Array.isArray(order_statuss) && order_statuss.map((type) => (
                  <Step key={type.cdVal} style={{ width: '175px' }}>
                    <StepLabel>{type.content}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Paper>
          </div>

          <div className="row" width="92%">

            <table className="table" style={{ border: '2px solid', margin: '20px 20px 30px 20px' }}>
              <tbody>
                {order && order.orderTrackings && Array.isArray(order.orderTrackings)
                  && order.orderTrackings.map((trackDetail) => {
                    return (
                      <tr key={trackDetail.update_Status_Date}>
                        <td className="col-4" style={{ borderRight: '2px solid' }}>{DateTimeDisplay_1(trackDetail.update_Status_Date)}</td>
                        <td className="col-8">{trackDetail.step_Text}</td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>

          <div className="row">
            <div className="col-md-5 order-md-2 mb-4">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">Thông tin giỏ hàng</span>
                <span className="badge badge-secondary badge-pill">3</span>
              </h4>
              <ul className="list-group mb-3">
                {order && order.orderDetails && Array.isArray(order.orderDetails)
                  && order.orderDetails.map((product) => {
                    return (
                      <div key={product.productId} className='row no-gutters'>
                        <div className='col-md-4'>
                          <img src={product.img1path} alt={product.img1} style={{ width: '100%', height: '69px' }} />
                        </div>
                        <div className='col-md-8'>
                          <li className="list-group-item d-flex justify-content-between lh-condensed">
                            <div>
                              <h6 className="my-0">{`${product.productName} (x ${product.quantity})`}</h6>
                              <small className="text-muted">Brief </small>
                            </div>
                            <span className="text-muted">{formatNumberWithCommas(product.price)} VNĐ</span>
                          </li>
                        </div>
                      </div>
                    );
                  })}

                <li className="list-group-item d-flex justify-content-between bg-light no-gutters">
                  <div className="text-success">
                    <h6 className="my-0">Mã giảm giá</h6>
                    <small></small>
                  </div>
                  <span className="text-success"></span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Tổng tiền: </span>
                  <strong>{formatNumberWithCommas(order.total_Order_Value)} VNĐ</strong>
                </li>
              </ul>
              {/* 
              <form className="card p-2">
                <div className="input-group">
                  <input type="text" className="form-control" placeholder="Nhập mã giảm giá" />
                  <div className="input-group-append">
                    <button type="button" className="btn btn-secondary">Áp dụng</button>
                  </div>
                </div>
              </form> */}
            </div>
            <div className="col-md-7 order-md-1">
              <h4 className="mb-3">Thông tin khách hàng</h4>
              <form className="needs-validation" noValidate>
                <div className="mb-3">
                  <label htmlFor="customerName">Họ tên</label>
                  <input type="text" className="form-control" id="customerName" value={order && order.customer_Name} readOnly={true} />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">

                    <label htmlFor="address">Địa chỉ nhận hàng</label>
                    <input type="text" className="form-control" id="address" value={order && order.address} readOnly={true} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="address">Số điện thoại</label>
                    <input type="text" className="form-control" id="address" value={order && order.phone} readOnly={true} />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-5 mb-3">
                    <label htmlFor="country">Thành phố</label>
                    <input type="text" className="form-control" id="country" value={order && order.city} readOnly={true} />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label htmlFor="state">Tỉnh</label>
                    <input type="text" className="form-control" id="zip" value={order && order.district} readOnly={true} />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="zip">Huyện/Xã</label>
                    <input type="text" className="form-control" id="zip" value={order && order.province} readOnly={true} />
                  </div>
                </div>

                <hr className="mb-4" />

                <h4 className="mb-3">Phương thức thanh toán</h4>

                <div className="d-block my-3">
                  {settle_Types !== undefined && settle_Types !== null && Array.isArray(settle_Types)
                    && settle_Types.map((type) => {
                      return (
                        <div key={type.cdVal} className="custom-control custom-radio">
                          <input id="credit" name="paymentMethod" type="radio" className="custom-control-input"
                            defaultChecked={type ?? type.cdVal == order.settle_Type ? true : false} disabled={true} />
                          <label className="custom-control-label" htmlFor="credit">{type.content}</label>
                        </div>
                      );
                    })}
                </div>
                <hr className="mb-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default Tracking;