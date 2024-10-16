const { Schema, model } = require("mongoose");

const LabTestSchema = new Schema({
  testName: { type: String, required: true },
  testCoverImg: String,
  testCategory: String,
  testDescription: { type: String, required: true },
  mrp: { type: Number, required: true },
  realprice: { type: Number, required: true },
  sampleType: { type: String, required: true },
  specialInstruction: { type: String, required: true },
  category: String,
  tat:{type: String, required: true },
  // Change includeTest to be an object
  includeTest: { type: Object, required: true },
});

const LabTest = model("LabTest", LabTestSchema);
module.exports = LabTest;
