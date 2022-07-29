const {API_KEY} =process.env
const axios = require ("axios")
const {Dog, Temperament} = require ("../db")
const {Op} = require ("sequelize")

let api=`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`

const getDogs = async function () {

    const dataApi= (await axios(api)).data

    const dogApiPromise= dataApi.map(async dog=>({
        id: dog.id,
        name: dog.name,
        image: dog.image.url,
        temperaments: dog.temperament || "n/a",
        //weight: [0], "NaN", "NaN" - [1]
        min_weight: dog.weight.metric.split(" - ")[0]==="NaN"? !dog.weight.metric.split(" - ")[1]? 24 : parseFloat(dog.weight.metric.split(" - ")[1])-1 : dog.weight.metric.split(" - ")[0],
        max_weight: dog.weight.metric.split(" - ")[1] || (dog.weight.metric.split(" - ")[0]==="NaN"? 25 : parseFloat(dog.weight.metric.split(" - ")[0])+1),
    }))
    const dogApi= await Promise.all(dogApiPromise)

    const dataDB= await Dog.findAll({include: {
        model: Temperament,
        attributes: ["name"],
        through: {attributes: []}
    }})

    const dogBDPromise = dataDB.map((dog)=> {
        return {
            id: dog.id,
            name: dog.name,
            image: dog.image,
            temperaments: dog.temperaments.map( el=>el.name).join(", "),
            min_weight: dog.min_weight,
            max_weight: dog.max_weight,
        }
    })

    const dogDB= await Promise.all(dogBDPromise)

    const allDogs=[...dogApi,...dogDB]

    return allDogs

}

const getDetail= async function (id) {
    
    if(isNaN(id)) {
        const dogDB= await Dog.findByPk(id,{
            include: {
                model: Temperament,
                attributes: ["name"],
                through: {attributes:[]}
        }})
        const detailDB = {
            id: dogDB.id,
            name: dogDB.name,
            image: dogDB.image,
            temperaments: dogDB.temperaments.map(el=>el.name).join(", "),
            min_weight: dogDB.min_weight,
            max_weight: dogDB.max_weight,
            min_height: dogDB.min_height,
            max_height: dogDB.max_height,
            life_span: dogDB.life_span || "n/a"
        }
        return detailDB //poner en el try el mensaje de error si es nulo, no llega a responder nulo porque antes se traba con el retorno......throw new error...
    } else {
        const dogApi= (await axios(api)).data.filter(dog=>dog.id==id)[0]

        const detailApi= {
            id: dogApi.id,
            name: dogApi.name,
            image: dogApi.image.url,
            temperaments: dogApi.temperament || "n/a",
            min_weight: dogApi.weight.metric.split(" - ")[0]==="NaN"? !dogApi.weight.metric.split(" - ")[1]? 24 : parseFloat(dogApi.weight.metric.split(" - ")[1])-1 : dogApi.weight.metric.split(" - ")[0],
            max_weight: dogApi.weight.metric.split(" - ")[1] || (dogApi.weight.metric.split(" - ")[0]==="NaN"? 25 : parseFloat(dogApi.weight.metric.split(" - ")[0])+1),
            min_height: dogApi.height.metric.split(" - ")[0],
            max_height: dogApi.height.metric.split(" - ")[1] || parseFloat(dogApi.height.metric.split(" - ")[0])+1,
            life_span:  dogApi.life_span.replace(" years","").replace(" Years","").replace(" - ","-").replace(" – ","-"), //no hay ninguno en filtro, seteo years en la DB
        }
        return detailApi
    }
}

const postDog = async function (name, image, min_height, max_height, min_weight, max_weight, life_span, temperaments) {

    const newDog= await Dog.create({
        name, 
        image, 
        min_height, 
        max_height, 
        min_weight, 
        max_weight, 
        life_span })

    newDog.setTemperaments(temperaments)

    return "Dog created successfully"
}


module.exports = {
    getDogs,
    postDog,
    getDetail
}