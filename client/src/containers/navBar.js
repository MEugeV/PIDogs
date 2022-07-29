import {React, useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import { searchName, resetDogs,filterDogs, orderDogs } from "../redux/actions"
import {Link} from "react-router-dom"
import Order from "../presentacionales/order"
import SearchBar from "../presentacionales/searchBar"
import Filters from "../presentacionales/filters"
import styles from "../styles/navBar.module.css"


export default function NavBar () {

    const [search,setSearch] =useState("")
    // const [error,setError] =useState()
    // const [disabled, setDisabled] = useState(true)
    const [searched,setSearched] =useState("")
    const[filter, setFilter] = useState({
        temperament: "All",
        source: "All"
    })

    const temperaments = useSelector((state) => state.temperaments) //no se puede llamar antes del componente
    const dispatch = useDispatch()


    //no se limpia y va uno más atras
    function handleChange (e) {  //me cambiaba el filter al mismo momento que el state..
        setSearched("")
        setSearch(e.target.value)
        // if(!(/^[A-Z áéíóúüñ]+$/i.test(e.target.value) ||/[\t\h]+|(^$)/.test(e.target.value))) { //si es vacio me da error, tengo que darle la op de que este sin completar
        //     setError("The search must not contain numbers or special characters")
        //     setDisabled(true)
        // } else {
        //     setError("")
        //     if(e.target.value) {
        //         setDisabled(false)
        //     } else {
        //         setDisabled(true)
        //     }
        // }
    }

    function handleSearch (e) {
        e.preventDefault()
        dispatch(searchName(search))
        setSearched(search)
            // // console.log(search)
        e.target.reset() //setSearch("")
        // searchName(e.target.value)
        //querySelectorAll does not return an array, it returns a NodeList.
        Array.prototype.map.call(document.querySelectorAll("#filter"), el=>el.value="All")
        // Array.prototype.map.call(document.querySelectorAll(".order"), el=>el.value="Select")

        document.querySelector("#alphabetical").value="Select"
        document.querySelector("#weight").value="Select"
        // document.querySelector("#temperament").value="default"
        // document.querySelector("#source").value="default"
    }

    function handleUnSearch (e) {
        e.preventDefault()
        dispatch(resetDogs())
        setSearched("")
        Array.prototype.map.call(document.querySelectorAll("#filter"), el=>el.value="All")
        // Array.prototype.map.call(document.querySelectorAll(".order"), el=>el.value="Select")
        document.querySelector("#alphabetical").value="Select"
        document.querySelector("#weight").value="Select"

    }
    // function handleSearch (e) {
    //     e.preventDefault()
    //     console.log(e.target.value)
    //     // searchName(e.target.value)
    // }

    function handleFilter(e) {
        setFilter({...filter,[e.target.name]: e.target.value})
        // filter={...filter,[e.target.name]: e.target.value}
        // console.log(filter)
        dispatch(filterDogs({...filter,[e.target.name]: e.target.value}))
        // dispatch(filterDogs(filter))
        // Array.prototype.map.call(document.querySelectorAll(".order"), el=>el.value="Select")
        document.querySelector("#alphabetical").value="Select"
        document.querySelector("#weight").value="Select"
        setSearched("")

    }

    function handleOrder(e) { //VER SI AL A-Z, MIN-MAX ME DEJA SELECCIONAR NUEVAMENTE A-Z O TENGO QUE HACER UN MANEJO DEL SELECT TAMBIÉN
        dispatch(orderDogs(e.target.value))
        //para que no se queden seleccionados y no pueda volver a seleccinoar a-z luego de hacer min-max..
        e.target.id==="alphabetical" && (document.querySelector("#weight").value="Select")
        e.target.id==="weight" && (document.querySelector("#alphabetical").value="Select")
    
        // e.target.value="default"
        // setOrder({...order,ordered:e.target.value}) 
        // console.log(order)
    }

//disabled={disabled}
    return (
        <div className={styles.navBar}>
            <div className={styles.links}>
            {/* <div> */}
            <Link className={styles.links} to="/">DogBreeds Place</Link>
            {/* </div>
            <div> */}
            <Link className={styles.links} to="/form">Create your breed</Link>
            {/* </div> */}
            </div>
            <div className={styles.search}>
            <SearchBar searched={searched} search={search} handleSearch={handleSearch} handleChange={handleChange} handleUnSearch={handleUnSearch}></SearchBar>
            {/* <div> */}
            </div>
            <div className={styles.filterOrder}>
            <Filters handleFilter={handleFilter} temperaments={temperaments}></Filters>
            <Order handleOrder={handleOrder}></Order>
            </div>
        </div>

    )

}

//value={search}