import React from "react"
import styles from "../styles/navTools.module.css"

export default function Order ({handleOrder}) {

    return (
        <div className={styles.container}>
            <div >
                Order Breeds: 
            </div>
            <div className={styles.selection}>
                <label 
                    to="alphabetical">
                        Alphabetically
                </label>
                <select 
                    className={styles.buttonSelection} 
                    id="alphabetical" 
                    name="alphabetical" 
                    onChange={handleOrder} >
                        <option value="Select">Select</option>
                        <option >a-z</option>
                        <option >z-a</option>
                </select>
            </div>
            <div className={styles.selection}>
                <label 
                    to="weight">
                        Average weight
                </label>
                <select 
                    className={styles.buttonSelection} 
                    id="weight" 
                    name="weight" 
                    onChange={handleOrder}>
                        <option value="Select" >Select</option>
                        <option >min-max</option>
                        <option >max-min</option>
                </select>
            </div>
        </div>

    )
}