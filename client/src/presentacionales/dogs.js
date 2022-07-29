import {React} from "react"
import Dog from "./dog"
import styles from "../styles/dogs.module.css"


export default function Dogs (props) {


    return (
        <div className={styles.container}>
            {props.dogs?.slice((props.page-1)*props.pagesPerPage,props.pagesPerPage*props.page).map(dog=>(<div key={dog.id}>
                <Dog dog={dog}>
                </Dog>
            </div>))}
        </div>
    )

}