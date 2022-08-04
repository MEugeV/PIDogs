import React from "react"
import styles from "../styles/cardsBarTools.module.css"


export default function SearchBar ({handleSearch, handleChange, search, searched}) {
    return (
        <div className={styles.searchContainer}>
        <form onSubmit={handleSearch}>
            <label to="searchBar">Search Breed </label>
            <input 
                className={styles.buttonSelection} 
                name="searchBar"
                type="text"  
                placeholder="search breed..." 
                // value={search} // me limpia el searched al limpiar el input y no me funciona el etarget reset x que tiene el valor por estado
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
                        <span className={styles.searchTitle}>Breed:</span>
                        <span className={styles.searchBreed}>{search}</span>                       
                    {/*
                    Lo saco para tener un boton para resetear busquedas conjuntas (filtro y search) 
                    <button 
                        className={styles.unsearch} 
                        onClick={handleUnSearch}>
                            Reset Search
                    </button>  */}
                </div> }
        </div>
    )
}