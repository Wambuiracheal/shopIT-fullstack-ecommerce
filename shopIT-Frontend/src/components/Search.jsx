import React from 'react';
import { FaSearch } from 'react-icons/fa';

function Search({ onSearch }) {
  function handleSearch(e) {
    onSearch(e.target.value);
  }

  return (
    <div className="search-container">
      <FaSearch className="search-icon" size={16} />
      <input
        type="text"
        placeholder="Search for an item here..."
        onChange={handleSearch}
        className="input-field"
      />
    </div>
  );
}

export default Search;