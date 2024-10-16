const Contact = require("../models/contactModal");


const contactForm = async(req, res)=>{
    try {
        const response = req.body;
        await Contact.create(response);
        return res.status(201).json({message: "Msg Send successfully😃"});
        
    } catch (error) {
         return res.status(500).json({ message: "Msg not Delivered😿" });
    }
}

module.exports = contactForm;