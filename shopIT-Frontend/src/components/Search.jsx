import React from 'react'
import {FaSearch} from 'react-icons/fa'

function Search(){
    function handleSearch(e){
        searchforme(e.target.value)
    }
    return(
        <>
            <FaSearch className='search-icon' size={9}/>
            <input type='text' placeholder='search for an iteme here...' onChange={handleSearch} className='input-field'/>
            
        </>

    )

}

export default Search