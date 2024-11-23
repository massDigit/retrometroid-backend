import mongoose from 'mongoose'

const colorSchema = mongoose.Schema({
  name : String,
});

const Color = mongoose.model('colors', colorSchema);

export default Color;