import React from "react"
import styles from "../styles/filterOrder.module.css"

export default function Filters ({handleFilter, temperaments}) {
    return (
        <div className={styles.container}>
        <div >
        Filter Breeds: 
        </div>
            <div className={styles.selection}>
            <label to="temperament">Temperament</label>
            <select className={styles.butSel} id="filter" name="temperament" onChange={handleFilter} >
                {/* <option selected="false" disabled>All</option> */}
                <option >All</option>
                {temperaments?.map(el=>(<option key={el.id}>{el.name}</option>))}
            </select>
            </div>
            <div className={styles.selection}>
            <label to="source">Source</label>
            <select className={styles.butSel} id="filter" name="source" onChange={handleFilter} >
                {/* <option selected="false" disabled>All</option> */}
                <option >All</option>
                <option >Existent</option>
                <option >Created</option>
            </select>
            </div>
        </div>

    )
}

//. Si se omite el atributo value el valor  se tomará del texto del contenido del elemento option.