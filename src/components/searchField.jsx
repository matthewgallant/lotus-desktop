import React from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

export default function SearchField() {
    let navigate = useNavigate()


    const [scryfallSuggestions, setScryfallSuggestions] = useState([])
    const [activeSuggestion, setActiveSuggestion] = useState(-1)

    const onChange = (e) => {
        requestScryfallSuggestions(e.target.value)
    }

    const onKeyDown = (e) => {
        switch (e.keyCode) {
            
            // Down arrow
            case 38:
                if (activeSuggestion > 0) {
                    setActiveSuggestion(activeSuggestion - 1)
                }
                break;
            
            // Up arrow
            case 40:
                if (activeSuggestion < scryfallSuggestions.length - 1) {
                    setActiveSuggestion(activeSuggestion + 1)
                }
                break;
        }
    }

    const onBlur = (e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
        setScryfallSuggestions([])
        setActiveSuggestion(-1)
    }
    }

    const onSubmit = (e) => {
        e.preventDefault()
        
        if (activeSuggestion >= 0) {
            setScryfallSuggestions([])
            setActiveSuggestion(-1)
            navigate(`/card/${scryfallSuggestions[activeSuggestion]}`)
        }
    }

    const requestScryfallSuggestions = (query) => {

        // Only submit autocomplete request if query is at least two characters
        if (query.length > 1) {

            // Submit autocomplete request
            axios.get('https://api.scryfall.com/cards/autocomplete', { params: { q: query }}).then(res => {
                if (res.data.data.length > 0) {
                    setScryfallSuggestions(res.data.data.slice(0, 6))
                    setActiveSuggestion(-1)
                } else {
                    setScryfallSuggestions([])
                    setActiveSuggestion(-1)
                }
            }).catch(function () {
                console.log("Could not contact Scryfall's API!")
                setScryfallSuggestions([])
                setActiveSuggestion(-1)
            })
        } else {
            setScryfallSuggestions([])
            setActiveSuggestion(-1)
        }
    }

    return (
        <form autoComplete="off" onSubmit={onSubmit} onBlur={onBlur} className="Search__Form">
            <input
                type="text"
                name="search"
                id="search"
                className={"Search form-control" + (scryfallSuggestions.length > 0 ? " Search--Open" : '')}
                placeholder="Search for any card"
                spellCheck="false"
                onChange={onChange}
                onKeyDown={onKeyDown} />
            <div className="Search__Suggestions">
                {scryfallSuggestions.map((suggestion, index) => 
                    <div key={index}>
                        <Link to="/" className={"Search__Suggestion " + (index == activeSuggestion && "Search__Active")}>
                            {suggestion}
                        </Link>
                    </div>
                )}
            </div>
        </form>
    );
}
