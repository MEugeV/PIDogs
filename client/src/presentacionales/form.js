import React, { useEffect } from "react"
import { connect } from "react-redux"
import {Link, useHistory} from "react-router-dom"
import { useState } from "react"
import validate from "../functions/validateForm"
import { postDog, getDogs, searchName } from "../redux/actions"
import styles from "../styles/form.module.css"
import img from "../styles/pictures/walldogs.jpg"
const defaultDog="https://media.istockphoto.com/vectors/cartoon-dog-happy-head-face-silhouette-cute-pooch-character-kawaii-vector-id1055461378?b=1&k=20&m=1055461378&s=170667a&w=0&h=B_CPOp6vXDzAcusxwMzzpqijesUmjtbZU1dbiyGLTzY="


function Form ({dogs,temperamentsList,getDogs}) {

const history= useHistory()
useEffect(()=>{
    document.querySelector("#submit").disabled=true
},[])

let initialState={ 
    name:"",  
    image:"", 
    temperaments:[], 
    min_weight: "",
    max_weight: "",
    min_height: "",
    max_height: "",
    life_span: ""
}

const [state, setState] = useState(initialState)
const[error, setError] = useState({})
 

function handleChange (e) {
    setState({...state,[e.target.name]:e.target.value})
    setError(validate ({...state,[e.target.name]:e.target.value}, dogs)) 
}

function selecTemp (e) {
    if(!(state.temperaments.find(el=>el===e.target.value))) {
        setState({...state,temperaments:[...state.temperaments,e.target.value]})
        setError(validate ({...state,temperaments:[...state.temperaments,e.target.value]},dogs)) 
        document.querySelector("#temperaments").value="Temperaments"
    } else { 
        alert("Temperament already added")
        document.querySelector("#temperaments").value="Temperaments"
    }
}

function deSelectTemp (e) {
    setState({...state, temperaments: state.temperaments.filter(el=>el!==e.target.value)})
    setError(validate ({...state, temperaments: state.temperaments.filter(el=>el!==e.target.value)},dogs))
}

function handleSubmit (e) {
    e.preventDefault()
    if(!state.image) {
        postDog({
            ...state,
            image: defaultDog,
            name: state.name.split(" ").map(el=>el.slice(0,1).toUpperCase()+el.slice(1).toLowerCase()).join(" ")
        })
    } else {
        postDog({
            ...state,
            name: state.name.split(" ").map(el=>el.slice(0,1).toUpperCase()+el.slice(1).toLowerCase()).join(" ")
        })
    }    
    setState(initialState)
    // getDogs()
    history.push(`/home`)
}

    return (
        <div className={styles.form}>
            <div className="head">
                <Link id="landing" className="headLinks" to="/">DogBreeds Place</Link>
                <Link className="headLinks" to="/home" >Home</Link>
            </div>
            <h3 className={styles.tittle}>Add a Dog Breed!..</h3>
            <div className={styles.imgDiv}>

            <img className={styles.img} src={img} alt="dogs"/>
            </div>
            <form className={styles.formBox} onSubmit={handleSubmit}>
                {/* <div className={styles.formInputs}> */}
                <div className={styles.selection}>
                    <div className={styles.selection2}>
                        <label to="name" >Name:</label>
                        <input type="text" name="name" value={state.name} onChange={handleChange} placeholder=".." id="names" ></input> 
                        <span>{error.name && error.name}</span>                        
                    </div>
                    <div className={styles.selection2}>
                        <label to="image">Picture: </label>
                        <input type="text" name="image" value={state.image} onChange={handleChange} placeholder="URL or data:image.."></input> 
                        <span>{error.image && error.image}</span>
                    </div>
                    <div className={styles.maxMin}>
                        <div className={styles.selection3}>
                            <label to="min_weight">Min weight: </label>
                            <input type="text" name="min_weight" value={state.min_weight} onChange={handleChange} placeholder="kgs.."></input> 
                        </div>
                        <div className={styles.selection3}>
                            <label to="max_weight">Max weight: </label>
                            <input type="text" size="30" name="max_weight" value={state.max_weight} onChange={handleChange} placeholder="kgs.."></input> 
                        </div>
                    </div>
                            <span>{error.min_weight && error.min_weight}</span>
                            <span>{error.max_weight && error.max_weight}</span>
                    <div className={styles.maxMin}>
                        <div className={styles.selection3}>
                            <label to="min_height">Min height: </label>
                            <input type="text" size="30" step="0.01" min="0.15" max="105" name="min_height" value={state.min_height} onChange={handleChange} placeholder="cms.."></input> 
                        </div>
                        <div className={styles.selection3}>
                            <label to="max_height">Max height: </label>
                            <input type="text" size="30" name="max_height" value={state.max_height} onChange={handleChange} placeholder="cms..."></input> 
                        </div>
                    </div>
                            <span>{error.min_height && error.min_height}</span>
                            <span>{error.max_height && error.max_height}</span>
                    <div className={styles.selection2}>
                        <label to="life_span">Years of life span: </label>
                        <input type="text" name="life_span" value={state.life_span} onChange={handleChange}  placeholder="E.g. 10 or 10-15" ></input> 
                        <span>{error.life_span && error.life_span}</span>
                    </div>
                {/* </div> */}
                {/* <input type="select"></input> */}
                {/* seleccionas de a uno --- y hago que al seleccionar lo empuje y vuelva a la primer option que le voy a poner selecciona uno o mas temperamentos y configuro que a ese no lo pushee???*/}
                {/* <div className={styles.tempCont}> */}
                    <div className={styles.selection2}>
                        <label to="temperaments">Temperaments: </label>
                        <select id="temperaments" name="temperaments" onChange={selecTemp} defaultValue="Temperaments">
                            {/* <option value="" selected="false" disabled >Temperaments</option> lo quiero pero llora */}
                            {/* selected={true}, MEJOR DEFAULT VALUE EN SELECT ME PEDÍA REACT */}
                            <option value="Temperaments"  disabled="disabled" >Select</option>
                            {/* {temperamentsList?.map(el=>(<option key={el.id} value={[el.id,el.name]}>{el.name}</option>))} //cambio sin name */}
                            {temperamentsList?.map(el=>(<option key={el.id} value={el.id}>{el.name}</option>))}
                        </select>
                        <span>{error.temperaments && error.temperaments}</span>
                        {/* {state.temperaments?.map(el=>(<span key={el.id}>{el.name} <button value={el.id} onClick={deSelect}>X</button></span>))} //cambio sin name*/}
                    </div>
                    <div className={styles.tempList}>
                        {state.temperaments?.map(el=>(<span key={el}>{temperamentsList?.find(temp=>temp.id===parseInt(el)).name} <button className={styles.buttonTemp}value={el} onClick={deSelectTemp}>X</button></span>))}
                    </div>
                        <div className={styles.submitError}> {error.required && error.required}</div>
                {/* </div> */}
                <input className={styles.submit} id="submit" type="submit" value="Send" ></input>
                </div>

            </form>
        </div>
    )
}

function mapStateToProps(state) {  //useSelector
    return {
        dogs : state.dogs,
        temperamentsList: state.temperaments,
        shownDogs: state.shownDogs
    }
}

export default connect (mapStateToProps,{getDogs,searchName})(Form) //{postDog}, no es una acción, no voy a hacer un dispatch al reducer


