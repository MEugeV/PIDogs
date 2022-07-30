import React, {useEffect} from "react";
import {connect} from "react-redux"
import Dogs from "../presentacionales/dogs"
import NavBar from "./navBar";
import {getDogs, getTemperaments, setPage, resetDogs} from "../redux/actions" 
import { Paginado } from "../presentacionales/paginado";
import {Link} from "react-router-dom"
import styles from "../styles/home.module.css"
import img from "../styles/pictures/breednf.jpg" 

function Home ({shownDogs, dogs,getDogs,getTemperaments,page, setPage,resetDogs}) { 


useEffect (()=>{
    getDogs()
    getTemperaments()
    return ()=>{
        resetDogs()
        setPage(1)
    }
},[])


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


    return (
        <div className={styles.home}>
            <div className="head">
                <Link id="landing" className="headLinks" to="/">DogBreeds Place</Link>
                <Link className="headLinks" to="/form">Create your breed</Link>
            </div>
            <div className={styles.homeBar}>
                <NavBar>
                </NavBar> 
                <Paginado 
                    page={page} 
                    pages={pages} 
                    handlePage={handlePage} 
                    handleNext={handleNext} 
                    handlePrev={handlePrev}>
                </Paginado>
            </div>
            {shownDogs.length===0
            ? dogs.length===0
            ? <div 
                className={styles.loading}>
                    Loading....
                    <span 
                        className={styles.loadingIn} >
                            &#160;
                    </span>
                </div> 
            : <div 
                className={styles.notFound}>
                    <p >Dogs not found...</p> 
                    <img 
                        src={img} 
                        className={styles.imgNotFound} 
                        alt="bnf"/>
            </div> 
            : <div className={styles.positionDogsCont}>
                <div className={styles.positionDogs}>" "</div>
                <Dogs 
                    dogs={shownDogs} 
                    page={page} 
                    pagesPerPage={pagesPerPage}>
                </Dogs>      
            </div>}
        </div>
    )

}

function mapStateToProps(state) {
    return {
        shownDogs: state.shownDogs,
        dogs: state.dogs,
        page: state.page
    }
}

export default connect (mapStateToProps, {getDogs,getTemperaments, setPage, resetDogs}) (Home)