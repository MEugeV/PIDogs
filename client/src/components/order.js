import React from "react"
import styles from "../styles/cardsBarTools.module.css"

export default function Order ({handleOrder}) {

    return (
        <div className={styles.container}>
            <div >
                Order Breeds: 
            </div>
            <div className={styles.types}>
                <div className={styles.selection}>
                    <label 
                        to="alphabetical">
                            Alphabetically
                    </label>
                    <select 
                        className={styles.buttonSelection} 
                        id="alphabetical" 
                        name="alphabetical" 
                        onChange={handleOrder} 
                        defaultValue="Select">
                            <option value="Select" disabled="disabled" >Select</option>
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
                        onChange={handleOrder}
                        defaultValue="Select">
                            <option value="Select" disabled="disabled">Select</option>
                            <option >min-&#62;max</option>
                            <option >max-&#62;min</option>
                    </select>
                </div>
            </div>
        </div>

    )
}