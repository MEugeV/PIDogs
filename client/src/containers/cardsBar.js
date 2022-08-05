import {React, useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import { searchName, resetDogs,filterDogs, orderDogs } from "../redux/actions"
import Order from "../components/order"
import SearchBar from "../components/searchBar"
import Filters from "../components/filters"
import styles from "../styles/cardsBar.module.css"

export default function CardsBar (props) {

    
    const initialFilter={
        temperament: "All",
        source: "All"
    }

    const dogs = useSelector((state) => state.dogs)     
    
    const [search,setSearch] =useState("")
    const [searched,setSearched] =useState("") //para mostrar la seleccion sólo luego del submit
    const[filter, setFilter] = useState(initialFilter)

    const dispatch = useDispatch()



    //search
    function handleChange (e) { 
        setSearched("")
        setSearch(e.target.value)
     }
    
    
    function handleSearch (e) {
        e.preventDefault()
        console.log(e.target.value)
        dispatch(searchName(search))
        if(dogs.find(el=>el.name.toLowerCase().includes(search.toLowerCase()))) {setSearched(search)} 
        e.target.reset()//setSearch no xq me limpia el searched tb
        Array.prototype.map.call(document.querySelectorAll("#filter"), el=>el.value="All")
        document.querySelector("#alphabetical").value="Select"
        document.querySelector("#weight").value="Select"
        setFilter(initialFilter)
    }

    //filter
    function handleFilter(e) {
        setFilter({...filter,[e.target.name]: e.target.value})
        dispatch(filterDogs({...filter,[e.target.name]: e.target.value}))
        document.querySelector("#alphabetical").value="Select"
        document.querySelector("#weight").value="Select"
        setSearched("")
    }

    //order
    function handleOrder(e) { 
        dispatch(orderDogs(e.target.value))
        e.target.id==="alphabetical" && (document.querySelector("#weight").value="Select")
        e.target.id==="weight" && (document.querySelector("#alphabetical").value="Select")
    }

    //search y reload
    function resetFilters (e) {
        setSearched("")
        dispatch(resetDogs())
        Array.prototype.map.call(document.querySelectorAll("#filter"), el=>el.value="All")
        document.querySelector("#alphabetical").value="Select"
        document.querySelector("#weight").value="Select"
        setFilter(initialFilter)
}

    return (
        <div className={styles.cardBar}>
             <div className={styles.search}>
                 <SearchBar 
                    searched={searched} 
                    search={search} 
                    handleSearch={handleSearch} 
                    handleChange={handleChange}>
                </SearchBar>
             </div>
             <div className={styles.filterOrder}>
                 <Filters 
                    handleFilter={handleFilter} 
                    temperaments={props.temperaments}>    
                </Filters>
                <button 
                    className={styles.buttonSelection} 
                    onClick={resetFilters}>
                        Reset
                </button>
                 <Order 
                    handleOrder={handleOrder}>    
                </Order>
             </div>
        </div>

    )

}
