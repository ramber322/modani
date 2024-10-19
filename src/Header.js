import React from 'react';
import Dropdown from './Dropdown'; // Import the Dropdown component

function Header() {
    return (
        <div className="header">
            <button>
                <img src="https://cdn-icons-png.flaticon.com/512/3514/3514491.png" style={{ width: '30px', height: '30px' }} alt="load" />
            </button>
            <div className="search-container">
                <input type="text" id="searchInput" placeholder="..." />
                <button className="search-button">
                    <i className="fa fa-search" style={{ fontSize: '24px' }}></i>
                </button>
                <Dropdown />
            </div>
        </div>
    );
}

export default Header;
