import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
    return (
        <div className="Sidebar">
            <h1>Lotus</h1>
            <ul className="Sidebar__Nav">
                <li className="Sidebar__Item">
                    <NavLink to="/main_window" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Dashboard</NavLink>
                </li>
                <li className="Sidebar__Item">
                    <NavLink to="/search" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Search</NavLink>
                </li>
                <li className="Sidebar__Item">
                    <NavLink to="/collection" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Collection</NavLink>
                </li>
                <li className="Sidebar__Item">
                    <NavLink to="/decks" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Decks</NavLink>
                </li>
                <li className="Sidebar__Item">
                    <NavLink to="/settings" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Settings</NavLink>
                </li>
            </ul>
            <div>Alpha Build 1</div>
        </div>
    );
}
