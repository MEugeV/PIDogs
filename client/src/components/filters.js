import React from "react"
import styles from "../styles/cardsBarTools.module.css"

export default function Filters (props) {

    return (
        <div className={styles.container}>
            <div>
                Filter Breeds:
            </div>
            <div className={styles.types}>
                <div className={styles.selection}>
                    <label 
                        to="temperament">
                            Temperament
                    </label>
                    <select 
                        className={styles.buttonSelection} 
                        id="filter" 
                        name="temperament" 
                        onChange={props.handleFilter}>
                            <option>All</option>
                            {props.temperaments.map(el=>(<option key={el.id}>{el.name}</option>))}
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
                        onChange={props.handleFilter}>
                            <option >All</option>
                            <option >Existent</option>
                            <option >Created</option>
                    </select>
                </div>
            </div>
        </div>
    )

}

