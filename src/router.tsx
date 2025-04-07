import {createBrowserRouter} from "react-router";
import Home from "./pages/Home.tsx";
import App from "./App.tsx";
import Login from "./pages/Login.tsx";
import LoginForm from "./features/login/components/LoginForm.tsx";
import SignupForm from "./features/signup/components/SignupForm.tsx";
import LoginSignupPage from "./pages/LoginSignupPage.tsx";
import Mypage from "./pages/Mypage.tsx";

export const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/login',
        element: <LoginSignupPage formComponent={<LoginForm title="로그인"/>}/>
    },
    {
        path: '/signup',
        element: <LoginSignupPage formComponent={<SignupForm title="회원가입"/>}/>
    },
    {
    path: '/',
        element: <App/>,
        children : [
            {
                index: true,
                path:'test',
                element: <Home/>,
            },
            {
                index: true,
                path:'mypage',
                element: <Mypage/>,
            },
        ]
    },
    {
        path: '*',
        element: <div>not foud 404</div>
    }
])