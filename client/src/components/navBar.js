import React from "react"
import {Link, NavLink} from "react-router-dom"

export default function NavBar () {

    return (
        <div className="head">
            <Link id="landing" className="headLinks" to="/">DogBreeds Place</Link>
            <NavLink activeClassName="headLinksActive" className="headLinks" to="/home">Home</NavLink>
            <NavLink activeClassName="headLinksActive" className="headLinks" to="/form">Create your breed</NavLink>
        </div>

    )

}