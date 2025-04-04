import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {RouterProvider} from "react-router/dom";
import {router} from "./router.tsx";
import './App.css';
import i18n from './i18n.ts';
import {I18nextProvider} from "react-i18next";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <I18nextProvider i18n={i18n}>
    <RouterProvider router={router}/>
      </I18nextProvider>
  </StrictMode>,
)
