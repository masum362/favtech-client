import { createBrowserRouter } from "react-router-dom";
import App from '../App'
import Home from "../pages/home/Home";

export const router = createBrowserRouter([
    {
        path:"/",
        element:<App />,
        errorElement:<div>Erorr</div>,
        children:[
            {
                path:"/",
                element: <Home />,

            },{
                path:"/products",
                element: <div>products</div>
            }
        ]
    }
])