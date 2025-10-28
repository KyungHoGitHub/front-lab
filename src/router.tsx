import {createBrowserRouter} from "react-router";
import Home from "./pages/Home.tsx";
import App from "./App.tsx";
import LoginForm from "./features/login/components/LoginForm.tsx";
import SignupForm from "./features/signup/components/SignupForm.tsx";
import LoginSignupPage from "./pages/LoginSignupPage.tsx";
import Mypage from "./pages/Mypage.tsx";
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
import LogStatistics from "@/features/lab/components/LogStatistics.tsx";
import UrlShort from "@/features/lab/components/UrlShort.tsx";
import UiPlayground from "@/features/lab/components/UiPlayground.tsx";
import NotFoundPage from "@/pages/NotFoundPage.tsx";

export const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginSignupPage formComponent={<LoginForm/>}/>
    },
    {
        path: '/signup',
        element: <LoginSignupPage formComponent={<SignupForm title="Sign Up"/>}/>
    },
    {
        element: <ProtectedRoute allowedRoles={["user", "admin"]}/>,
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
                            {path: 'log-statistics', element: <LogStatistics/>},
                            {path: 'url-short', element: <UrlShort/>},
                            {path: 'ui-playground', element: <UiPlayground/>},
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
        element: <ProtectedRoute allowedRoles={["admin"]}/>,
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
        element: <NotFoundPage/>
    }
])