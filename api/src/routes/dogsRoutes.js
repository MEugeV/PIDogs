const {Router}= require ("express")
// const {Dog}= require ("../db")
const{getDogs, postDog, getDetail} = require ("../controllers/dogsControllers")


const routes= Router()

routes.get("/", async (req,res,next)=>{
    const {name}= req.query
    try {
        const dogs=await getDogs()
        
        if(!name) {
            res.status(200).send(dogs)
        } else {
            const dogsFilteredByName= dogs.filter(dog=>dog.name.toLowerCase().includes(name.toLowerCase()))

            dogsFilteredByName.length<1? res.status(400).send("Empty search"): res.status(200).send(dogsFilteredByName)
            
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

// routes.delete("/:id", async(req,res,next)=>{
//     const{id}= req.params
//     try {
//         await Dog.destroy(
//             {where: {id:id}}
//         )
//         // await dogDelet(id)
//         res.status(200).send("Dog deleted")
//     } catch (e){
//         next(e)
//     }

// })

routes.post("/", async (req,res,next)=>{

    const {
        name, 
        image, 
        height,
        weight,
        life_span,
        temperaments,
        addTemperaments
    }= req.body

    if(!name || !height || !weight || !temperaments || temperaments.length===0) {
 
        res.status(500).send("Name, heigth, weight and temperaments are required")
    
    } else {

        try{        
            await postDog(
                name, 
                image, 
                height,
                weight,
                life_span,
                temperaments,
                addTemperaments)
            
            res.status(200).send("Dog created successfully")
    
        } catch (error) {
    
            next(error)
        }
    }


}
)

module.exports = routes