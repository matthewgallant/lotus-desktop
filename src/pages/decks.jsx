import React from "react"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Modal, Button, Form, Table } from "react-bootstrap"
import { Trash } from "react-bootstrap-icons"

import Page from "../components/page.jsx"

export default function DecksPage() {
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(true)
    const [showAddModal, setShowAddModal] = useState(false)
    const [decks, setDecks] = useState([])
    const [allChecked, setAllChecked] = useState(false)
    const [showToolbar, setShowToolbar] = useState(false)
    const [deckName, setDeckName] = useState('')
    const [deckFormat, setDeckFormat] = useState('Commander')

    const handleModalClose = () => setShowAddModal(false)
    const handleModalShow = () => setShowAddModal(true)

    const buttons = [
        <Button variant="primary" onClick={handleModalShow}>
            Add Deck
        </Button>
    ]

    const onNameChange = (e) => setDeckName(e.target.value)
    const onFormatChange = (e) => setDeckFormat(e.target.value)

    const saveDeck = (e) => {
        e.preventDefault()

        // Basic form validation
        if (deckName.length > 0) {

            // Create deck data
            const deck = {
                name: deckName,
                format: deckFormat,
                cards: []
            }

            // Get current decks
            let decks = localStorage.getItem('decks')
            
            if (decks != undefined) {

                // Add decks to existing decks
                decks = JSON.parse(decks)
                decks.push(deck)
            } else {

                // Create decks array
                decks = [deck]
            }

            // Save deck to local storage
            localStorage.setItem('decks', JSON.stringify(decks))

            // Close modal before redirecting
            setShowAddModal(false)

            // Redirect to deck edit page
            navigate(`/decks/${deckName}`)
        }
    }

    const onAllCheckboxChange = () => {

        // Create temp array
        let tempDecks = [...decks]

        // Toggle checkbox
        tempDecks.map(deck => deck.isChecked = !allChecked)

        // Update select all checkbox state
        setAllChecked(!allChecked)

        // Show/hide toolbar
        setShowToolbar(!allChecked)

        // Update decks state
        setDecks(tempDecks)
    }

    const onSingleCheckboxChange = (e) => {

        // Create temp array
        let tempDecks = [...decks]

        // Get decks index
        const index = e.target.dataset.index

        // Toggle checkbox
        tempDecks[index].isChecked = !tempDecks[index].isChecked

        // Check if any checkboxes are checked
        let noneChecked = tempDecks.every((deck) => {
            return !deck.isChecked
        })

        // Show/hide toolbar
        if (noneChecked) {
            setShowToolbar(false)
        } else {
            setShowToolbar(true)
        }

        // Since a single box has changed we should not indicate all are checked
        setAllChecked(false)
        
        // Update decks state
        setDecks(tempDecks)
    }

    const deleteDecks = () => {

        // Create temp array
        let tempDecks = [...decks]

        // Filter out all checked decks
        tempDecks = tempDecks.filter(deck => !deck.isChecked)

        // Delete from local storage
        localStorage.setItem('decks', JSON.stringify(tempDecks))

        // Check if any checkboxes are checked
        let noneChecked = tempDecks.every(deck => !deck.isChecked)

        // Show/hide toolbar
        if (noneChecked) {
            setShowToolbar(false)
        } else {
            setShowToolbar(true)
        }

        if (tempDecks.length === 0) {
            setAllChecked(false)
        }

        // Update decks state
        setDecks(tempDecks)
    }

    useEffect(() => {
        if (isLoading) {

            // Get decks and set state if it exists
            let tempDecks = localStorage.getItem('decks')
            if (tempDecks) {

                // Convert JSON string to actual JSON
                tempDecks = JSON.parse(tempDecks)

                // Uncheck all checkboxes
                tempDecks.map(deck => deck.isChecked = false)

                // Update decks state
                setDecks(tempDecks)
            }

            // Stop loading and render page
            setIsLoading(false)
        }
    })

    return (
        <Page title="My Decks" buttons={buttons} noPadding>
            <div className="Table__Toolbar p-1 bg-warning" style={{ display: showToolbar ? 'block' : 'none' }}>
                <button className="text-danger bg-transparent border-0 d-flex align-items-center" onClick={deleteDecks}>
                    <Trash className="me-1" /> Delete
                </button>
            </div>

            <Table variant="dark" striped hover borderless>
                <thead>
                    <tr>
                        <th style={{ width: '30px' }}>
                            <input className="form-check-input" type="checkbox" checked={allChecked} onChange={onAllCheckboxChange} />
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
                                <input className="form-check-input" type="checkbox" data-index={index} checked={deck.isChecked} onChange={onSingleCheckboxChange} />
                            </th>
                            <th>
                                <Link to={`/decks/${deck.name}`} className="link-secondary text-decoration-none fw-normal">{deck.name}</Link>
                            </th>
                            <td>{deck.format}</td>
                            <td>{deck.cards.length}</td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <Modal show={showAddModal} onHide={handleModalClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Deck</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={saveDeck}>
                        <Form.Group className="mb-3">
                            <Form.Label>Deck Name</Form.Label>
                            <Form.Control type="text" placeholder="My Super Cool Deck" onChange={onNameChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Deck Format</Form.Label>
                            <Form.Select onChange={onFormatChange}>
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
                    <Button variant="secondary" onClick={handleModalClose}>Cancel</Button>
                    <Button variant="primary" onClick={saveDeck}>Add</Button>
                </Modal.Footer>
            </Modal>
        </Page>
    );
}
