import Basket from "../pages/Add";
import Home from "../pages/Main/Home";
import MainRoot from "../pages/MainRoot";

export const routes = [
    {
        path:'/',
        element:<MainRoot/>,
        children:[
            {
                path:'',
                element:<Home/>
            },
            {
                path:'/basket',
                element:<Basket/>
            }
        ]

    }
]