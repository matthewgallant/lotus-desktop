import React from "react"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

import Page from "../components/page.jsx"

export default function CardPage() {
    let { name } = useParams()

    const [isLoading, setIsLoading] = useState(true)
    const [cardDetails, setCardDetails] = useState({
        image_uris: {},
        legalities: {},
        prices: {},
        purchase_uris: {}
    })

    const onClick = () => {
        let collection;

        if (localStorage.getItem('collection')) {
            collection = JSON.parse(localStorage.getItem('collection'))
        } else {
            collection = []
        }
        
        collection.push(cardDetails)

        localStorage.setItem('collection', JSON.stringify(collection))
    }

    useEffect(() => {
        if (isLoading) {
            axios.get('https://api.scryfall.com/cards/named', { params: { exact: name }}).then(res => {
                setIsLoading(false)
                setCardDetails(res.data)
                console.log(res.data)
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
                        <img src={cardDetails.image_uris.large} alt={cardDetails.name} className="img-fluid" />
                    </div>
                    <div className="col-8">
                        <div className="Card">
                            <div className="Card__Name">{cardDetails.name}</div>
                            <div className="Card__Cost">{cardDetails.mana_cost}</div>
                            <div className="Card__Type">{cardDetails.type_line}</div>
                            <div className="Card__Oracle">{cardDetails.oracle_text}</div>
                            <div className="Card__Flavor">{cardDetails.flavor_text}</div>
                            <div className="Card__Legalities">
                                <div>
                                    <div className={"Card__Legality " + (cardDetails.legalities.commander == 'legal' ? 'Card__Legality--Legal' : 'Card__Legality--Illegal')}>{cardDetails.legalities.commander == 'legal' ? 'Legal' : 'Not Legal'}</div>
                                    <div className="Card__Format">Commander</div>
                                </div>
                                <div>
                                    <div className={"Card__Legality " + (cardDetails.legalities.standard == 'legal' ? 'Card__Legality--Legal' : 'Card__Legality--Illegal')}>{cardDetails.legalities.standard == 'legal' ? 'Legal' : 'Not Legal'}</div>
                                    <div className="Card__Format">Standard</div>
                                </div>
                                <div>
                                    <div className={"Card__Legality " + (cardDetails.legalities.brawl == 'legal' ? 'Card__Legality--Legal' : 'Card__Legality--Illegal')}>{cardDetails.legalities.brawl == 'legal' ? 'Legal' : 'Not Legal'}</div>
                                    <div className="Card__Format">Brawl</div>
                                </div>
                                <div>
                                    <div className={"Card__Legality " + (cardDetails.legalities.pauper == 'legal' ? 'Card__Legality--Legal' : 'Card__Legality--Illegal')}>{cardDetails.legalities.pauper == 'legal' ? 'Legal' : 'Not Legal'}</div>
                                    <div className="Card__Format">Pauper</div>
                                </div>
                                <div>
                                    <div className={"Card__Legality " + (cardDetails.legalities.modern == 'legal' ? 'Card__Legality--Legal' : 'Card__Legality--Illegal')}>{cardDetails.legalities.modern == 'legal' ? 'Legal' : 'Not Legal'}</div>
                                    <div className="Card__Format">Modern</div>
                                </div>
                                <div>
                                    <div className={"Card__Legality " + (cardDetails.legalities.legacy == 'legal' ? 'Card__Legality--Legal' : 'Card__Legality--Illegal')}>{cardDetails.legalities.legacy == 'legal' ? 'Legal' : 'Not Legal'}</div>
                                    <div className="Card__Format">Legacy</div>
                                </div>
                            </div>
                            <div className="Card__Price">{cardDetails.prices.usd ? `$${cardDetails.prices.usd}` : `$${cardDetails.prices.usd_foil} (foil)`}</div>
                            <div className="Card__Purchase">
                                <a href={cardDetails.purchase_uris.tcgplayer} target="_blank" className="btn btn-primary">Buy on TCGplayer</a>
                            </div>
                            <div className="Card__Add">
                                <button className="btn btn-secondary" onClick={onClick}>Add to Collection</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    );
}
