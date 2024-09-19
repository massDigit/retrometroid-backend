import mongoose from 'mongoose'

const optionSchema = mongoose.Schema({
  name : String,
  color : [{type: mongoose.Schema.Types.ObjectId, ref : 'colors'}],
  optionImgUrl : String,
  price : Number,
});

const Option = mongoose.model('options', optionSchema);

export default Option;