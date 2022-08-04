import { 
    GET_DOGS,
    GET_TEMPERAMENTS,
    GET_DETAIL,
    RESET_DETAIL,
    SET_PAGE,
    RESET_DOGS,
    SEARCH_NAME,
    FILTER_DOGS,
    ORDER_DOGS,
 } from "./actions"

const initialState= {
    dogs: [],
    shownDogs: [],
    temperaments: [],
    detail:{},
    page:1,
}

export default function reducer (state=initialState, action) {
    switch(action.type) {
        case GET_DOGS :
            return {
                ...state,
                dogs: action.payload,
                shownDogs: action.payload
            }
        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            }
        case GET_DETAIL:
            return {
                ...state,
                detail: action.payload
            }
        case RESET_DETAIL:
            return {
                ...state,
                detail: {}
            }
        case SET_PAGE: 
            return {
                ...state,
                page: action.payload
            }
        case RESET_DOGS:
            return {
                ...state,
                shownDogs: state.dogs,
                page: 1
            }            
        case SEARCH_NAME:
            return {
                ...state,
                shownDogs: action.payload,
                page: 1
            }
        case FILTER_DOGS:
            if(action.payload.temperament==="All" && action.payload.source==="All")  {
               return {...state,
                shownDogs: state.dogs,
                page: 1
            } 
            } else if (action.payload.temperament==="All") {
                return {
                    ...state,
                    shownDogs: state.dogs.filter(el=> 
                        action.payload.source==="Existent"
                        ? !isNaN(el.id) 
                        : isNaN(el.id)),
                    page: 1
                } 
            } else if (action.payload.source==="All") {
                return {
                    ...state,
                    shownDogs: state.dogs.filter (el=> el.temperaments.includes(action.payload.temperament)),
                    page: 1
                }
            } else {
                return {
                    ...state,
                    shownDogs: state.dogs.filter (el=> 
                        el.temperaments.includes(action.payload.temperament) 
                        && (action.payload.source==="Existent"
                        ? !isNaN(el.id) 
                        : isNaN(el.id))),
                    page: 1
                }
            }
        case ORDER_DOGS:  
            let stateCopy= [...state.shownDogs]
            if(action.payload==="a-z") {
                return {
                    ...state,
                    shownDogs: stateCopy.sort(function (a,b) {
                        if(a.name.toLowerCase()<b.name.toLowerCase()) {
                            return -1
                        } else if (a.name.toLowerCase()>b.name.toLowerCase()){
                            return 1
                        } else {
                            return 0}}),
                }
            } else if (action.payload==="z-a") {
                return {
                    ...state,
                    shownDogs: stateCopy.sort(function (a,b) {
                        if(a.name.toLowerCase()>b.name.toLowerCase()) {
                            return -1
                        } else if (a.name.toLowerCase()<b.name.toLowerCase()){
                            return 1
                        } else {
                            return 0}}),
                }
             }else if (action.payload==="min->max"){
                return {
                    ...state,
                    shownDogs: stateCopy.sort(function(a,b) {
                        if(((parseFloat(a.weight.split("-")[0])+parseFloat(a.weight.split("-")[1]))/2)<((parseFloat(b.weight.split("-")[0])+parseFloat(b.weight.split("-")[1]))/2)) {
                            return -1
                        } else if (((parseFloat(a.weight.split("-")[0])+parseFloat(a.weight.split("-")[1]))/2)>((parseFloat(b.weight.split("-")[0])+parseFloat(b.weight.split("-")[1]))/2)){
                            return 1
                        } else {
                            return 0}
                        }),
                }
            } else if (action.payload==="max->min") {
            return {
                ...state,
                shownDogs: stateCopy.sort(function(a,b) {
                    if(((parseFloat(a.weight.split("-")[0])+parseFloat(a.weight.split("-")[1]))/2)<((parseFloat(b.weight.split("-")[0])+parseFloat(b.weight.split("-")[1]))/2)) {
                        return 1
                    } else if (((parseFloat(a.weight.split("-")[0])+parseFloat(a.weight.split("-")[1]))/2)>((parseFloat(b.weight.split("-")[0])+parseFloat(b.weight.split("-")[1]))/2)){
                        return -1
                    } else {
                        return 0}
                    }),
            }
            } else {
                return {...state}
        }
        default :
            return {...state}
    }
}

