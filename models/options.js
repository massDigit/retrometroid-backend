import mongoose from 'mongoose'

const optionSchema = mongoose.Schema({
  name : String,
  description : String,
  type : String,
  consoleType : String,
  color : [{type: mongoose.Schema.Types.ObjectId, ref : 'colors'}],
  optionImgFront: { type: String },  // Image de face
  optionImgBack: { type: String },   // Image de dos
  optionImgSide: { type: String }, 
});

const Option = mongoose.model('options', optionSchema);

export default Option;