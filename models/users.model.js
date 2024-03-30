const mongoose = require("mongoose");
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a Name"],
  },
  age: {
    type: Number,
    required: [true, "Age is required"],
  },
  work: {
    type: String,
    required: [true, "Work field can't be empty"],
  },
  mobile: {
    type: String,
    required: [true, "Mobile number can not be empty"],
  },
  email: {
    type: String,
    required: [true, "Email id should be provided"],
  },
  address:[ {
    street:{
      type :String
    },
    city:{
      type:String
    }
  }],
  salary: {
    type: Number,
    required: true,
  },
  
},{timestamps:true});

const Person = mongoose.model("Person", personSchema);
module.exports = Person;
