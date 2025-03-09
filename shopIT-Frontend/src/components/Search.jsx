import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

function Search({ onSearch, products = [] }) { // Default to empty array
    const [searchQuery, setSearchQuery] = useState("");

    function handleSearch(e) {
        const value = e.target.value;
        setSearchQuery(value);
        onSearch(value);
    }

    // Ensure products is an array before filtering
    const filteredProducts = Array.isArray(products) 
        ? products.filter((product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        ) 
        : [];

    return (
        <div className="search-container">
            <input 
                type='text' 
                placeholder='Search for an item...' 
                value={searchQuery} 
                onChange={handleSearch} 
                className='input-field' 
            />
        </div>
    );
}

export default Search;
