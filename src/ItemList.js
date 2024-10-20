import React from 'react';

function ItemList() {
    // Sample readymade grocery products tsting purpses
    const groceryProducts = [
        { id: 1, name: 'Apples', price: '₱20.00', done: false },
        { id: 3, name: 'Carrots', price: '₱15.00', done: false },
    ];

    return (
        <div id="itemListContainer">
            {/* Map over the grocery products and display them */}
            {groceryProducts.map(product => (
                <div key={product.id} className="item-list">
                    <h3 className={`title ${product.done ? 'done' : ''}`}>{product.name}</h3>
                    <p className="price">{product.price}</p>
                    <div className="button-container">
                        <button className="check">✔️</button>
                        <button className="trash">🗑️</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ItemList;
