import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";

import ForgotPassword from "views/examples/Forgot.js";
import Login from "views/examples/Login.js";
import Voucher from "views/examples/Voucher.js";
import Posts from "views/examples/Posts.js";
import Location from "views/examples/Locations.js";
import User from "views/examples/Users.js";
import Details from "views/examples/Detail";
import Icons from "views/examples/Icons.js";

var routes = [
  {
    path: "/index",
    name: "Trang chủ",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "ni ni-planet text-blue",
  //   component: Icons,
  //   layout: "/admin",
  // },

  {
    path: "/posts",
    name: "Bài viết",
    icon: "ni ni-books text-red",
    component: Posts,
    layout: "/admin",
  },
  {
    path: "/locations",
    name: "Địa điểm",
    icon: "ni ni-square-pin text-yellow",
    component: Location,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "Người dùng",
    icon: "ni ni-circle-08 text-blue",
    component: User,
    layout: "/admin",
  },
  {
    path: "/voucher",
    name: "Voucher",
    icon: "ni ni-credit-card text-red",
    component: Voucher,
    layout: "/admin",
  },
  // {
  //   path: "/detail",
  //   // name: "Detail",
  //   // icon: "ni ni-credit-card text-red",
  //   component: Detail,
  //   layout: "/admin",
  // },
  {
    path: "/detail",
    
    component: Details,
    layout: "/admin",
  },
  {
    path: "/login",
    // name: "Login",
    // icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  // {
  //   path: "/forgot-password",
  //   // name: "Register",
  //   // icon: "ni ni-circle-08 text-pink",
  //   component: ForgotPassword,
  //   layout: "/auth",
  // },
];
export default routes;
