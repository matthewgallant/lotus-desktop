import React from "react";
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Page from "../components/page.jsx"

export default function CollectionPage() {
    const [isLoading, setIsLoading] = useState(true)
    const [collection, setCollection] = useState([])

    useEffect(() => {
        if (isLoading) {

            // Get collection and set state if it exists
            const localCollection = localStorage.getItem('collection')
            if (localCollection) {
                setCollection(JSON.parse(localCollection))
            }

            // Stop loading and render page
            setIsLoading(false)
        }
    })

    return (
        <Page title="Collection" isLoading={isLoading}>
            <table className="table table-dark table-striped table-hover table-borderless">
                <tbody>
                    {collection.map((card, index) =>
                        <tr key={index}>
                            <th scope="row">
                                <Link to={`/card/${card.name}`} className="text-reset text-decoration-none">{card.name}</Link>
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
