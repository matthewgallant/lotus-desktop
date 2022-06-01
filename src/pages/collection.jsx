import React from "react";
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Page from "../components/page.jsx"

export default function CollectionPage() {
    const [isLoading, setIsLoading] = useState(true)
    const [collection, setCollection] = useState([])

    const onAllCheckboxChange = () => {

        // Create temp array
        let tempCollection = [...collection]

        // Toggle checkbox
        tempCollection.map(card => card.isChecked = !card.isChecked)

        setCollection(tempCollection)
    }

    const onSingleCheckboxChange = (e) => {

        // Create temp array
        let tempCollection = [...collection]

        // Get collection index
        const index = e.target.dataset.index

        // Toggle checkbox
        tempCollection[index].isChecked = !tempCollection[index].isChecked
        
        setCollection(tempCollection)
    }

    useEffect(() => {
        if (isLoading) {

            // Get collection and set state if it exists
            let localCollection = localStorage.getItem('collection')
            if (localCollection) {

                // Convert JSON string to actual JSON
                localCollection = JSON.parse(localCollection)

                // Uncheck all checkboxes
                localCollection.map(card => card.isChecked = false)

                setCollection(localCollection)
            }

            // Stop loading and render page
            setIsLoading(false)
        }
    })

    return (
        <Page title="Collection" isLoading={isLoading}>
            <table className="table table-dark table-striped table-hover table-borderless">
                <thead>
                    <tr>
                        <th style={{ width: '30px' }}>
                            <input className="form-check-input" type="checkbox" onChange={onAllCheckboxChange} />
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
                                <Link to={`/card/${card.name}`} className="text-reset text-decoration-none fw-normal">{card.name}</Link>
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
