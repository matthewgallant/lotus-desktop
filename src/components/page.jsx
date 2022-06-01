import React from "react"
import Sidebar from "./sidebar.jsx"
import Spinner from "./spinner.jsx"
import SearchField from "./searchField.jsx";

export default function Page(props) {
    document.title = `Lotus | ${props.title}`

    return (
        <div className="Page">
            <div className="Page__Sidebar">
                <Sidebar />
            </div>
            <div className="Page__Container">
                <div className="Page__Bar">
                    <h2 className="Page__Title">{props.title}</h2>
                    <SearchField />
                </div>
                <div className={"Page__Content " + (!props.noPadding && "Page__Content--Padded")}>
                    {props.isLoading ? <Spinner /> : props.children}
                </div>
            </div>
        </div>
    );
}
