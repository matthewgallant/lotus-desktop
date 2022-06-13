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
        }
    }
})

export const { addDeck, deleteDecks } = decksSlice.actions
export default decksSlice.reducer
