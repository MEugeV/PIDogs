import React from "react"
import {Link} from "react-router-dom"

export default function Default (){
    return (
        <div>
            La página que estás buscando no existe.
            <br/>
            <Link to="/home" >Return to home</Link>
        </div>


    )
}