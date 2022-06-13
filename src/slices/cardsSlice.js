import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: []
}

export const cardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        addCard: (state, action) => {
            state.value.push(action.payload)
        },
        deleteCards: (state, action) => {
            state.value = state.value.filter((card, index) => action.payload[index] == false)
        }
    }
})

export const { addCard, deleteCards } = cardsSlice.actions
export default cardsSlice.reducer
