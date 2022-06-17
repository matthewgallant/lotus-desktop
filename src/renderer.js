import * as React from 'react'
import ReactDOM from "react-dom/client"
import { HashRouter, Routes, Route, Navigate } from "react-router-dom"
import { Toaster } from "react-hot-toast"

// Redux Toolkit
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store.js'

// Pages
import CardsPage from './pages/cards'
import DecksPage from './pages/decks'
import DeckPage from './pages/deck'
import ImportPage from './pages/import'
import CardPage from './pages/card'

// Other
import './css/custom.scss'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Toaster/>
            <HashRouter>
                <Routes>
                    <Route path="/" exact element={<Navigate to="/cards" replace />} />
                    <Route path="/cards" exact element={<CardsPage />} />
                    <Route path="/cards/:name" exact element={<CardPage />} />
                    <Route path="/decks" exact element={<DecksPage />} />
                    <Route path="/decks/:id" exact element={<DeckPage />} />
                    <Route path="/import" exact element={<ImportPage />} />
                </Routes>
            </HashRouter>
        </PersistGate>
    </Provider>
);
