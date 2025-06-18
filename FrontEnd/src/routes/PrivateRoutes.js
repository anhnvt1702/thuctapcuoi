// Route Views

// Layout Types
import BaseLayout from "../layouts/BaseLayout";

import OrderHis from "views/Order/OrderHis";

var PrivateRoutes = [
  {
    path: "/trang-chu/lich-su-mua-hang",
    layout: BaseLayout,
    component: OrderHis,
  },
];

export default PrivateRoutes;
