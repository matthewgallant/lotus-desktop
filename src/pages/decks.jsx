import React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Modal, Button, Form, Table } from "react-bootstrap"
import { Trash } from "react-bootstrap-icons"

import { useSelector, useDispatch } from 'react-redux'
import { addDeck, deleteDecks } from '../slices/decksSlice'

import Page from "../components/page"

export default function DecksPage() {
    const dispatch = useDispatch()
    const decks = useSelector(state => state.decks.value)

    // Modal state
    const [showAddModal, setShowAddModal] = useState(false)
    const [deckName, setDeckName] = useState('')
    const [deckFormat, setDeckFormat] = useState('Commander')

    // Table state
    const [allChecked, setAllChecked] = useState(false)
    const [showToolbar, setShowToolbar] = useState(false)
    const [checkedDecks, setCheckedDecks] = useState(Array(decks.length).fill(false))

    // Page top bar buttons
    const buttons = [
        <Button variant="primary" onClick={() => setShowAddModal(true)}>
            Add Deck
        </Button>
    ]

    const saveDeck = (e) => {
        e.preventDefault()
        
        if (deckName.length > 0) {
            const newDeckIndex = decks.length

            dispatch(addDeck({
                name: deckName,
                format: deckFormat,
                cards: []
            }))

            setShowAddModal(false)
        }
    }

    const toggleAllCheckboxes = () => {
        setCheckedDecks(checkedDecks.fill(!allChecked))
        setAllChecked(!allChecked)
    }

    const toggleCheckbox = (index) => {
        let tempDecks = [...checkedDecks]
        tempDecks[index] = !tempDecks[index]
        setCheckedDecks(tempDecks)
        setAllChecked(false)
    }

    const deleteCheckedDecks = () => {
        dispatch(deleteDecks(checkedDecks))
        setCheckedDecks(checkedDecks.fill(false))
        setAllChecked(false)
    }

    useEffect(() => {
        if (checkedDecks.every(deck => !deck)) {
            setShowToolbar(false)
        } else {
            setShowToolbar(true)
        }
    })

    return (
        <Page title="My Decks" buttons={buttons} noPadding>
            
            {/* Decks Toolbar */}
            <div className="Table__Toolbar p-1 bg-warning" style={{ display: showToolbar ? 'block' : 'none' }}>
                <button className="text-danger bg-transparent border-0 d-flex align-items-center" onClick={deleteCheckedDecks}>
                    <Trash className="me-1" /> Delete
                </button>
            </div>

            {/* Decks Table */}
            {decks.length > 0 ?
                <Table variant="dark" striped hover borderless>
                    <thead>
                        <tr>
                            <th style={{ width: '30px' }}>
                                <input className="form-check-input" type="checkbox" checked={allChecked} onChange={toggleAllCheckboxes} />
                            </th>
                            <th>Deck</th>
                            <th>Format</th>
                            <th>Number of Cards</th>
                        </tr>
                    </thead>
                    <tbody>
                        {decks.map((deck, index) =>
                            <tr key={index}>
                                <th style={{ width: '30px' }}>
                                    <input className="form-check-input" type="checkbox" checked={checkedDecks[index]} onChange={() => toggleCheckbox(index)} />
                                </th>
                                <th>
                                    <Link to={`/decks/${index}`} className="link-secondary text-decoration-none fw-normal">{deck.name}</Link>
                                </th>
                                <td>{deck.format}</td>
                                <td>{deck.cards.length}</td>
                            </tr>
                        )}
                    </tbody>
                </Table> :
                <div className="d-flex justify-content-center align-items-center h-100">
                    <span>
                        <b>You don't have any decks!</b> Add a deck by clicking the <i>Add Deck</i> button above.
                    </span>
                </div>
            }

            {/* Add Deck Modal */}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Deck</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={saveDeck}>
                        <Form.Group className="mb-3">
                            <Form.Label>Deck Name</Form.Label>
                            <Form.Control type="text" placeholder="My Super Cool Deck" onChange={(e) => setDeckName(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Deck Format</Form.Label>
                            <Form.Select onChange={(e) => setDeckFormat(e.target.value)}>
                                <option value="Commander">Commander</option>
                                <option value="Standard">Standard</option>
                                <option value="Brawl">Brawl</option>
                                <option value="Pauper">Pauper</option>
                                <option value="Modern">Modern</option>
                                <option value="Legacy">Legacy</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={saveDeck}>Add</Button>
                </Modal.Footer>
            </Modal>
        </Page>
    );
}
