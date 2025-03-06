import React, { useState, useEffect } from 'react';

function BuyerDashboard() {
    const url = 'http://127.0.0.1:5000/products';
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(error => console.error("Error fetching products:", error));
    }, []);

    return (
        <main>
            <ul className='cards'>
                {products.length > 0 ? (
                    products.map(pd => (
                        <li key={pd.id}>
                            <Artcard 
                                artist={pd.artist} 
                                id={pd.id} 
                                title={pd.title} 
                                image={pd.image} 
                                price={pd.price} 
                                category={pd.category} 
                            />
                        </li>
                    ))
                ) : (
                    <p>Loading products...</p> // Added a loading message
                )}
            </ul>
        </main>
    );
}

export default BuyerDashboard;
