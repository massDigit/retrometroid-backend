import mongoose from 'mongoose'


const accessorieSchema = mongoose.Schema({
  name : String,
  accessorieImg : String,
  price : Number,
});

const Accessorie = mongoose.model('accessories', accessorieSchema);

export default Accessorie;