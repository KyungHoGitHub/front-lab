import {createBrowserRouter} from "react-router";
import Home from "./pages/Home.tsx";
import App from "./App.tsx";
import Login from "./pages/Login.tsx";

export const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login/>
    },
    {
    path: '/',
        element: <App/>,
        children : [
            {
                index: true,
                element: <Home/>,
            }
        ]
    },
    {
        path: '/test',
        element: <App/>,
        children : [
            {
                index: true,
                element: <Home/>,
            }
        ]
    },
    {
        path: '*',
        element: <div>not foud 404</div>
    }
])