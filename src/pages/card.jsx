import React from "react"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

import Page from "../components/page.jsx"

export default function CardPage() {
    let { name } = useParams()

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (isLoading) {
            axios.get('https://api.scryfall.com/cards/named', { params: { exact: name }}).then(res => {
                setIsLoading(false)
                console.log(res.data)
            }).catch(function () {
                setIsLoading(false)
                console.log("Could not contact Scryfall's API!")
            })
        }
    })

    return (
        <Page title={name} isLoading={isLoading}>
            {name} Page
        </Page>
    );
}
