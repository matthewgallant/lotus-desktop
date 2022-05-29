import React from "react";
import Sidebar from "./sidebar.jsx";

export default function Page(props) {
    document.title = `MTG Lotus | ${props.title}`

    return (
        <div className="Page">
            <div className="Page__Sidebar">
                <Sidebar />
            </div>
            <div className="Page__Content">
                {props.children}
            </div>
        </div>
    );
}
