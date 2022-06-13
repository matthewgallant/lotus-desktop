import * as React from 'react'
import ReactDOM from "react-dom/client"
import { HashRouter, Routes, Route } from "react-router-dom"

// Redux Toolkit
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store.js'

// Pages
import DashboardPage from './pages/dashboard'
import CardsPage from './pages/cards'
import DecksPage from './pages/decks'
import DeckPage from './pages/deck'
import SearchPage from './pages/search'
import ImportPage from './pages/import'
import SettingsPage from './pages/settings'
import CardPage from './pages/card'

// Other
import './css/custom.scss'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <HashRouter>
                <Routes>
                    <Route path="/" exact element={<DashboardPage />} />
                    <Route path="/cards" exact element={<CardsPage />} />
                    <Route path="/cards/:name" exact element={<CardPage />} />
                    <Route path="/decks" exact element={<DecksPage />} />
                    <Route path="/decks/:name" exact element={<DeckPage />} />
                    <Route path="/search" exact element={<SearchPage />} />
                    <Route path="/import" exact element={<ImportPage />} />
                    <Route path="/settings" exact element={<SettingsPage />} />
                </Routes>
            </HashRouter>
        </PersistGate>
    </Provider>
);
