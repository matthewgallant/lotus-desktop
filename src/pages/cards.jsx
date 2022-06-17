import React from "react";
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Table, Badge } from "react-bootstrap"
import { Trash, Download } from "react-bootstrap-icons"

import { useSelector, useDispatch } from 'react-redux'
import { deleteCards } from '../slices/cardsSlice'

import Page from "../components/page"
import toast from "react-hot-toast";

export default function CardsPage() {
    const cards = useSelector(state => state.cards.value)
    const decks = useSelector(state => state.decks.value)
    const dispatch = useDispatch()

    // Table state
    const [allChecked, setAllChecked] = useState(false)
    const [showToolbar, setShowToolbar] = useState(false)
    const [checkedCards, setCheckedCards] = useState(Array(cards.length).fill(false))

    const toggleAllCheckboxes = () => {
        setCheckedCards(checkedCards.fill(!allChecked))
        setAllChecked(!allChecked)
    }

    const toggleCheckbox = (index) => {
        let tempCards = [...checkedCards]
        tempCards[index] = !tempCards[index]
        setCheckedCards(tempCards)
        setAllChecked(false)
    }

    const deleteCheckedCards = () => {
        dispatch(deleteCards(checkedCards))
        setCheckedCards(checkedCards.fill(false))
        setAllChecked(false)
    }

    const exportCheckedCards = () => {

        // Parse cards
        let cardsToExport = cards.filter((card, index) => checkedCards[index])
        cardsToExport = cardsToExport.map(card => `${card.quantity} ${card.name}`)
        cardsToExport = cardsToExport.join('\n')
        
        navigator.clipboard.writeText(cardsToExport)
        toast.success('Copied Exported Cards to Clipboard')
    }

    useEffect(() => {
        if (checkedCards.every(card => !card)) {
            setShowToolbar(false)
        } else {
            setShowToolbar(true)
        }
    })

    return (
        <Page title="My Cards" noPadding>

            {/* Cards Toolbar */}
            <div className="Table__Toolbar p-1 bg-warning" style={{ display: showToolbar ? 'flex' : 'none' }}>
                <button className="text-primary bg-transparent border-0 d-flex align-items-center" onClick={exportCheckedCards}>
                    <Download className="me-1" /> Export
                </button>
                <button className="text-danger bg-transparent border-0 d-flex align-items-center" onClick={deleteCheckedCards}>
                    <Trash className="me-1" /> Delete
                </button>
            </div>

            {/* Cards Table */}
            {cards.length > 0 ?
                <Table variant="dark" striped hover borderless>
                    <thead>
                        <tr>
                            <th style={{ width: '30px' }}>
                                <input className="form-check-input" type="checkbox" checked={allChecked} onChange={toggleAllCheckboxes} />
                            </th>
                            <th>Card</th>
                            <th>Quantity</th>
                            <th>Mana Cost</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cards.map((card, index) =>
                            <tr key={index}>
                                <th style={{ width: '30px' }}>
                                    <input className="form-check-input" type="checkbox" checked={checkedCards[index]} onChange={() => toggleCheckbox(index)} />
                                </th>
                                <th>
                                    <Link to={`/cards/${card.name}`} className="link-secondary text-decoration-none fw-normal d-flex align-items-center">
                                        {card.name}
                                        {decks.filter(deck => deck.cards.filter(deckCard => deckCard.name == card.name).length > 0).map((deck, index) =>
                                            <Badge key={index} pill bg="secondary" className="ms-2">In {deck.name} Deck</Badge>
                                        )}
                                    </Link>
                                </th>
                                <td>{card.quantity}</td>
                                <td>{card.mana}</td>
                                <td>${card.price}</td>
                            </tr>
                        )}
                    </tbody>
                </Table> :
                <div className="d-flex justify-content-center align-items-center h-100">
                    <span>
                        <b>Your collection is empty!</b> Add some cards by searching in the top-right corner.
                    </span>
                </div>
            }
        </Page>
    );
}
