import React from "react";
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Trash } from "react-bootstrap-icons"

import Page from "../components/page.jsx"

export default function CardsPage() {
    const [isLoading, setIsLoading] = useState(true)
    const [cards, setCards] = useState([])
    const [allChecked, setAllChecked] = useState(false)
    const [showToolbar, setShowToolbar] = useState(false)

    const onAllCheckboxChange = () => {

        // Create temp array
        let tempCards = [...cards]

        // Toggle checkbox
        tempCards.map(card => card.isChecked = !allChecked)

        // Update select all checkbox state
        setAllChecked(!allChecked)

        // Show/hide toolbar
        setShowToolbar(!allChecked)

        // Update cards state
        setCards(tempCards)
    }

    const onSingleCheckboxChange = (e) => {

        // Create temp array
        let tempCards = [...cards]

        // Get cards index
        const index = e.target.dataset.index

        // Toggle checkbox
        tempCards[index].isChecked = !tempCards[index].isChecked

        // Check if any checkboxes are checked
        let noneChecked = tempCards.every((card) => {
            return !card.isChecked
        })

        // Show/hide toolbar
        if (noneChecked) {
            setShowToolbar(false)
        } else {
            setShowToolbar(true)
        }

        // Since a single box has changed we should not indicate all are checked
        setAllChecked(false)
        
        // Update cards state
        setCards(tempCards)
    }

    const deleteCards = () => {

        // Create temp array
        let tempCards = [...cards]

        // Filter out all checked cards
        tempCards = tempCards.filter(card => !card.isChecked)

        // Delete from local storage
        localStorage.setItem('cards', JSON.stringify(tempCards))

        // Check if any checkboxes are checked
        let noneChecked = tempCards.every((card) => {
            return !card.isChecked
        })

        // Show/hide toolbar
        if (noneChecked) {
            setShowToolbar(false)
        } else {
            setShowToolbar(true)
        }

        if (tempCards.length === 0) {
            setAllChecked(false)
        }

        // Update cards state
        setCards(tempCards)
    }

    useEffect(() => {
        if (isLoading) {

            // Get cards and set state if it exists
            let tempCards = localStorage.getItem('cards')
            if (tempCards) {

                // Convert JSON string to actual JSON
                tempCards = JSON.parse(tempCards)

                // Uncheck all checkboxes
                tempCards.map(card => card.isChecked = false)

                // Update cards state
                setCards(tempCards)
            }

            // Stop loading and render page
            setIsLoading(false)
        }
    })

    return (
        <Page title="Cards" isLoading={isLoading} noPadding>
            <div className="Table__Toolbar p-1 bg-warning" style={{ display: showToolbar ? 'block' : 'none' }}>
                <button className="text-danger bg-transparent border-0 d-flex align-items-center" onClick={deleteCards}>
                    <Trash className="me-1" /> Delete
                </button>
            </div>
            <table className="table table-dark table-striped table-hover table-borderless">
                <thead>
                    <tr>
                        <th style={{ width: '30px' }}>
                            <input className="form-check-input" type="checkbox" checked={allChecked} onChange={onAllCheckboxChange} />
                        </th>
                        <th>Card</th>
                        <th>Mana Cost</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {cards.map((card, index) =>
                        <tr key={index}>
                            <th style={{ width: '30px' }}>
                                <input className="form-check-input" type="checkbox" data-index={index} checked={card.isChecked} onChange={onSingleCheckboxChange} />
                            </th>
                            <th>
                                <Link to={`/cards/${card.name}`} className="link-secondary text-decoration-none fw-normal">{card.name}</Link>
                            </th>
                            <td>{card.mana_cost}</td>
                            <td>${card.prices.usd}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </Page>
    );
}
