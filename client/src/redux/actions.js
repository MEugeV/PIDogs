import axios from "axios"

export const GET_TEMPERAMENTS= "GET_TEMPERAMENTS" 
export const GET_DOGS= "GET_DOGS" 
export const GET_DETAIL= "GET_DETAIL" 
export const RESET_DETAIL= "RESET_DETAIL" 
export const SEARCH_NAME= "SEARCH_NAME"
export const RESET_DOGS= "RESET_DOGS"
export const FILTER_DOGS= "FILTER_DOGS"
export const ORDER_DOGS= "ORDER_DOGS"
export const SET_PAGE= "SET_PAGE"
// export const VALIDATE_NAME= "VALIDATE_NAME"

// export const POST_DOG= "POST_DOG" 

// export function getDogs(payload) {
//             return {type: GET_DOGS, payload }
//         }

// export function getTemperaments() {
//         return {type: GET_TEMPERAMENTS, payload: ["temp1","temp2"]}
//     }

export function setPage (page) {
    return {type: SET_PAGE, payload: page}
}

export function filterDogs (filter) {
    return {type: FILTER_DOGS, payload: filter}
}

export function orderDogs (order) {
    return {type: ORDER_DOGS, payload: order}
}

export function getDogs() {  //.json() o data.data el fetch o axios adentro de la funcion del thunk, retornar esta funcion y el fetch o el axios
    return (dispatch) =>{
    return axios("http://localhost:3001/dogs")
    .then(data=> dispatch({type: GET_DOGS, payload: data.data }))

    // return function (dispatch) {
    //     return fetch("http://localhost:3001/dogs")
    //     .then(data=> data.json())
    //     .then(data=> dispatch({type: GET_DOGS, payload: data }))
    
}
}

export function getTemperaments() {
    // return async (dispatch) => {
    // const data= await axios.get("http://localhost:3001/temperaments")
        
    // dispatch({type: GET_TEMPERAMENTS, payload: data.data}) //retorno o dispatcho
    //     // return {type: GET_TEMPERAMENTS, payload: data.data} //también puedo retornar el objeto directamente

    return async (dispatch) => {
    const data= await fetch("http://localhost:3001/temperaments")
    const dataJson=  await  data.json() 
    dispatch({type: GET_TEMPERAMENTS, payload: dataJson}) //retorno o dispatcho
        // return {type: GET_TEMPERAMENTS, payload: dataJson} //también puedo retornar el objeto directamente
    }
}

//dispatch y asincrono

export function getDetail (id) {
    
        return async function (dispatch) {
            try {
                const data= await fetch(`http://localhost:3001/dogs/${id}`)
                const dataJson= await data.json()
                dispatch({type: GET_DETAIL, payload: dataJson })
            } catch(e) {
                alert("We could´t find this detail...")
            }
        
        }
    }

export function resetDetail () {
    return {type: RESET_DETAIL}
}

export function resetDogs () {
    return {type: RESET_DOGS}
}

export function searchName(name) {
    return function (dispatch){
        axios.get(`http://localhost:3001/dogs`,{params:{name:name}}) //con query no funciona,, pero lo recibe por query.. http://localhost:3001/dogs?name=terrier
        .then(data=> dispatch({type:SEARCH_NAME, payload: data.data}))
    }
}

export async function postDog(created) {
    // return async function () {
        await axios.post(`http://localhost:3001/dogs`,created)
    // }
    console.log(created)
    // return await axios.post(`http://localhost:3001/dogs`,created)
    // .then(result=>console.log("Breed succesfully posted"))
}

// export function validateName (name) {
//     return function (dispatch){
//         axios.get(`http://localhost:3001/dogs`,name)
//         .then(data=> dispatch({type:VALIDATE_NAME, payload: data.data}))
//     }
// }