const {API_KEY} =process.env
const axios = require ("axios")
const {Temperament} = require("../db")

const api=`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`

const createTemperaments = async function() {

        
        const apiData= (await axios.get(api)).data
    
        const apiTemp= apiData.map(el=>el.temperament)
    
        const arrayOfTemp= (await Promise.all(apiTemp)).filter(dogTemp=>dogTemp!=null).join(", ").split(", ")
    
        const filterDupl=arrayOfTemp.filter((temperament,index)=>arrayOfTemp.indexOf(temperament)===index)
    
        const temperaments= await Promise.all(filterDupl.map(temperament =>({name: temperament})))
    
        await Temperament.bulkCreate(temperaments)
    
        return temperaments
    
 
}

const getTemperaments= async function () {

    return await Temperament.findAll()
    
}

module.exports ={
    createTemperaments,
    getTemperaments
}