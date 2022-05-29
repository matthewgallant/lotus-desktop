import React from "react";
import Sidebar from "./sidebar.jsx";

export default function Page(props) {
    document.title = `MTG Lotus | ${props.title}`

    return (
        <div className="Page">
            <div className="Page__Sidebar">
                <Sidebar />
            </div>
            <div className="Page__Container">
                <div className="Page__Bar">
                    <h2 className="Page__Title">{props.title}</h2>
                    <input type="text" name="search" id="search" className="Page__Search form-control" placeholder="Search collection..." />
                </div>
                <div className="Page__Content">
                    {props.children}
                </div>
            </div>
        </div>
    );
}
