import React, { useEffect } from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import { useParams, useHistory} from "react-router-dom"
import {getDetail, resetDetail} from "../redux/actions"
import styles from "../styles/detail.module.css"
import imgNotFound from "../styles/pictures/detailnf.jpg"


function Detail ({getDetail, detail,resetDetail}) {

const {id}= useParams()
let history=useHistory()

useEffect (()=>{
    // console.log(parseInt(id.id)) //tenia un objeto {id:3} porqeu no había hecho distructuring const id= useParams()
    getDetail(id)
    return ()=>{resetDetail()}
},[getDetail,id,resetDetail])

    return (
        <div className={styles.detail}>
            <div className="head">
                <Link id="landing" className="headLinks" to="/">DogBreeds Place</Link>
                <Link className="headLinks" to="/home" >Home</Link>
            </div>
            <div className={styles.navinset}></div>
            {detail.name? 
                    <div className={styles.container}>
                        <div>
                            <p className={styles.tittle}>Breed:</p>
                            <p className={styles.name}>{detail.name}</p>
                            <p className={styles.tittle}>Temperament:</p>
                            <p className={styles.temperaments}>{detail.temperaments}</p>
                            <p className={styles.tittle}>Weight:</p>
                            <p> min:{detail.min_weight} - max:{detail.max_weight} kgs</p>
                            <p className={styles.tittle}>Height:</p>
                            <p> min:{detail.min_height} - max:{detail.max_height} cmts</p>
                            <p className={styles.tittle}>Life span:</p>
                            <p> {detail.life_span} years</p>
                        </div>
                        <div>
                            <img className={styles.image} src={detail.image} alt="detail"></img>
                        </div>
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
                    className={styles.imgNotFound}/>
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