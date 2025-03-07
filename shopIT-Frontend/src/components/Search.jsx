import React from 'react'
import {FaSearch} from 'react-icons/fa'

function Search({onSearch}){
    function handleSearch(e){
        onSearch(e.target.value)
    }
    return(
        <>
            <FaSearch className='search-icon' size={9}/>
            <input type='text' placeholder='search for an item here...' onChange={handleSearch} className='input-field'/>
            
        </>

    )

}

export default Search


