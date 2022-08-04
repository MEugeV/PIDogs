import {React} from "react"
import {Link} from "react-router-dom"
import styles from "../styles/landing.module.css"


export default function Landing () { 

return (
    <div className={styles.landing}>
        <h1 className={styles.title}>
            Welcome to DogBreeds Place..
        </h1>
        <Link to="/home">
            <button className={styles.start}>
            Start
            </button>
            </Link>
    </div>
)

}

