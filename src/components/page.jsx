import React from "react"
import { useNavigate } from "react-router-dom"
import { Spinner } from "react-bootstrap"
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons"

import Sidebar from "./sidebar.jsx"
import SearchField from "./searchField.jsx";

export default function Page(props) {
    const navigate = useNavigate()
    const { buttons = [] } = props

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
                        <h2 className="mb-0 ms-3">{props.title}</h2>
                    </div>
                    <div className="d-flex">
                        {buttons.map((button, index) => 
                            <div className="me-2" key={index}>
                                {button}
                            </div>
                        )}
                        <SearchField />
                    </div>
                </div>
                <div className={"Page__Content " + (!props.noPadding && "Page__Content--Padded")}>
                    {props.isLoading ? <div className="d-flex align-items-center justify-content-center h-100"><Spinner animation="border" variant="primary"></Spinner></div> : props.children}
                </div>
            </div>
        </div>
    );
}
