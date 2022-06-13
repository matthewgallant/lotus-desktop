import React from "react"
import { useParams } from "react-router-dom"

import Page from "../components/page"

export default function DeckPage() {
    let { name } = useParams()

    return (
        <Page title={`${name} Deck`}>
            Deck Page
        </Page>
    );
}
