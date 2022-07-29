import {React, useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import { filterDogs, orderDogs } from "../redux/actions"




export default function FilterOrder () {

//filtro que me resetee el search (que elimine la seleccion.., pero como hago si es otro componente y seria cambiar su estado local searched..., tendre que juntar todo en una nav bar) y me filtre ambos juntos, pero poniendo condiciones
//orden, siempre sobre el shown, no afecta, no cambia los componentes, acomoda lo que haya..
//no tengo que acumular los filtros de temperament, tengo que volver a alldogs, y filtrar tambien lo que haya en created o api.
//filter es sobre alldogs.. puedo poner un tercer paso intermedio para que el search pueda continuar.. alldogs, searchdogs, filterdogs, y hacer los filtros sobre searchdogs en lugar de destildarlo, de este modo el form valida sobre todo la existencia, pero en el primer get cargo tres, en el search cargo dos..
//

    const temperaments = useSelector((state) => state.temperaments) //no se puede llamar antes del componente
    const dispatch = useDispatch()

    //para poder hacerlos conjuntos, sino no me conserva el cambio anterior en la variable
    const[filter, setFilter] = useState({
        temperament: "All",
        source: "All"
    })

    // let filter={
    //     temperament: "All",
    //     source: "All"
    // }
    
    // const[order, setOrder] = useState({
    //     ordered: ""
    // })
    
    //si no seteo filter en el estado, al hacer una nueva seleccion no me la guarda en la variable para la proxima, entonces me setea la otra en all y no me deja tomarlas conjuntas
    function handleFilter(e) {
        setFilter({...filter,[e.target.name]: e.target.value})
        // filter={...filter,[e.target.name]: e.target.value}
        dispatch(filterDogs({...filter,[e.target.name]: e.target.value}))
        // dispatch(filterDogs(filter))
        document.querySelector("#alphabetical").value="default"
        document.querySelector("#weight").value="default"
    }

    //puedo hacerlo sin estado local... sacarlos
    function handleOrder(e) { //VER SI AL A-Z, MIN-MAX ME DEJA SELECCIONAR NUEVAMENTE A-Z O TENGO QUE HACER UN MANEJO DEL SELECT TAMBIÉN
        dispatch(orderDogs(e.target.value))
        // e.target.value="default"
        // setOrder({...order,ordered:e.target.value}) 
        // console.log(order)
    }

    return (
        <div>
            <div>
            Filter Breeds By.. 
            <div>
            <label to="temperament">Temperament</label>
            <select name="temperament" onChange={handleFilter}>
                {/* <option selected="false" disabled>All</option> */}
                <option >All</option>
                {temperaments?.map(el=>(<option key={el.id}>{el.name}</option>))}
            </select>
            </div>
            <label to="source">Source</label>
            <select name="source" onChange={handleFilter}>
                {/* <option selected="false" disabled>All</option> */}
                <option >All</option>
                <option >Existent</option>
                <option value="Created">Created</option>
            </select>
            </div>
            <div>
            Order Breeds By.. 
            <div>
            <label to="alphabetical">Alphabetically</label>
            <select id="alphabetical" name="alphabetical" onChange={handleOrder} defaultValue="default">
                {/* <option selected="false" disabled>Not selected</option> */} VER
                {/* <option >Not selected</option> //no podes deshacer el orden */}
                <option value="default" disabled="disabled" >Select</option>
                <option >a-z</option>
                <option >z-a</option>
            </select>
            </div>
            <div>
            <label to="weight">Average weight</label>
            <select id="weight" name="weight" onChange={handleOrder} defaultValue="default">
                {/* <option selected="false" disabled>Not selected</option>VER */}
                {/* <option >Not selected</option> */}
                <option value="default" disabled="disabled">Select</option>
                <option >min-max</option>
                <option >max-min</option>
            </select>
            </div>
            </div>
        </div>
    )
}

