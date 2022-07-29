import {React, useEffect} from "react"
import {Link} from "react-router-dom"
import styles from "../styles/landing.module.css"
// import {connect} from "react-redux"
// import {getDogs,getTemperaments} from "../redux/actions"


export default function Landing () { //{temperaments, dogs, getDogs, getTemperaments}

// useEffect(()=>{
//     // console.log(getDogs())
//     getDogs()
//     getTemperaments()
// },[getDogs,getTemperaments])
//la desventaja de traerlo antes es qeu se cargan los dogs antes que el css, entonces no tengo loading, pero el css aun no se cargó....
// los temperaments los podria trambien llamar directamente en el form si no me tilda el no tenerlos al ppio

return (
    <div className={styles.landing}>
        <h1 className={styles.title}>
            Welcome to DogBreeds Place..
            {/* <span className={styles.span}>&#160;</span> */}
        </h1>
        {/* <br/> */}
        <Link className={styles.start} to="/home">Start</Link>
        {/* <br/> */}
    </div>
)

}

//<h1 className={styles.start}></h1>
// function mapStateToProps(state){
//     return {
//         dogs: state.dogs,
//         temperaments: state.temperaments
//     }
// }

// export default connect (mapStateToProps,{getDogs,getTemperaments})(Landing)