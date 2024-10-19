import React from 'react';

function Dropdown() {
    return (
        <div className="dropdown">
            <button className="search-button" id="LOADSAVEDLIST" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '2px' }}>
                <i className="fa fa-bookmark-o" style={{ height: '24px', width: '20px', marginRight: '0' }}></i>
            </button>
            <div className="dropdown-content" id="savedListsDropdown">
                {/* Saved list will be placed here */}
            </div>
        </div>
    );
}

export default Dropdown;
