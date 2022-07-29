import React from "react"
import styles from "../styles/filterOrder.module.css"

export default function Order ({handleOrder}) {
    return (
        <div className={styles.container}>
        <div >
            Order Breeds: 
        </div>
        <div className={styles.selection}>
        <label to="alphabetical">Alphabetically</label>
        <select className={styles.butSel} id="alphabetical" name="alphabetical" onChange={handleOrder} >
            {/* <option selected="false" disabled>Not selected</option> */} 
            {/* <option >Not selected</option> //no podes deshacer el orden */}
            <option value="Select">Select</option>
            <option >a-z</option>
            <option >z-a</option>
        </select>
        </div>
        <div className={styles.selection}>
        <label to="weight">Average weight</label>
        <select className={styles.butSel} id="weight" name="weight" onChange={handleOrder}>
            {/* <option selected="false" disabled>Not selected</option>VER */}
            {/* <option >Not selected</option> */}
            <option value="Select" >Select</option>
            <option >min-max</option>
            <option >max-min</option>
        </select>
        </div>
        </div>

    )
}