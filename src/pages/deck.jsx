import React from "react"
import { useParams } from "react-router-dom"

import Page from "../components/page.jsx"

export default function DeckPage() {
    let { name } = useParams()

    return (
        <Page title={name}>
            Deck Page
        </Page>
    );
}
