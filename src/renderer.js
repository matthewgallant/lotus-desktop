import * as React from 'react'
import ReactDOM from "react-dom/client"
import { HashRouter, Routes, Route } from "react-router-dom"

import DashboardPage from './pages/dashboard.jsx'
import CardsPage from './pages/cards.jsx'
import DecksPage from './pages/decks.jsx'
import DeckPage from './pages/deck.jsx'
import SearchPage from './pages/search.jsx'
import ImportPage from './pages/import.jsx'
import SettingsPage from './pages/settings.jsx'
import CardPage from './pages/card.jsx'

import './css/custom.scss'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
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
);
