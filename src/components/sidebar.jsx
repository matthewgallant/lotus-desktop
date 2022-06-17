import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
    return (
        <div className="Sidebar">
            <h1>Lotus</h1>
            <ul className="Sidebar__Nav">
                <li className="Sidebar__Item">
                    <NavLink to="/cards" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Cards</NavLink>
                </li>
                <li className="Sidebar__Item">
                    <NavLink to="/decks" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Decks</NavLink>
                </li>
                <li className="Sidebar__Item">
                    <NavLink to="/import" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Import</NavLink>
                </li>
            </ul>
            <div>Alpha Build 1</div>
        </div>
    );
}
