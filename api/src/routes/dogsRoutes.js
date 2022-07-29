const {Router}= require ("express")
const{getDogs, postDog, getDetail} = require ("../controllers/dogsControllers")


const routes= Router()

routes.get("/", async (req,res,next)=>{
    /////si ya pidieron y no hubo cambios lo tengo que enviar igual, en donde tengo que manejar de no pedir cuando no necesito es en el front//////
    const {name}= req.query
    try {
        const dogs=await getDogs()
        
        if(!name) {
            res.status(200).send(dogs)
        } else {
            const dogsFilteredByName= dogs.filter(dog=>dog.name.toLowerCase().includes(name.toLowerCase()))

            res.status(200).send(dogsFilteredByName)
            //de lo contrario no me renderiza nada cuando no encuentra y pareciera que no hace nada..
            // dogsFilteredByName.length > 0 ? res.status(200).send(dogsFilteredByName) : res.status(500).send("There are not Dogs found with that breed")
        }

    } catch (error) {
        next(error)
    }

})

routes.get("/:id", async (req,res,next)=> {

    const {id}= req.params

    try {
        const detail= await getDetail(id)
        res.status(200).send(detail)
    } catch (error) {
        next(error)
    }

})

routes.post("/", async (req,res,next)=>{

    const {
        name, 
        image, 
        min_height, 
        max_height, 
        min_weight, 
        max_weight, 
        life_span,
        temperaments
    }= req.body

    if(!name || !min_height || !max_height || !min_weight || !max_weight || !temperaments) {
 
        res.status(500).send("Name, min-max heigth, min-max weight and temperaments are required")}  

    try{
        
        const newDog= await postDog(
            name, 
            image, 
            min_height, 
            max_height, 
            min_weight, 
            max_weight, 
            life_span,
            temperaments)
        
        res.status(200).send(newDog)

    } catch (error) {

        next(error)

    }


})

module.exports = routes