const {Router} = require ("express")
const {getTemperaments}= require("../controllers/temperamentsControllers")

const routes = Router()

routes.get("/", async (req, res, next)=>{
    try {
        const temperaments= await getTemperaments ()

        res.send(temperaments.sort((a,b)=>{if(a.name.toLowerCase()<b.name.toLowerCase()) {return -1} else if (a.name.toLowerCase()>b.name.toLowerCase()) {return 1} else {return 0}}))
    } catch (error) {
        next(error)
    }

})


module.exports= routes;
