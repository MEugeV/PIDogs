import React, {useEffect} from "react";
import {connect} from "react-redux"
import Dogs from "../components/dogs"
import CardsBar from "./cardsBar";
import {getDogs, getTemperaments, setPage, resetDogs} from "../redux/actions" 
import { Paginado } from "../components/paginado";
import styles from "../styles/home.module.css"
import img from "../styles/pictures/breednf.jpg" 
import NavBar from "../components/navBar";

function Home ({shownDogs, dogs,getDogs,getTemperaments,page, setPage,resetDogs}) { 


useEffect (()=>{
    getDogs()
    getTemperaments()
    return ()=>{
        resetDogs()
        setPage(1)
    }
},[])
//getDogs,getTemperaments,resetDogs,setPage

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
            <NavBar>    
            </NavBar>
            <div className={styles.homeBar}>
                <CardsBar>
                </CardsBar> 
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
                    <div className={styles.positionNotFound}>" "</div>
                    <p >Empty selection...</p> 
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