import React from "react"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Button, ButtonGroup } from "react-bootstrap"
import axios from "axios"

import Page from "../components/page.jsx"

export default function CardPage() {
    let { name } = useParams()

    const [isLoading, setIsLoading] = useState(true)
    const [cardName, setCardName] = useState('')
    const [cardDetails, setCardDetails] = useState({
        image_uris: {},
        legalities: {},
        prices: {},
        purchase_uris: {}
    })

    const onClick = () => {
        let cards;

        if (localStorage.getItem('cards')) {
            cards = JSON.parse(localStorage.getItem('cards'))
        } else {
            cards = []
        }
        
        cards.push(cardDetails)

        localStorage.setItem('cards', JSON.stringify(cards))
    }

    useEffect(() => {

        // Check to see if the card name has changed
        if (name != cardName) {
            setIsLoading(true)
            setCardName(name)
        }

        // Grab card details if in loading mode
        if (isLoading) {
            axios.get('https://api.scryfall.com/cards/named', { params: { exact: name }}).then(res => {
                setIsLoading(false)
                setCardDetails(res.data)
            }).catch(function () {
                setIsLoading(false)
                console.log("Could not contact Scryfall's API!")
            })
        }
    })

    return (
        <Page title={name} isLoading={isLoading}>
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <img src={cardDetails.image_uris.large} alt={cardDetails.name} className="img-fluid rounded-4" />
                    </div>
                    <div className="col-8">
                        <div className="Card">
                            <div className="h2">{cardDetails.name}</div>
                            <div className="mb-2">{cardDetails.mana_cost}</div>
                            <div className="mb-2">{cardDetails.type_line}</div>
                            <div className="mb-2">{cardDetails.oracle_text}</div>
                            <div className="mb-2"><em>{cardDetails.flavor_text}</em></div>
                            <div className="h5 mb-3">Average Price: {cardDetails.prices.usd ? `$${cardDetails.prices.usd}` : `$${cardDetails.prices.usd_foil} (foil)`}</div>
                            <div className="Card__Legalities mb-3">
                                <div>
                                    <div className={"Card__Legality " + (cardDetails.legalities.commander == 'legal' ? 'Card__Legality--Legal' : 'Card__Legality--Illegal')}>{cardDetails.legalities.commander == 'legal' ? 'Legal' : 'Not Legal'}</div>
                                    <div>Commander</div>
                                </div>
                                <div>
                                    <div className={"Card__Legality " + (cardDetails.legalities.standard == 'legal' ? 'Card__Legality--Legal' : 'Card__Legality--Illegal')}>{cardDetails.legalities.standard == 'legal' ? 'Legal' : 'Not Legal'}</div>
                                    <div>Standard</div>
                                </div>
                                <div>
                                    <div className={"Card__Legality " + (cardDetails.legalities.brawl == 'legal' ? 'Card__Legality--Legal' : 'Card__Legality--Illegal')}>{cardDetails.legalities.brawl == 'legal' ? 'Legal' : 'Not Legal'}</div>
                                    <div>Brawl</div>
                                </div>
                                <div>
                                    <div className={"Card__Legality " + (cardDetails.legalities.pauper == 'legal' ? 'Card__Legality--Legal' : 'Card__Legality--Illegal')}>{cardDetails.legalities.pauper == 'legal' ? 'Legal' : 'Not Legal'}</div>
                                    <div>Pauper</div>
                                </div>
                                <div>
                                    <div className={"Card__Legality " + (cardDetails.legalities.modern == 'legal' ? 'Card__Legality--Legal' : 'Card__Legality--Illegal')}>{cardDetails.legalities.modern == 'legal' ? 'Legal' : 'Not Legal'}</div>
                                    <div>Modern</div>
                                </div>
                                <div>
                                    <div className={"Card__Legality " + (cardDetails.legalities.legacy == 'legal' ? 'Card__Legality--Legal' : 'Card__Legality--Illegal')}>{cardDetails.legalities.legacy == 'legal' ? 'Legal' : 'Not Legal'}</div>
                                    <div>Legacy</div>
                                </div>
                            </div>
                            <ButtonGroup>
                                <Button onClick={onClick}>Add to Collection</Button>
                                <Button href={cardDetails.purchase_uris.tcgplayer} target="_blank" variant="secondary">Buy on TCGplayer</Button>
                            </ButtonGroup>
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    );
}
