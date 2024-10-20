import React from 'react';
import ItemList from './ItemList'; // Assuming you have an ItemList component

function MainContent() {
    return (
        <main className="main-content">
            <ItemList />
            <button id="savelistbutton" >
                SAVE LIST
            </button>
        </main>
    );
}

export default MainContent;