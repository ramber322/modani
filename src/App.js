import React from 'react';
import Header from './Header';
import './App.css'; // Include your CSS here
import MainContent from './MainContent';

function App() {
    return (
        <div className="container">
            <div className="pokecontainer" id="form-container">
                <Header />
                <MainContent />
            </div>
        </div>
    );
}

export default App;