import React from "react"
import {Link} from "react-router-dom"
import styles from "../styles/default.module.css"

export default function Default (){
    return (
        <div className={styles.default}>
            <h3>
            404 Page Not Found
            </h3>
            <br/>
            <Link className={styles.link} to="/home" >DogBreeds Home</Link>
        </div>


    )
}