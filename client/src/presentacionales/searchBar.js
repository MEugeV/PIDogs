import React from "react"
import styles from "../styles/filterOrder.module.css"


export default function SearchBar ({handleSearch, handleChange,handleUnSearch, search, searched}) {
    return (
        <div className={styles.searchContainer}>
        <form  onSubmit={handleSearch}>
            <label to="searchBar">Search Breed </label>
            <input className={styles.butSel} name="searchBar"type="text"  placeholder="..." onChange={handleChange}></input>
            <input className={styles.lupa} type="submit" value="&#x1f50d;&#xfe0e;" ></input>
        </form>            
            {/* {error && <span>{error}</span> } */}
            {searched && <div className={styles.search}>Selection: {search} <button className={styles.unsearch} onClick={handleUnSearch}>X</button> </div> }

    </div>

    )
}