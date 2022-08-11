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
        //casos weight: [0], "NaN", "NaN" - [1]
        weight: 
        (dog.weight.metric.split(" - ")[0]==="NaN"? !dog.weight.metric.split(" - ")[1]? 24 : parseFloat(dog.weight.metric.split(" - ")[1])-1 : dog.weight.metric.split(" - ")[0]
        )+"-"+
        (!dog.weight.metric.split(" - ")[1]? dog.weight.metric.split(" - ")[0]==="NaN"? 25 : parseFloat(dog.weight.metric.split(" - ")[0])+1 : dog.weight.metric.split(" - ")[1])
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
            weight: dog.weight,
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
            weight: dogDB.weight,
            height: dogDB.height,
            life_span: dogDB.life_span || "n/a"
        }
        return detailDB 
    } else {
        const dogApi= (await axios(api)).data.filter(dog=>dog.id==id)[0] //devuelve array con un objeto

        const detailApi= {
            id: dogApi.id,
            name: dogApi.name,
            image: dogApi.image.url,
            temperaments: dogApi.temperament || "n/a",
            weight: 
            (dogApi.weight.metric.split(" - ")[0]==="NaN"? !dogApi.weight.metric.split(" - ")[1]? 24 : parseFloat(dogApi.weight.metric.split(" - ")[1])-1 : dogApi.weight.metric.split(" - ")[0])
            +"-"+
            (dogApi.weight.metric.split(" - ")[1] || (dogApi.weight.metric.split(" - ")[0]==="NaN"? 25 : parseFloat(dogApi.weight.metric.split(" - ")[0])+1))
            ,
            height: dogApi.height.metric.replace(" - ","-").replace(" – ","-"),    
            life_span:  dogApi.life_span.replace(" years","").replace(" Years","").replace(" - ","-").replace(" – ","-"),
        }
        return detailApi
    }
}

const postDog = async function (name, image, height, weight, life_span, temperaments, addTemperaments) {

    const newDog= await Dog.create({
        name, 
        image, 
        height,  
        weight, 
        life_span })

    newDog.setTemperaments(temperaments)
    
    const addTempToUpperCase=addTemperaments.map(el=>({name : el.name.split(" ").map(el=>el.slice(0,1).toUpperCase()+el.slice(1).toLowerCase()).join(" ")}))
    const promiseAddTemper=addTempToUpperCase.map(el=>newDog.createTemperament(el))
    await Promise.all(promiseAddTemper)

    return "Dog created successfully"
}


const dogDelet = async function (id) {
    await Dog.destroy({where: {id:id}})
}

module.exports = {
    getDogs,
    postDog,
    getDetail,
    dogDelet
}



        // min_weight: dog.weight.metric.split(" - ")[0]==="NaN"? !dog.weight.metric.split(" - ")[1]? 24 : parseFloat(dog.weight.metric.split(" - ")[1])-1 : dog.weight.metric.split(" - ")[0],
        // max_weight: dog.weight.metric.split(" - ")[1] || (dog.weight.metric.split(" - ")[0]==="NaN"? 25 : parseFloat(dog.weight.metric.split(" - ")[0])+1),

        // min_weight: dogApi.weight.metric.split(" - ")[0]==="NaN"? !dogApi.weight.metric.split(" - ")[1]? 24 : parseFloat(dogApi.weight.metric.split(" - ")[1])-1 : dogApi.weight.metric.split(" - ")[0],
            // max_weight: dogApi.weight.metric.split(" - ")[1] || (dogApi.weight.metric.split(" - ")[0]==="NaN"? 25 : parseFloat(dogApi.weight.metric.split(" - ")[0])+1),
            // min_height: dogApi.height.metric.split(" - ")[0],
            // max_height: dogApi.height.metric.split(" - ")[1] || parseFloat(dogApi.height.metric.split(" - ")[0])+1,
