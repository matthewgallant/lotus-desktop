import * as React from 'react'
import ReactDOM from "react-dom/client"
import { HashRouter, Routes, Route } from "react-router-dom"

import DashboardPage from './pages/dashboard.jsx'
import CollectionPage from './pages/collection.jsx'
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
            <Route path="/collection" exact element={<CollectionPage />} />
            <Route path="/decks" exact element={<DecksPage />} />
            <Route path="/decks/:name" exact element={<DeckPage />} />
            <Route path="/search" exact element={<SearchPage />} />
            <Route path="/import" exact element={<ImportPage />} />
            <Route path="/settings" exact element={<SettingsPage />} />
            <Route path="/card/:name" exact element={<CardPage />} />
        </Routes>
    </HashRouter>
);
