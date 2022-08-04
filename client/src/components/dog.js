import {React } from "react"
import styles from "../styles/dog.module.css"
import { Link } from "react-router-dom"

export default function Dog (props) {


return (
    <div className={styles.dog}>
        <div className={styles.imageBox}>
            <img className={styles.image} src={props.dog.image} alt="dog"></img>
        </div>
        <div className={styles.infoCont}>
            <p className={styles.name} >{props.dog.name}</p>
            <p className={styles.info}>Temperament: <br/>{props.dog.temperaments}</p>
            <p className={styles.info} >Weight: {props.dog.weight} kgs </p>
            <Link className={styles.link} to={`/detail/${props.dog.id}`}>View detail</Link>
        </div>
    </div>
)

} 