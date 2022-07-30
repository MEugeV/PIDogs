import {React, useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import { searchName, resetDogs,filterDogs, orderDogs } from "../redux/actions"
import {Link} from "react-router-dom"
import Order from "../presentacionales/order"
import SearchBar from "../presentacionales/searchBar"
import Filters from "../presentacionales/filters"
import styles from "../styles/navBar.module.css"
import stylesII from "../styles/navTools.module.css"

export default function NavBar () {

    const [search,setSearch] =useState("")
    const [searched,setSearched] =useState("")
    const[filter, setFilter] = useState({
        temperament: "All",
        source: "All"
    })

    const temperaments = useSelector((state) => state.temperaments)     
    const dispatch = useDispatch()


    function handleChange (e) { 
        setSearched("")
        setSearch(e.target.value)
     }

    function handleSearch (e) {
        e.preventDefault()
        dispatch(searchName(search))
        setSearched(search)
        e.target.reset() //setSearch("")
        Array.prototype.map.call(document.querySelectorAll("#filter"), el=>el.value="All")
        document.querySelector("#alphabetical").value="Select"
        document.querySelector("#weight").value="Select"
    }

    function handleFilter(e) {
        setFilter({...filter,[e.target.name]: e.target.value})
        dispatch(filterDogs({...filter,[e.target.name]: e.target.value}))
        // Array.prototype.map.call(document.querySelectorAll(".order"), el=>el.value="Select")
        document.querySelector("#alphabetical").value="Select"
        document.querySelector("#weight").value="Select"
        setSearched("")

    }

    function handleOrder(e) { 
        dispatch(orderDogs(e.target.value))
        e.target.id==="alphabetical" && (document.querySelector("#weight").value="Select")
        e.target.id==="weight" && (document.querySelector("#alphabetical").value="Select")

    }

    function resetFilters (e) {
        setSearched("")
        dispatch(resetDogs())
        Array.prototype.map.call(document.querySelectorAll("#filter"), el=>el.value="All")
        // Array.prototype.map.call(document.querySelectorAll(".order"), el=>el.value="Select")
        document.querySelector("#alphabetical").value="Select"
        document.querySelector("#weight").value="Select"
}

    return (
        <div className={styles.navBar}>
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
                    temperaments={temperaments}
                    resetFilters={resetFilters}>    
                </Filters>
                <button className={styles.buttonSelection} onClick={resetFilters}>Reload</button>
                 <Order 
                    handleOrder={handleOrder}>    
                </Order>
             </div>
        </div>

    )

}
