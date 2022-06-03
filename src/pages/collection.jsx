import React from "react";
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Trash } from "react-bootstrap-icons"

import Page from "../components/page.jsx"

export default function CollectionPage() {
    const [isLoading, setIsLoading] = useState(true)
    const [collection, setCollection] = useState([])
    const [allChecked, setAllChecked] = useState(false)
    const [showToolbar, setShowToolbar] = useState(false)

    const onAllCheckboxChange = () => {

        // Create temp array
        let tempCollection = [...collection]

        // Toggle checkbox
        tempCollection.map(card => card.isChecked = !allChecked)

        // Update select all checkbox state
        setAllChecked(!allChecked)

        // Show/hide toolbar
        setShowToolbar(!allChecked)

        // Update collection state
        setCollection(tempCollection)
    }

    const onSingleCheckboxChange = (e) => {

        // Create temp array
        let tempCollection = [...collection]

        // Get collection index
        const index = e.target.dataset.index

        // Toggle checkbox
        tempCollection[index].isChecked = !tempCollection[index].isChecked

        // Check if any checkboxes are checked
        let noneChecked = tempCollection.every((card) => {
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
        
        // Update collection state
        setCollection(tempCollection)
    }

    const deleteCards = () => {

        // Create temp array
        let tempCollection = [...collection]

        // Filter out all checked cards
        tempCollection = tempCollection.filter(card => !card.isChecked)

        // Delete from local storage
        localStorage.setItem('collection', JSON.stringify(tempCollection))

        // Check if any checkboxes are checked
        let noneChecked = tempCollection.every((card) => {
            return !card.isChecked
        })

        // Show/hide toolbar
        if (noneChecked) {
            setShowToolbar(false)
        } else {
            setShowToolbar(true)
        }

        if (tempCollection.length === 0) {
            setAllChecked(false)
        }

        // Update collection state
        setCollection(tempCollection)
    }

    useEffect(() => {
        if (isLoading) {

            // Get collection and set state if it exists
            let tempCollection = localStorage.getItem('collection')
            if (tempCollection) {

                // Convert JSON string to actual JSON
                tempCollection = JSON.parse(tempCollection)

                // Uncheck all checkboxes
                tempCollection.map(card => card.isChecked = false)

                // Update collection state
                setCollection(tempCollection)
            }

            // Stop loading and render page
            setIsLoading(false)
        }
    })

    return (
        <Page title="Collection" isLoading={isLoading} noPadding>
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
                    {collection.map((card, index) =>
                        <tr key={index}>
                            <th style={{ width: '30px' }}>
                                <input className="form-check-input" type="checkbox" data-index={index} checked={card.isChecked} onChange={onSingleCheckboxChange} />
                            </th>
                            <th>
                                <Link to={`/card/${card.name}`} className="link-secondary text-decoration-none fw-normal">{card.name}</Link>
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
