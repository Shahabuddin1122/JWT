import React from "react";
import { Route,Routes } from "react-router";
import Login from "./login"
import Landing from "./Landing_page"
const Routing = ()=>{
    return (
        <>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/landing" element={<Landing/>} />
            </Routes>

        </>
    )
}
export default Routing;