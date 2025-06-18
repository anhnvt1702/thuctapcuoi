import React, { Component } from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import BaseLayout from "../layouts/BaseLayout";

// Route Views
import Home from "../views/Home/HomeContainer";
import SingleProductContainer from "../views/Product/SingleProductContainer";
import CategoryContainer from "../views/Category/CategoryContainer";
import Category from "../views/Category/Category";
import Checkout from "views/Order/CheckOut";
import Tracking from "views/Order/Tracking";
import ProductDetail from "views/Product/ProductDetail";
import Account from "views/Account/Account";

var routes = [
  {
    path: "/",
    exact: true,
    layout: BaseLayout,
    component: Home,
  },
  {
    path: "/trang-chu",
    exact: true,
    layout: BaseLayout,
    component: Home,
  },

  {
    path: "/trang-chu/san-pham/:productId",
    layout: BaseLayout,
    component: ProductDetail,
  },
  {
    path: "/trang-chu/danh-muc/:categoryId",
    layout: BaseLayout,
    component: Category,
  },
  {
    path: "/trang-chu/check-out",
    layout: BaseLayout,
    exact: true,
    component: Checkout,
  },
  {
    path: "/trang-chu/tracking-order/:trackId",
    layout: BaseLayout,
    exact: true,
    component: Tracking,
  },
  {
    path: "/trang-chu/tai-khoan/:accountId",
    layout: BaseLayout,
    exact: true,
    component: Account,
  },
];

export default routes;
