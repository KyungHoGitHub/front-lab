import {createBrowserRouter} from "react-router";
import Home from "./pages/Home.tsx";
import App from "./App.tsx";
import Login from "./pages/Login.tsx";
import AuthLayout from "./shared/component/layout/template/authLayout.tsx";
import LoginForm from "./features/login/components/LoginForm.tsx";
import SignupForm from "./features/signup/components/SignupForm.tsx";

export const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/test/login',
        element: <AuthLayout formComponent={<LoginForm title="로그인"/>}/>
    },
    {
        path: '/test/signup',
        element: <AuthLayout formComponent={<SignupForm title="회원가입"/>}/>
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