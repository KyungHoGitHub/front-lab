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
import SignupPageWrapper from "@/pages/SignupPageWrapper.tsx";
import LoginPageWrapper from "@/pages/LoginPageWrapper.tsx";

export const router = createBrowserRouter([
    {
        path: '/login',
        Component: LoginPageWrapper,
    },
    {
        path: '/signup',
        Component: SignupPageWrapper,
    },
    {
        loader : ()=>({allowedRoles : ["user", "admin"]}),
        Component : ProtectedRoute,
        children: [
            {
                path: '/',
                Component: App,
                children: [
                    {
                      // 인덱스 어디에 사용되는 값인지 확인
                        path: 'home',
                        Component: Home,
                    },
                    {
                        path: 'workspace',
                        Component: Workspace,
                        children: [
                            {index: true, Component: Todo}, // 기본 경로: /workspace -> Todo
                            {
                                path: 'todo', Component: Todo,
                                children: [{
                                    path: 'detail/:idx', Component: TodoDetail,
                                }]
                            },
                            {
                                path: 'chat', Component: Chat,
                                children: [{
                                    path: ':userId', Component: ChatBox,
                                }]
                            },
                            {path: 'memo', Component: Memo},
                            {path: 'gant', Component: Gant},
                        ],
                    },
                    {
                        path: 'schedule',
                        Component: Schedule,
                    },
                    {
                        path: 'notice',
                        Component: Notice,
                    },
                    {
                        path: 'lab',
                        Component: Lab,
                        children: [
                            {path: 'file', Component :FilePage},
                            {path: 'mail', Component :MailPage},
                            {path: 'log-statistics', Component :LogStatistics},
                            {path: 'url-short', Component :UrlShort},
                            {path: 'ui-playground', Component :UiPlayground},
                        ]
                    },
                    {
                        index: true,
                        path: 'mypage',
                        Component: Mypage,
                    },
                ]
            }
        ]
    },
    {
        path: "admin",
        loader : ()=>({allowedRoles :  ["admin"]}),
        Component: ProtectedRoute,
        children: [
            {
                path: "",
                Component: AdminDashboard,
                children: [
                    {
                        path: '',
                        Component: UserManagement,
                        children: [
                            {
                                path: 'user-list',
                                Component: UserPage
                            },
                            {
                                path: 'menu-list',
                                Component: MenuList
                            },
                            {
                                path: 'dashboard',
                                Component: DashBoard
                            },
                            {
                                path: 'token-setting',
                                Component: TokenSettingPage
                            },
                        ]
                    },
                ],
            },
        ],
    },
    {
        path: '*',
        Component: NotFoundPage
    }
])