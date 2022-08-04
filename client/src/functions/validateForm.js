
export default function validate (state,dogs,temperamentsList,err={}) {   
    if(state.name) {
        if(!(/^[A-Z áéíóúüñ]+$/i.test(state.name))) {  
            err.name="The name of the breed must not contain numbers or special characters"
        } else if (dogs.find(el=>el.name.toLowerCase()===state.name.toLowerCase())) {
            err.name=`The breed "${state.name.toUpperCase()}" already exists`
        }
    }
    if(state.image) { 
        if(!(/^((ftp|http|https):\/\/)?([A-z-]+)\.([A-z]{2,})/.test(state.image) || /^data:image\/jpeg;/.test(state.image))) {  
            err.image="The link must be an URL o ar jpeg data:image"
        }
    }
    if(state.min_weight) 
    {
        if(!/^([0-9.])*$/.test(state.min_weight)) {
            err.min_weight="Minimun weight should be a number"
        } else if(parseFloat(state.min_weight) < 0.17 || parseFloat(state.min_weight) >= 150) {  
            err.min_weight="Minimun weight should be greater than or equal to 0.17 kgs and lower than 150 kgs" //no igual porque debe ser menor al minimo
        }
    }
    if(state.max_weight) {
        if(!/^([0-9.])*$/.test(state.max_weight)) {
            err.max_weight="Maximun weight should be a number"
        } else if(parseFloat(state.max_weight) > 150 || parseFloat(state.max_weight) <= 0.17 ) {  
            err.max_weight="Maximun weight must be less than or equal to 150 kgs and greater than 0.17 kgs"
        }
    }
    if(state.max_weight && state.min_weight) { 
        if(parseFloat(state.min_weight) >= parseFloat(state.max_weight)) {  
            err.weight="Minimun weight should be lower than maximun weight"
        }
    }
    if(state.min_height) {
        if(!/^([0-9.])*$/.test(state.min_height)) {
            err.min_height="Min height should be a number"
        } else if(parseFloat(state.min_height) < 15 || parseFloat(state.min_height) >= 105) {  
            err.min_height="Min height should be greater than or equal to 15 cms and lower than 105 cms"
        }
    }
    if(state.max_height) {
        if(!/^([0-9.])*$/.test(state.max_height)) {
            err.max_height="Max height should be a number"
        } else if(parseFloat(state.max_height) <= 15 || parseFloat(state.max_height) > 105) {  
            err.max_height="Max height must be less than or equal to 105 cms and greater than 15 cms"
        }
    }
    if(state.max_height && state.min_height) { 
        if(parseFloat(state.min_height) >= parseFloat(state.max_height)) {  
            err.height="Minimun height should be lower than maximun height"
        }
    }
    if(state.min_life_span) {
        if(!/^([0-9.])*$/.test(state.min_life_span)) {
            err.min_life_span="Minimun life span should be a number"
        } else if(parseFloat(state.min_life_span) >= 20 || parseFloat(state.min_life_span) < 5 ) {  
            err.min_life_span="Minimun life span should be greater than or equal to 5 years and lower than 20 years"
        }
    }
    if(state.max_life_span) {
        if(!/^([0-9.])*$/.test(state.max_life_span)) {
            err.max_life_span="Maximun life span should be a number"
        } else if(parseFloat(state.max_life_span) > 20 || parseFloat(state.max_life_span) <= 5 ) {  
            err.max_life_span="Maximun life span must be less than or equal to 20 years and greater than 5 years"
        }
    }
    if(state.max_life_span && state.min_life_span) {
        if(parseFloat(state.min_life_span) >= parseFloat(state.max_life_span)) {  
            err.life_span="Minimun life span should be lower than maximun life span"
        }
    }
    if(state.newTemperament) {
        if(!(/^[A-Z áéíóúüñ]+$/i.test(state.newTemperament))) {  
            err.newTemperament="The temperament must not contain numbers or special characters"
        } else if (temperamentsList.find(el=>el.name.toLowerCase()===state.newTemperament.toLowerCase())) {
            err.newTemperament=`The temperament "${state.newTemperament.toLowerCase()}" already exists`
        } 
    }
    if(!err.newTemperament && state.newTemperament.length>0) {document.querySelector("#submitTemp").disabled=false} else {document.querySelector("#submitTemp").disabled=true}
    if(!state.name || !state.min_weight || !state.max_weight || !state.min_height || !state.max_height || state.temperaments.length===0) {
        err.required=`Add: ${!state.name? "Name," : ""} ${!state.min_weight? "Min weight," : ""} ${!state.max_weight? "Max weight," : ""} ${!state.min_height? "Min height," : ""} ${!state.max_height? "Max height," : ""} ${state.temperaments.length===0? "At Least One Temperament" : ""}`
    }
    if(Object.entries(err).length<1) {document.querySelector("#submit").disabled=false} else {document.querySelector("#submit").disabled=true}
    return err
}


