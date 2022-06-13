import { combineReducers } from 'redux'

import cardsReducer from './cardsSlice'
import decksReducer from './decksSlice'

const rootReducer = combineReducers({
    cards: cardsReducer,
    decks: decksReducer
})

export default rootReducer
