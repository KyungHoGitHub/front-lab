import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {RouterProvider} from "react-router/dom";
import {router} from "./router.tsx";
import './App.css';
import i18n from './i18n.ts';
import {I18nextProvider} from "react-i18next";
import AuthProvider from "./features/contexts/components/AuthProvider.tsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')!).render(
    <I18nextProvider i18n={i18n}>
        <AuthProvider>
            <RouterProvider router={router}/>
            <ToastContainer position="top-center"
                            autoClose={3000}
                            hideProgressBar={false}
                            newestOnTop
                            closeOnClick
                            pauseOnHover
                            draggable
                            theme="light"/>
        </AuthProvider>
    </I18nextProvider>
)
