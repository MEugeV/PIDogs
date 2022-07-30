import React from "react"
import styles from "../styles/navTools.module.css"


export default function SearchBar ({handleSearch, handleChange, search, searched}) {
    return (
        <div className={styles.searchContainer}>
        <form onSubmit={handleSearch}>
            <label to="searchBar">Search Breed </label>
            <input 
                className={styles.buttonSelection} 
                name="searchBar"
                type="text"  
                placeholder="..." 
                onChange={handleChange}>    
            </input>
            <input 
                className={styles.lupa} 
                type="submit" 
                value="&#x1f50d;&#xfe0e;" >
            </input>
        </form>            
            {searched && 
                <div 
                    className={styles.search}>
                    Search:  {search} 
                    {/* <button 
                        className={styles.unsearch} 
                        onClick={handleUnSearch}>
                            Reset Search
                    </button>  */}
                </div> }
        </div>
    )
}