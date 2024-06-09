import { createBrowserRouter } from "react-router-dom";
import App from '../App'
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import UserAuth from "./UserAuth";
import MyProfile from "../pages/myProfile/MyProfile";
import OnlyUserAuth from "./OnlyUserAuth";
import Dashboard from "../components/dashboard/Dashboard";
import SideBar from "../components/sidebar/Sidebar";
import AddProduct from "../pages/addProduct/AddProduct";
import MyProduct from "../pages/myProduct/MyProduct";
import ModeratorAuth from "./ModeratorAuth";
import AdminAuth from "./AdminAuth";
import ProductReviews from '../pages/productReviews/ProductReviews'
import ReportedProducts from '../pages/reportedProducts/ReportedProducts'
import Statistics from '../pages/statistics/Statistics';
import Users from '../pages/users/Users';
import Coupons from '../pages/coupons/Coupons';
import ProductPage from "../pages/productPage/ProductPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <div>Erorr</div>,
        children: [
            {
                path: "/",
                element: <Home />,

            }, {
                path: "/products",
                element: <div>products</div>
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/product/:id",
                element: <UserAuth><ProductPage /></UserAuth>
            }

        ]
    }, {
        path: "/user",
        element: <OnlyUserAuth></OnlyUserAuth>,
        children: [
            {
                path: "/user/my-profile",
                element: <SideBar><MyProfile /></SideBar>
            },
            {
                path: "/user/add-product",
                element: <SideBar><AddProduct /></SideBar>
            },
            {
                path: "/user/my-products",
                element: <SideBar><MyProduct /></SideBar>
            },
        ]
    }, {
        path: "/moderator",
        element: <ModeratorAuth></ModeratorAuth>,
        children: [
            {
                path: "/moderator/product-reviews",
                element: <SideBar><ProductReviews /></SideBar>
            },
            {
                path: "/moderator/reported-contents",
                element: <SideBar><ReportedProducts /></SideBar>
            },
        ]
    },
    {
        path: "/admin",
        element: <AdminAuth></AdminAuth>,
        children: [
            {
                path: "/admin/statistics",
                element: <SideBar><Statistics></Statistics></SideBar>
            },
            {
                path: "/admin/manage-users",
                element: <SideBar><Users></Users></SideBar>
            },
            {
                path: "/admin/manage-coupons",
                element: <SideBar><Coupons></Coupons></SideBar>
            },
        ]
    },
])