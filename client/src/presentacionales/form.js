import React, { useEffect } from "react"
import { connect } from "react-redux"
import {Link, useHistory} from "react-router-dom"
import { useState } from "react"
import validate from "../functions/validateForm"
import { postDog, getDogs, searchName } from "../redux/actions"

function Form ({dogs,temperamentsList,shownDogs,getDogs,searchName}) {

    ///////////////////////LIFE SPAN QUE EL FORM PUEDA VALIDAR QUE PUEDA ESTAR VACIO, una cosa es que no lo mande y otra que lo mande vacio
    // Y  VER COMO ME LO MUESTRA EL DETAIL EN ESE CASO.... en el detail se muestra el campo y sin  numero, le voy a poner que lo renderice si no es falsy
const history= useHistory()
useEffect(()=>{

})

let initialState={ //no puedo crear nuevas props "A component is changing an uncontrolled input to be controlled.", entonces no puedo postear sin imagen para que tome el default del modelo,
    //entonces, le tengo que agregar la imagen en el handle.submit antes de postear para poner la imagen por defecto
    //no se porque no hace esto con el error....debe ser porque el error no toma con el input value..
    name:"",  
    image:"", //si no la agrego para que me pueda tomar el default desde el modelo, pero llora react
    // image:"https://thumbs.dreamstime.com/b/perro-del-signo-de-interrogaci%C3%B3n-104207739.jpg", //si lo hago así se ve en el form
    temperaments:[], //lo necesito para que no de error leyendo el length
    min_weight: "",
    max_weight: "",
    min_height: "",
    max_height: "",
    life_span: ""
}

const [state, setState] = useState(initialState)
const[error, setError] = useState({})
 

function handleChange (e) {
    // console.log(dogs[0].name)
    setState({...state,[e.target.name]:e.target.value})
    // setError((state)=>{validate (state)})
    setError(validate ({...state,[e.target.name]:e.target.value}, dogs)) //rompe si le paso el estado en una call back y si uso useEffect, solo asi no me dice que en validate no puede leer state.name
    //object entries error, pero tenia desfasaje asi que lo traigo del validate....
    // if(Object.entries(validate ({...state,[e.target.name]:e.target.value}, dogs)).length<1) {document.querySelector("#submit").disabled=false} else {document.querySelector("#submit").disabled=true}
    // console.log(document.querySelector("#names").value)
    // console.log(err)

}

//por más que necesito ver el name para poder eliminarlo, necesito enviar sólo el id al post
// function handleSelection (e) {
//     if(!(state.temperaments.find(el=>el.name===e.target.value.split(",")[1]))) {
//         // setState({...state,temperaments:[...state.temperaments,{id:e.target.value.split(",")[0], name:e.target.value.split(",")[1]}]})
//         setState({...state,temperaments:[...state.temperaments,{id:e.target.value.split(",")[0], name:e.target.value.split(",")[1]}]})
//         console.log(state)
//     } else { alert("Temperament already added")}
// }

function handleSelection (e) {
    if(!(state.temperaments.find(el=>el===e.target.value))) {
        // setState({...state,temperaments:[...state.temperaments,{id:e.target.value.split(",")[0], name:e.target.value.split(",")[1]}]})
        setState({...state,temperaments:[...state.temperaments,e.target.value]})
        setError(validate ({...state,temperaments:[...state.temperaments,e.target.value]}   , dogs)) //rompe si le paso el estado en una call back y si uso useEffect, solo asi no me dice que en validate no puede leer state.name
        // console.log(state)
        // console.log(temperamentsList?.find(temp=>temp.id==e.target.value)) //.name
    } else { alert("Temperament already added")}

    // if(Object.entries(validate ({...state,[e.target.name]:e.target.value}, dogs)).length<1) {document.querySelector("#submit").disabled=false} else {document.querySelector("#submit").disabled=true}

}

// function deSelect (e) {
//     setState({...state, temperaments: state.temperaments.filter(el=>el.id!==e.target.value.split(",")[0])})
// }

function deSelect (e) {
    setState({...state, temperaments: state.temperaments.filter(el=>el!==e.target.value)})
    setError(validate ({...state, temperaments: state.temperaments.filter(el=>el!==e.target.value)}, dogs)) //rompe si le paso el estado en una call back y si uso useEffect, solo asi no me dice que en validate no puede leer state.name
    // if(Object.entries(validate ({...state, temperaments: state.temperaments.filter(el=>el!==e.target.value)}, dogs)).length<1) {document.querySelector("#submit").disabled=false} else {document.querySelector("#submit").disabled=true}
}

function handleSubmit (e) {
    e.preventDefault()
    if(!state.image) { //no me sirve porque no se actualiza antes de postear
        // setState({...state,image: "https://thumbs.dreamstime.com/b/perro-del-signo-de-interrogaci%C3%B3n-104207739.jpg"})
        postDog({
            ...state,
            image: "https://media.istockphoto.com/vectors/cartoon-dog-happy-head-face-silhouette-cute-pooch-character-kawaii-vector-id1055461378?b=1&k=20&m=1055461378&s=170667a&w=0&h=B_CPOp6vXDzAcusxwMzzpqijesUmjtbZU1dbiyGLTzY=",
            name: state.name.split(" ").map(el=>el.slice(0,1).toUpperCase()+el.slice(1).toLowerCase()).join(" ")
        })
    } else {
        postDog({
            ...state,
            name: state.name.split(" ").map(el=>el.slice(0,1).toUpperCase()+el.slice(1).toLowerCase()).join(" ")
        })
    }
    
    // if(dogs.find(el=>el.name===state.name)) {
    //     return alert(`The breed called ${state.name} already exists`)
    // } else if {

    // }}
    ////////////////////////////7SETEAR EL ESTADO EN VACIO
    console.log(state)
    setState(initialState)
    getDogs()
    history.push(`/home`)  //tendria que buscar dog name, traerme el id y despues pushearlo, pero el id no se actualiza en esta misma funcion...

}
// useEffect ((state)=>{

// },[state])

    return (
        <div>
            Form
            <br/>
            <Link to="/home" >Return to home</Link>
            <form onSubmit={handleSubmit}>
                <label to="name">Breed name: </label>
                <input type="text" name="name" value={state.name} onChange={handleChange} placeholder=".." id="names" ></input> 
                <span>{error.name && error.name}</span>
                {/* value={state.name} No hace falta que este porque igual lo actualiza */}
                <br/>
                <label to="image">Breed exponent picture: </label>
                <input type="text" name="image" value={state.image} onChange={handleChange} placeholder="URL or data:image.."></input> 
                <span>{error.image && error.image}</span>
                <br/>
                <label to="min_weight">Min weight: </label>
                <input type="text" name="min_weight" value={state.min_weight} onChange={handleChange} placeholder="kgs.."></input> 
                <span>{error.min_weight && error.min_weight}</span>
                <br/>
                <label to="max_weight">Max weight: </label>
                <input type="text" name="max_weight" value={state.max_weight} onChange={handleChange} placeholder="kgs.."></input> 
                <span>{error.max_weight && error.max_weight}</span>
                <br/>
                <label to="min_height">Min height: </label>
                <input type="text" step="0.01" min="0.15" max="105" name="min_height" value={state.min_height} onChange={handleChange} placeholder="cms.."></input> 
                <span>{error.min_height && error.min_height}</span>
                <br/>
                <label to="max_height">Max height: </label>
                <input type="text" name="max_height" value={state.max_height} onChange={handleChange} size="40" placeholder="cms..."></input> 
                <span>{error.max_height && error.max_height}</span>
                <br/>
                <label to="life_span">Years of life span: </label>
                <input type="text" name="life_span" value={state.life_span} onChange={handleChange} size="40" placeholder="E.g. 10 or 10-15" ></input> 
                <span>{error.life_span && error.life_span}</span>
                <br/>
                {/* <input type="select"></input> */}
                {/* seleccionas de a uno --- y hago que al seleccionar lo empuje y vuelva a la primer option que le voy a poner selecciona uno o mas temperamentos y configuro que a ese no lo pushee???*/}
                <label to="temperaments">Select temperaments: </label>
                <select  name="temperaments" onChange={handleSelection} defaultValue="Temperaments">
                    {/* <option value="" selected="false" disabled >Temperaments</option> lo quiero pero llora */}
                    {/* selected={true}, MEJOR DEFAULT VALUE EN SELECT ME PEDÍA REACT */}
                    <option value="Temperaments"  disabled="disabled" >Temperaments</option>
                    {/* {temperamentsList?.map(el=>(<option key={el.id} value={[el.id,el.name]}>{el.name}</option>))} //cambio sin name */}
                    {temperamentsList?.map(el=>(<option key={el.id} value={el.id}>{el.name}</option>))}
                </select>
                <span>{error.temperaments && error.temperaments}</span>
                <br/>
                {state.temperaments?.map(el=>(<span key={el}>{temperamentsList?.find(temp=>temp.id===parseInt(el)).name} <button value={el} onClick={deSelect}>X</button></span>))}
                {/* {state.temperaments?.map(el=>(<span key={el.id}>{el.name} <button value={el.id} onClick={deSelect}>X</button></span>))} //cambio sin name*/}
                <br/>
                <div> {error.required && error.required}</div>

                {/* INHABILITARLO HASTA QUE NO HAYA ERRORES y que esten completos todos los campos requeridos, aunque no tienen que mostrar errores mientras falten...
                O poner error required a todos apenas ingresas si estan vacios y son requeridos? */}
                <input id="submit" type="submit" ></input>
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

export default connect (mapStateToProps,{getDogs,searchName})(Form) //{postDog}, no es una acción, no voy a hacer un dispatch


                {/* seleccionas varios pero apretando control */}
                {/* <select multiple name="drawfs[]" id="drawfs">  ///los corchetes al final del name es para que lleguen todas las opciones
                    <option>Gruñón</option>
                    <option>Feliz</option>
                    <option>Dormilón</option>
                    <option>Tímido</option>
                    <option>Estornudo</option>
                    <option>Tontín</option>
                    <option>Doc</option>
                </select> */}


                // {/* <input type="select"></input> */}
                // {/* seleccionas de a uno --- y hago que al seleccionar lo empuje y vuelva a la primer option que le voy a poner selecciona uno o mas temperamentos y configuro que a ese no lo pushee???*/}
                // <label to="temperaments">Select temperaments: </label>
                // <select  name="temperaments" id="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX">
                // size="3" la etiqueta predeterminada tiene que ir primera y con el value vacio
                //     Cuando es utilizada en un elemento select, solo una opción en el control puede tener su atributo selected declarado.
                //     <option value="" selected="false" disabled >Temperamentos</option>
                //     <option value="2">Feliz</option>
                //     <option value="3">Dormilón</option>
                //     <option value="4">Tímido</option>
                //     <option value="5">Estornudo</option>
                //     <option value="6">Tontín</option>
                //     <option value="7">Doc</option>
                // </select>
                