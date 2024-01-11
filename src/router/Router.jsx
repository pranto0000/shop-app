import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main.jsx";
import Home from "../pages/home/Home.jsx";
import Menu from "../pages/shop/Menu.jsx";
import SignUp from "../components/SignUp.jsx";
import PrivateRouter from "../PrivateRouter/PrivateRouter.jsx";
import UpdateProfile from "../pages/dashboard/UpdateProfile.jsx";
import CartPage from "../pages/shop/CartPage.jsx";
import DashboardLayout from "../layout/DashboardLayout.jsx";
import Dashboard from "../pages/dashboard/admin/Dashboard.jsx";
import Users from "../pages/dashboard/admin/Users.jsx";
import Login from "../components/Login.jsx";
import Payment from "../pages/shop/Payment.jsx";
import Order from "../pages/dashboard/Order.jsx";
import AddMenu from "../pages/dashboard/admin/AddMenu.jsx";
import ManageItems from "../pages/dashboard/admin/ManageItems.jsx";
import UpdateMenu from "../pages/dashboard/admin/UpdateMenu.jsx";
import ManageBookings from "../pages/dashboard/admin/ManageBookings.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu/>,
      },
      {
        path: "/order",
        element:<Order/>
      },
      {
        path: "/update-profile",
        element:<UpdateProfile/>
      },
      {
        path : "/cart-page",
        element : <CartPage/>,
      },
      {
        path: "/process-checkout",
        element: <Payment/>
      }
    ],
  },
  {
    path: "/signup",
    element:<SignUp/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  // admin routes 
  {
    path:'/dashboard',
    element:<PrivateRouter><DashboardLayout/></PrivateRouter>,
    children:[
      {
        path:'',
        element:<Dashboard/>
      },
      {
        path:'users',
        element:<Users/>
      },
      {
        path:'add-menu',
        element: <AddMenu/>
      },
      {
        path:'manage-items',
        element:<ManageItems/>
      },
      {
        path:"update-menu/:id",
        element:<UpdateMenu/>,
        loader:({params}) => fetch(`https://shop-app-0kv8.onrender.com/menu/${params.id}`)
      },
      {
        path:'manage-bookings',
        element:<ManageBookings/>,
      }
    ]
  }
]);

export default router;
