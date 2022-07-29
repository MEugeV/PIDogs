
// const dogs = useSelector(store => store.dogs)

export default function validate (state,dogs,err={}) {   ///AL SUBMITEAR VALIDAR QUE NINGUN CAMPO ESTE VACIO O CUANDO EMPIEZA A ESCRIBIR OTRO???
    if(!state.name) {
        err.name="Name is required"
    } else {
        if(!(/^[A-Z áéíóúüñ]+$/i.test(state.name))) {  //    INCLUIRLA TAMBIEN EN EL MODELO!!!!!!!!!!!!!!
            err.name="The name of the breed must not contain numbers or special characters"
        } else if (dogs.find(el=>el.name.toLowerCase()===state.name.toLowerCase())) {
            err.name=`The breed "${state.name.toUpperCase()}" already exists`
        }
        
}
    if(state.image) { 
        if(!(/^((ftp|http|https):\/\/)?([A-z-]+)\.([A-z]{2,})/.test(state.image) || /^data:image\/jpeg;/.test(state.image))) {  // ACTUALIZAR AMBAS EN EL MODELO!!!  /^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/ LA HAGO MAS INCLUSIVA PORQUE NO TODAS EMPIEZAN CON WWW
            err.image="The link must be an URL o ar jpeg data:image"
        }
}
    if(!state.min_weight) 
    {
        err.min_weight= "Minimun weight is required"
    }else { 
        if(!/^([0-9.])*$/.test(state.min_weight)) {
            err.min_weight="Minimun weight should be a number"
        } else if(parseFloat(state.min_weight) < 0.17 || parseFloat(state.min_weight) >= 150) {  // ACTUALIZAR AMBAS EN EL MODELO!!!  /^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/ LA HAGO MAS INCLUSIVA PORQUE NO TODAS EMPIEZAN CON WWW
            err.min_weight="Minimun weight should be greater than or equal to 0.17 kgs and lower than 150 kgs"
        }
}
    if(!state.max_weight) {
        err.max_weight= "Maximun weight is required"
    }else { 
        if(!/^([0-9.])*$/.test(state.max_weight)) {
            err.max_weight="Maximun weight should be a number"
        } else if(parseFloat(state.max_weight) > 150 || parseFloat(state.max_weight) <= 0.17 ) {  // ACTUALIZAR AMBAS EN EL MODELO!!!  /^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/ LA HAGO MAS INCLUSIVA PORQUE NO TODAS EMPIEZAN CON WWW
            err.max_weight="Maximun weight must be less than or equal to 150 kgs and higher tan 0.17 kgs"
        }
    }
    if(state.max_weight && state.min_weight) { 
        if(parseFloat(state.min_weight) >= parseFloat(state.max_weight)) {  // ACTUALIZAR AMBAS EN EL MODELO!!!  /^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/ LA HAGO MAS INCLUSIVA PORQUE NO TODAS EMPIEZAN CON WWW
            err.min_weight="Ming weight should be lower than max weight"
            err.max_weight="Max weight should be higher than min weight"
        }
    }
    if(!state.min_height) {
        err.min_height= "Minimun height is required"
    }else { 
        if(!/^([0-9.])*$/.test(state.min_height)) {
            err.min_height="Min height should be a number"
        } else if(parseFloat(state.min_height) < 15 || parseFloat(state.min_height) >= 105) {  // ACTUALIZAR AMBAS EN EL MODELO!!!  /^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/ LA HAGO MAS INCLUSIVA PORQUE NO TODAS EMPIEZAN CON WWW
            err.min_height="Min height should be greater than or equal to 15 cms and lower than 105 cms"
        }
    }
    if(!state.max_height) {
        err.max_height= "Maximun height is required"
    } else { 
        if(!/^([0-9.])*$/.test(state.max_height)) {
            err.max_height="Max height should be a number"
        } else if(parseFloat(state.max_height) < 15 || parseFloat(state.max_height) >= 105) {  // ACTUALIZAR AMBAS EN EL MODELO!!!  /^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/ LA HAGO MAS INCLUSIVA PORQUE NO TODAS EMPIEZAN CON WWW
            err.max_height="Max height must be less than or equal to 105 cms and higher tan 15 cms"
        }
    }
    if(state.max_height && state.min_height) { 
        if(parseFloat(state.min_height) >= parseFloat(state.max_height)) {  // ACTUALIZAR AMBAS EN EL MODELO!!!  /^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/ LA HAGO MAS INCLUSIVA PORQUE NO TODAS EMPIEZAN CON WWW
            err.min_height="Ming height should be lower than max height"
            err.max_height="Max height should be higher than min height"
        }
    }
    if(state.life_span) {
        if(!/^[0-9]{1,4}(-[0-9]{1,4})?$/.test(state.life_span)) {
            err.life_span="Please enter the years of life span, or the range of years of life span. E.g.10 or 10-15"
        } else if (state.life_span.split("-")[0]<5) {
            err.life_span="Minimum life span should be greater than or equal to 5 years old"
        } else if ((state.life_span.split("-")[1] || state.life_span.split("-")[0] )> 20) {
            err.life_span="Maximum life span should be less than or equal to 20 years old"
        } else if (parseInt(state.life_span.split("-")[1])<=parseInt(state.life_span.split("-")[0])) {
            err.life_span="Maximum life span should be greater than minimun life span"
        }
    }
    if(state.temperaments.length===0) {
        err.temperaments="You should select at least one temperament"
    }
    if(Object.entries(err).length<1) {document.querySelector("#submit").disabled=false} else {document.querySelector("#submit").disabled=true}
    return err
}
