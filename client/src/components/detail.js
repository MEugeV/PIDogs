import React, { useEffect } from "react"
import {connect} from "react-redux"
import {Link, useParams} from "react-router-dom"
import {getDetail, resetDetail} from "../redux/actions"
import styles from "../styles/detail.module.css"
import imgNotFound from "../styles/pictures/detailnf.jpg"
import NavBar from "./navBar"

function Detail ({getDetail, detail,resetDetail}) {

const {id}= useParams()

useEffect (()=>{
    getDetail(id)
    return ()=>{resetDetail()}
},[getDetail,id,resetDetail])

    return (
        <div className={styles.detail}>
            <NavBar>       
            </NavBar>
            {/* <div className={styles.navinset}></div> */}
            {detail.name
            ? <div className={styles.detailShown}>
                <div className={styles.container}>
                        <div>
                            <p className={styles.tittle}>Breed:</p>
                            <p className={styles.name}>{detail.name}</p>
                            <p className={styles.tittle}>Temperament:</p>
                            <p className={styles.temperaments}>{detail.temperaments}</p>
                            <p className={styles.tittle}>Weight:</p>
                            <p> {detail.weight} kgs</p>
                            <p className={styles.tittle}>Height:</p>
                            <p> {detail.height} cmts</p>
                            <p className={styles.tittle}>Life span:</p>
                            <p> {detail.life_span} years</p>
                        </div>
                        <div className={styles.imgBox}>
                            <img className={styles.image} src={detail.image} alt="detail"></img>
                        </div>
                    </div>                    
                    <Link className={styles.home} to="/home" >Home</Link>   
            </div>
            : <div 
                className={styles.notFound}> 
                <span >
                    <Link 
                        className={styles.linkNotFound} 
                        to="/home" >
                            Dog not found. Try again
                    </Link>
                </span>  
                <img 
                    src={imgNotFound} 
                    className={styles.imgNotFound}
                    alt="Not found"/>
                <span className={styles.spanNotFound}>
                    &#160;
                </span>
            </div>
            }
        </div>
    )
}

function mapStateToProps (state) {
    return {detail: state.detail}
}

export default connect(mapStateToProps,{getDetail,resetDetail})(Detail)