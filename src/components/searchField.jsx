import React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

export default function SearchField() {
    const [searchQuery, setSearchQuery] = useState('')
    const [scryfallSuggestions, setScryfallSuggestions] = useState([])
    const [activeSuggestion, setActiveSuggestion] = useState(0)

    const onChange = (e) => {
        setSearchQuery(e.target.value)
        requestScryfallSuggestions(e.target.value)
    }

    const onKeyDown = (e) => {
        switch (e.keyCode) {
            case 38:
                setActiveSuggestion(activeSuggestion - 1)
                break;
            case 40:
                setActiveSuggestion(activeSuggestion + 1)
                break;
        }
    }

    const onBlur = () => {
        setScryfallSuggestions([])
    }

    const onSubmit = (e) => {
        e.preventDefault()
        console.log('Submitting Search...')
    }

    const requestScryfallSuggestions = (query) => {
        if (query.length >= 2) {
            axios.get('https://api.scryfall.com/cards/autocomplete',
                { params: { q: query }
            }).then(res => {
                if (res.data.data.length > 0) {
                    setScryfallSuggestions(res.data.data.slice(0, 4))
                } else {
                    setScryfallSuggestions([])
                }
            })
            .catch(function () {
                console.log("Could not contact Scryfall's API!")
            })
        } else {
            setScryfallSuggestions([])
        }
    }

    return (
        <form autoComplete="off" onSubmit={onSubmit} className="Search__Form">
            <input
                type="text"
                name="search"
                id="search"
                className={"Search form-control" + (scryfallSuggestions.length > 0 ? " Search--Open" : '')}
                placeholder="Search for any card"
                spellCheck="false"
                onChange={onChange}
                onKeyDown={onKeyDown}
                onBlur={onBlur} />
            <div className="Search__Suggestions">
                {scryfallSuggestions.map((suggestion, index) => 
                    <div key={index}>
                        <Link to="/" className={"Search__Suggestion" + (index == activeSuggestion ? " Search__Active" : '')}>
                            {suggestion}
                        </Link>
                    </div>
                )}
            </div>
        </form>
    );
}
