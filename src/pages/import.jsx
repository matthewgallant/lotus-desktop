import React from "react"
import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import axios from "axios"
import toast from "react-hot-toast"

import { useDispatch } from 'react-redux'
import { addCard } from '../slices/cardsSlice'

import Page from "../components/page"

export default function ImportPage() {
    const dispatch = useDispatch()
    const [cardList, setCardList] = useState()

    const handleSubmit = (e) => {
        e.preventDefault()
        const cardsToImport = cardList.split('\n')

        cardsToImport.forEach(card => {
            let cardName = card
            let cardNumber = 1

            // Check if card is formatted like: 1 Bard Class
            if (/^\d/.test(card)) {
                let cardSplit = card.split(' ')
                cardName = cardSplit.slice(1).join(' ')
                cardNumber = cardSplit[0]
            }

            // Get and save card data
            axios.get('https://api.scryfall.com/cards/named', { params: { fuzzy: cardName }}).then(res => {
                dispatch(
                    addCard({
                        name: res.data.name,
                        mana: res.data.mana_cost,
                        price: res.data.prices.usd,
                        id: res.data.id,
                        quantity: cardNumber
                    })
                )
            })
        })

        toast.success("Import Completed!")
    }

    return (
        <Page title="Import Cards">
            <div className="container">
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Enter cards to import separated by a new line below. Supports either <i><b>2 Forest</b></i> or <i><b>Bard Class</b></i> style syntax.</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Enter cards separated by new lines..."
                            rows={15}
                            value={cardList}
                            onChange={(e) => setCardList(e.target.value)} />
                    </Form.Group>
                    <Button type="submit" className="mt-2">
                        Import Cards
                    </Button>
                </Form>
            </div>
        </Page>
    );
}
