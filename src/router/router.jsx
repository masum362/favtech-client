import { createBrowserRouter } from "react-router-dom";
import App from '../App'
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";

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
        ]
    }
])