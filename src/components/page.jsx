import React from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons"

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
                    <div className="d-flex">
                        <button onClick={() => navigate(-1)} className="bg-transparent border-0 text-light fs-4 d-flex align-items-center">
                            <ChevronLeft />
                        </button>
                        <button onClick={() => navigate(1)} className="bg-transparent border-0 text-light fs-4 d-flex align-items-center">
                            <ChevronRight />
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
