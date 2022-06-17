import React from "react";
import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { Table, Badge } from "react-bootstrap"
import { Trash, Download } from "react-bootstrap-icons"
import toast from "react-hot-toast"

import { useSelector, useDispatch } from 'react-redux'
import { deleteDeckCards } from '../slices/decksSlice'

import Page from "../components/page"

export default function DecksPage() {
    let { id } = useParams()
    const dispatch = useDispatch()
    
    const cards = useSelector(state => state.cards.value)
    const deck = useSelector(state => state.decks.value[id])

    // Table state
    const [allChecked, setAllChecked] = useState(false)
    const [showToolbar, setShowToolbar] = useState(false)
    const [checkedCards, setCheckedCards] = useState(Array(deck.cards.length).fill(false))

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
        dispatch(deleteDeckCards({ deck: id, cards: checkedCards }))
        setCheckedCards(checkedCards.fill(false))
        setAllChecked(false)
    }

    const exportCheckedCards = () => {

        // Parse cards
        let cardsToExport = deck.cards.filter((card, index) => checkedCards[index])
        cardsToExport = cardsToExport.map(card => card.name)
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
        <Page title={`${deck.name} Deck`} noPadding>

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
            {deck.cards.length > 0 ?
                <Table variant="dark" striped hover borderless>
                    <thead>
                        <tr>
                            <th style={{ width: '30px' }}>
                                <input className="form-check-input" type="checkbox" checked={allChecked} onChange={toggleAllCheckboxes} />
                            </th>
                            <th>Card</th>
                            <th>Mana Cost</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deck.cards.map((card, index) =>
                            <tr key={index}>
                                <th style={{ width: '30px' }}>
                                    <input className="form-check-input" type="checkbox" checked={checkedCards[index]} onChange={() => toggleCheckbox(index)} />
                                </th>
                                <th>
                                    <Link to={`/cards/${card.name}`} className="link-secondary text-decoration-none fw-normal">
                                        {card.name}
                                        {cards.filter(collectionCard => collectionCard.name == card.name).length > 0 ? <Badge pill bg="primary" className="ms-2">{cards.find(collectionCard => collectionCard.name == card.name).quantity} In Collection</Badge> : null}
                                    </Link>
                                </th>
                                <td>{card.mana}</td>
                                <td>${card.price}</td>
                            </tr>
                        )}
                    </tbody>
                </Table> :
                <div className="d-flex justify-content-center align-items-center h-100">
                    <span>
                        <b>You don't have any cards in this deck!</b> Add some cards by searching in the top-right corner.
                    </span>
                </div>
            }
        </Page>
    );
}
