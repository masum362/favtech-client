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
import AllProducts from "../pages/allProducts/AllProducts";
import UpdateProduct from "../pages/updateProduct/UpdateProduct";
import AddCoupon from "../pages/coupons/AddCoupon";
import UpdateCoupon from "../pages/coupons/UpdateCoupon";
import ErrorPage from "../components/error/ErrorPage";

const token = localStorage.getItem('access-token')

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,

            }, {
                path: "/products",
                element: <AllProducts />
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
                path: "/user/update/:id",
                loader: ({ params }) => fetch(`${import.meta.env.VITE_BACKEND_URL}/product/${params.id}`, {
                    method: "GET",
                    headers: {
                        authorization: `Bearer ${token}`,
                    }
                }),
                element: <SideBar><UpdateProduct /></SideBar>
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
            {
                path: "/admin/add/coupon",
                element: <SideBar><AddCoupon></AddCoupon></SideBar>
            },
            {
                path: "/admin/update/coupon/:id",
                loader: ({ params }) => fetch(`${import.meta.env.VITE_BACKEND_URL}/coupon/${params.id}`, {
                    method: "GET",
                    headers: {
                        authorization: `Bearer ${token}`,
                    }
                }),
                element: <SideBar><UpdateCoupon></UpdateCoupon></SideBar>
            },
        ]
    },
])