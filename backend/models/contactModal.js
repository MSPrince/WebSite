const { Schema, model} = require("mongoose");

const contactSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: true },
  subject: { type: String }, // Optional subject field
  address: {  type: String },
},
 { timestamps: true }
);


const Contact = new  model("Contact", contactSchema);

module.exports = Contact;


