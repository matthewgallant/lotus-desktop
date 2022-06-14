import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: []
}

export const decksSlice = createSlice({
    name: 'decks',
    initialState,
    reducers: {
        addDeck: (state, action) => {
            state.value.push(action.payload)
        },
        deleteDecks: (state, action) => {
            state.value = state.value.filter((deck, index) => action.payload[index] == false)
        },
        addDeckCard: (state, action) => {
            state.value.map((deck, index) => {
                if (index == action.payload.deck) {
                    deck.cards.push(action.payload.card)
                }
            })
        }
    }
})

export const { addDeck, deleteDecks, addDeckCard } = decksSlice.actions
export default decksSlice.reducer
