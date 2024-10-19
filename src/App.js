import React from 'react';
import Header from './Header';
import ItemList from './ItemList';
import './App.css'; // Include your CSS here
import './Style.css'; // Include your CSS here

function App() {
    return (
        <div className="container">
            <div className="pokecontainer" id="form-container">
                <Header />
                <ItemList />
            </div>
        </div>
    );
}

export default App;
