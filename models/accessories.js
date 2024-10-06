import mongoose from 'mongoose'


const accessorieSchema = mongoose.Schema({
  name : String,
  description: String,
  price : Number,
});

const Accessorie = mongoose.model('accessories', accessorieSchema);

export default Accessorie;