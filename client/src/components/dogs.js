import {React} from "react"
// import { Link } from "react-router-dom"
import Dog from "./dog"
import styles from "../styles/dogs.module.css"


export default function Dogs (props) {


    return (
        <div className={styles.container}>
            {props.dogs?.slice((props.page-1)*props.pagesPerPage,props.pagesPerPage*props.page).map(dog=>(
                // <Link key={dog.id} to={`/detail/${dog.id}`}>
                    <Dog key={dog.id} dog={dog}>
                    </Dog>
                // </Link>
            ))}
        </div>
    )

}