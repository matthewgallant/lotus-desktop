import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import Sidebar from "./sidebar.jsx"

export default function Page(props) {
    document.title = `Lotus | ${props.title}`

    const [searchQuery, setSearchQuery] = useState('')

    const onChange = (e) => {
        setSearchQuery((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    useEffect(() => {
        console.log(searchQuery.search.length);
        if (searchQuery.search.length >= 2) {
            axios.get('https://api.scryfall.com/cards/autocomplete', { params: { q: searchQuery.search } })
                .then(res => {
                    console.log(res.data)
                })
                .catch(function () {
                    console.log('error')
                })
        }
    })

    return (
        <div className="Page">
            <div className="Page__Sidebar">
                <Sidebar />
            </div>
            <div className="Page__Container">
                <div className="Page__Bar">
                    <h2 className="Page__Title">{props.title}</h2>
                    <form autoComplete="off">
                        <input
                            type="text"
                            name="search"
                            id="search"
                            className="Page__Search form-control"
                            placeholder="Search for any card"
                            spellCheck="false"
                            onChange={onChange} />
                    </form>
                </div>
                <div className="Page__Content">
                    {props.children}
                </div>
            </div>
        </div>
    );
}
