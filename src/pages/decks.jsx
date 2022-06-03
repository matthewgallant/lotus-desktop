import React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Modal, Button, Form } from "react-bootstrap"

import Page from "../components/page.jsx"

export default function DecksPage() {
    const navigate = useNavigate()

    const [showAddModal, setShowAddModal] = useState(false)
    const [deckName, setDeckName] = useState('')
    const [deckFormat, setDeckFormat] = useState('Commander')

    const handleModalClose = () => setShowAddModal(false)
    const handleModalShow = () => setShowAddModal(true)

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

    const buttons = [
        <Button variant="primary" onClick={handleModalShow}>
            Add Deck
        </Button>
    ]

    return (
        <Page title="Decks" buttons={buttons}>
            Decks Page
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
