import * as React from 'react';
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";

import DashboardPage from './pages/dashboard.jsx'
import CollectionPage from './pages/collection.jsx'
import DecksPage from './pages/decks.jsx'
import SearchPage from './pages/search.jsx'
import ImportPage from './pages/import.jsx'
import SettingsPage from './pages/settings.jsx'

import './css/custom.scss'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <HashRouter>
        <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/collection" element={<CollectionPage />} />
            <Route path="/decks" element={<DecksPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/import" element={<ImportPage />} />
            <Route path="/settings" element={<SettingsPage />} />
        </Routes>
    </HashRouter>
);
