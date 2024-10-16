const {Schema , model , Mongoose}= require("mongoose");

const serviceSchema = new Schema({
    image:{type: String, required: true},
    service: {type: String, required: true},
    description: {type: String, required: true},
    
});

const Service = model('Service', serviceSchema);
module.exports = Service;