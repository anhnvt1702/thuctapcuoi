export const orderDetail = {
  order_Detail_Id: 0,
  order_Id: 0,
  order: null,
  productId: 0,
  product: null,
  quantity: 0,
  price: 0,
  productName: "",
  img1: "",
  img1_Data_64: "",
};

export const ordersTracking = {
  order_Id: 0,
  update_Status_Date: null, // DateTime -> null (hoặc new Date())
  update_By: "",
  step: "",
  step_Text: "",
  deleted: 0,
};

export const orderInfo = {
  order_Id: 0,
  customer_Id: 0,
  customer: null, // Customer object, có thể null hoặc một object tương ứng
  order_Date: null, // DateTime tương ứng có thể null hoặc Date object
  customer_Name: "",
  address: "",
  city: "",
  district: "",
  province: "",
  settle_Type: "",
  phone: "",
  total_Order_Value: 0,
  order_Status: "",
  order_Status_Text: "",
  payment: null, // Payment object, có thể null hoặc object tương ứng
  orderDetails: [], // List<OrderDetail> tương ứng array rỗng hoặc các object OrderDetail
  orderTrackings: [], // List<OrdersTracking>
  test: "",
  track_Id: "",
};

export const productInfo = {
  productId: 0, // int
  productName: "",
  description: "",
  price: 0, // decimal
  stockQuantity: 0, // int
  category_Id: 0, // int
  category_Name: "",
  img1path: "",
  created_By: "",
  modified_By: "",
  created_Date: null, // DateTime -> JS Date object hoặc null
  modified_Date: null,

  deleted: 0, // decimal
};
