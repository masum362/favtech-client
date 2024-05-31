import { createBrowserRouter } from "react-router-dom";
import App from '../App'

export const router = createBrowserRouter([
    {
        path:"/",
        element:<App />,
        errorElement:<div>Erorr</div>,
        children:[
            {
                path:"/",
                element: <div>Homepage</div>,

            },{
                path:"/products",
                element: <div>products</div>
            }
        ]
    }
])