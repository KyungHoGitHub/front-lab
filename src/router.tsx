import {createBrowserRouter} from "react-router";
import Home from "./pages/Home.tsx";
import App from "./App.tsx";
import Login from "./pages/Login.tsx";
import LoginForm from "./features/login/components/LoginForm.tsx";
import SignupForm from "./features/signup/components/SignupForm.tsx";
import LoginSignupPage from "./pages/LoginSignupPage.tsx";
import Mypage from "./pages/Mypage.tsx";
import Usage from "./pages/Usage.tsx";
import Statistics from "./pages/Statistics.tsx";
import ProtectedRoute from "./features/contexts/components/ProtectedRoute.tsx";
import Workspace from "./pages/Workspace.tsx";
import Todo from "./pages/Todo.tsx";
import Chat from "./pages/Chat.tsx";
import Memo from "./pages/Memo.tsx";
import TodoDetail from "./pages/TodoDetail.tsx";
import ChatBox from "./features/workspace/components/ChatBox.tsx";
import Schedule from "./pages/Schedule.tsx";
import UserManagement from "./pages/UserManagement.tsx";
import AdminDashboard from "./features/admin/component/AdminDashboard.tsx";
import MenuList from "./features/admin/pages/MenuPage.tsx";
import UserPage from "./features/admin/pages/UserPage.tsx";
import Notice from "./pages/Notice.tsx";
import DashBoard from "./features/admin/pages/DashBoard.tsx";
import Gant from "./pages/Gant.tsx";
import Lab from "@/pages/Lab.tsx";
import FilePage from "@/features/lab/components/FiePage.tsx";
import MailPage from "@/features/lab/components/MailPage.tsx";
import TokenSettingPage from "@/features/admin/pages/TokenSettingPage.tsx";

// createBrowserRouter : react-router 라이브러리 제공 API
/*
path : 라우팅 경로 (예 : ' /login')

* */
export const router = createBrowserRouter([
    // {
    //     path: '/login',
    //     element: <Login/>
    // },
    {
        path: '/login',
        element: <LoginSignupPage formComponent={<LoginForm title="로그인"/>}/>
    },
    {
        path: '/signup',
        element: <LoginSignupPage formComponent={<SignupForm title="Sign Up"/>}/>
    },
    {
        element: <ProtectedRoute allowesRoles={["user", "admin"]}/>,
        children: [
            {
                path: '/',
                element: <App/>,
                children: [
                    {
                        index: true, // 인덱스 어디에 사용되는 값인지 확인
                        path: 'home',
                        element: <Home/>,
                    },
                    {
                        path: 'workspace',
                        element: <Workspace/>,
                        children: [
                            {index: true, element: <Todo/>}, // 기본 경로: /workspace -> Todo
                            {
                                path: 'todo', element: <Todo/>,
                                children: [{
                                    path: 'detail/:idx', element: <TodoDetail/>,
                                }]
                            },
                            {
                                path: 'chat', element: <Chat/>,
                                children: [{
                                    path: ':userId', element: <ChatBox/>,
                                }]
                            },
                            {path: 'memo', element: <Memo/>},
                            {path: 'gant', element: <Gant/>},
                        ],
                    },
                    {
                        path: 'schedule',
                        element: <Schedule/>,
                    },
                    {
                        path: 'notice',
                        element: <Notice/>,
                    },
                    {
                        path: 'lab',
                        element: <Lab/>,
                        children: [
                            {path: 'file', element: <FilePage/>},
                            {path: 'mail', element: <MailPage/>},
                        ]
                    },
                    {
                        index: true,
                        path: 'mypage',
                        element: <Mypage/>,
                    },
                ]
            }
        ]
    },
    {
        path: "admin",
        element: <ProtectedRoute allowesRoles={["admin"]}/>,
        children: [
            {
                path: "",
                element: <AdminDashboard/>,
                children: [
                    {
                        path: '',
                        element: <UserManagement/>,
                        children: [
                            {
                                path: 'user-list',
                                element: <UserPage/>
                            },
                            {
                                path: 'menu-list',
                                element: <MenuList/>
                            },
                            {
                                path: 'dashboard',
                                element: <DashBoard/>
                            },
                            {
                                path: 'token-setting',
                                element: <TokenSettingPage/>
                            },
                        ]
                    },
                ],
            },
        ],
    },
    {
        path: '*',
        element: <div>not foud 404</div>
    }
])