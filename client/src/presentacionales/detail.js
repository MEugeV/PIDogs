import React, { useEffect } from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import { useParams, useHistory} from "react-router-dom"
import {getDetail, resetDetail} from "../redux/actions"
import styles from "../styles/detail.module.css"


function Detail ({getDetail, detail,resetDetail}) {

const {id}= useParams()
let history=useHistory()

useEffect (()=>{
    // console.log(parseInt(id.id)) //tenia un objeto {id:3} porqeu no había hecho distructuring const id= useParams()
   try {
    getDetail(id)
   } catch (error){
    history.push("/home")
   }
    return ()=>{resetDetail()}
},[getDetail,id,resetDetail])

    return (
        <div>
            Detail
            <br/>
            <Link to="/home" >Return to home</Link>
            {detail.name? 
                    <div>
                    <p className={styles.name}>{detail.name}</p>
                    <img className={styles.image} src={detail.image} alt="detail"></img>
                    <p>Temperament: <br/>{detail.temperaments}</p>
                    <p>Weight: min:{detail.min_weight} max:{detail.max_weight} kgs</p>
                    <p>Height: min:{detail.min_height} max:{detail.max_height} cmts</p>
                    <p>Life span: {detail.life_span} years</p>
                    {/* {detail.life_span && <p>Life span: {detail.life_span} years</p> } */}
                    
                </div>
            : <div> Loading...  </div>
            // setTimeout(()=>{return (<div> We couldn´t find that breed...  </div>)},3000)
            }
    
        </div>
    )
}

function mapStateToProps (state) {
    return {detail: state.detail}
}

export default connect(mapStateToProps,{getDetail,resetDetail})(Detail)