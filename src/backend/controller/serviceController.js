const Service = require("../models/serviceModal")

const services = async(req,res)=>{
    try {
        const response = await Service.find();
        if(!response){
            return res.status(404).json({msg:"No services found"})
        }
        res.status(200).json({msg: response});

        
        
    } catch (error) {
        console.error(error);
        
    }
}
module.exports = services;