import React from "react"
import { useNavigate } from "react-router-dom"

import Sidebar from "./sidebar.jsx"
import Spinner from "./spinner.jsx"
import SearchField from "./searchField.jsx";

export default function Page(props) {
    const navigate = useNavigate()

    document.title = `Lotus | ${props.title}`

    return (
        <div className="Page">
            <div className="Page__Sidebar">
                <Sidebar />
            </div>
            <div className="Page__Container">
                <div className="Page__Bar">
                    <div>
                        <button onClick={() => navigate(-1)} className="bg-transparent border-0 text-light fs-4">
                            <i className="bi bi-chevron-left"></i>
                        </button>
                        <button onClick={() => navigate(1)} className="bg-transparent border-0 text-light fs-4">
                            <i className="bi bi-chevron-right"></i>
                        </button>
                    </div>
                    <div>
                        <SearchField />
                    </div>
                </div>
                <div className={"Page__Content " + (!props.noPadding && "Page__Content--Padded")}>
                    {props.isLoading ? <Spinner /> : props.children}
                </div>
            </div>
        </div>
    );
}
