import React from "react"
import styles from "../styles/navTools.module.css"

export default function Filters ({handleFilter, temperaments,resetFilters}) {

    return (
        <div className={styles.container}>
            <div>
                Filter Breeds:
            </div>
            <div className={styles.selection}>
                <label 
                    to="temperament">
                        Temperament
                </label>
                <select 
                    className={styles.buttonSelection} 
                    id="filter" 
                    name="temperament" 
                    onChange={handleFilter}>
                        <option>All</option>
                        {temperaments?.map(el=>(<option key={el.id}>{el.name}</option>))}
                </select>
            </div>
            <div className={styles.selection}>
                <label 
                    to="source">
                        Source
                </label>
                <select 
                    className={styles.buttonSelection} 
                    id="filter" 
                    name="source" 
                    onChange={handleFilter}>
                        <option >All</option>
                        <option >Existent</option>
                        <option >Created</option>
                </select>
            </div>
            {/* <button onClick={resetFilters}>Reset Filters</button> */}
        </div>
    )

}

