import React from "react";
import BasicHeader from "./shared/component/layout/header/BasicHeader.tsx";
import {Outlet} from "react-router";
import "./App.css";


const App:React.FC =() =>{

    return(
           <div className="main-layout">
               <BasicHeader/>
               <main>
                   <Outlet/>
               </main>
           </div>
    )
}
export default App;