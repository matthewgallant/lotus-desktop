import React from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Form, Badge } from "react-bootstrap"
import axios from "axios"
import { useSelector } from 'react-redux'

export default function SearchField() {
    let navigate = useNavigate()
    const cards = useSelector(state => state.cards.value)

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
            navigate(`/cards/${scryfallSuggestions[activeSuggestion]}`)
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
        <div>
            <Form autoComplete="off" onSubmit={onSubmit} className="position-relative">
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Search for any card"
                        spellCheck="false"
                        style={{ width: 400 }}
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                        className={scryfallSuggestions.length > 0 && 'rounded-0 rounded-top'} />
                </Form.Group>
                <Form.Group>
                    <div className="Search__Suggestions">
                        {scryfallSuggestions.map((suggestion, index) => 
                            <div key={index}>
                                <Link to={`/cards/${suggestion}`} className={"Search__Suggestion " + (index == activeSuggestion && "Search__Active")}>
                                    {suggestion}
                                    {cards.filter(card => card.name == suggestion).length > 0 ? <Badge pill bg="primary" className="ms-2">{cards.find(card => card.name == suggestion).quantity} In Collection</Badge> : null}
                                </Link>
                            </div>
                        )}
                    </div>
                </Form.Group>
            </Form>
        </div>
    );
}
