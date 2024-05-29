import React, { useState } from 'react';
import style from "./Sidebar.module.css";
import Filter from '../Filter/Filter';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`${style.sidebar} ${isOpen ? style.open : ''}`}>
            <button
                className={`${style.toggleButton} ${isOpen ? style.sidebarOpenToggleButton : ''}`}
                onClick={toggleSidebar}
            >
                {isOpen ? '→' : '←'}
            </button>
            <div className={style.content}>
                <h2>Filter by</h2>
                <Filter/>
            </div>
        </div>
    );
};

export default Sidebar;