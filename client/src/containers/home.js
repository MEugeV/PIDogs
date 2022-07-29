import React, {useEffect} from "react";
import {connect} from "react-redux"
import Dogs from "../presentacionales/dogs"
// import FilterOrder from "../presentacionales/filterOrder";
import NavBar from "./navBar";
import {getDogs, getTemperaments, setPage} from "../redux/actions" //searchName,
import { Paginado } from "../presentacionales/paginado";
import {Link} from "react-router-dom"
import styles from "../styles/home.module.css"

function Home ({shownDogs, dogs,getDogs,getTemperaments,page, setPage}) { //, searchName


useEffect (()=>{
    getDogs()
    getTemperaments()
},[])

//page es un estado global porque lo quiero poder definir en uno al filtrar, al hacer un search..

let pagesPerPage=8
let pages=Math.ceil(shownDogs.length/pagesPerPage)

function handlePage (e) {
    setPage(e.target.value)
}

function handlePrev (e) {
    setPage(parseInt(page)-1)
}

function handleNext (e) {
    setPage(parseInt(page)+1)
}
/////////////////////a paginado enviarle la funcion desde home, una vez que este hecha.....

    return (

        <div className={styles.home}>
            <Link to="/detail/565I" >link para romper</Link>
            <Link to="/detail/1" >link para 1</Link>
            <NavBar ></NavBar> 
            <Paginado page={page} pages={pages} handlePage={handlePage} handleNext={handleNext} handlePrev={handlePrev}></Paginado>       
            {shownDogs.length===0
            ? dogs.length===0
            ? <div className={styles.loading}>Loading....<span className={styles.loadingIn} >&#160;</span></div> 
            : <div className={styles.notFound}>Dog Breed not found...</div> 
            : <Dogs dogs={shownDogs} page={page} pagesPerPage={pagesPerPage}></Dogs> }     
        </div>
    )

}
//handleSearch={handleSearch}
function mapStateToProps(state) {
    return {
        shownDogs: state.shownDogs,
        dogs: state.dogs,
        page: state.page
    }
}

export default connect (mapStateToProps, {getDogs,getTemperaments, setPage}) (Home)  //searchName, 