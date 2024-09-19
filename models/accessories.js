import mongoose from 'mongoose'


const accessorieSchema = mongoose.Schema({
  name : String,
  accessorieImg : String,
  price : Number,
  accessorieImg : String,
  color : [{type: mongoose.Schema.Types.ObjectId, ref : 'colors'}],
});

const Accessorie = mongoose.model('accessories', accessorieSchema);

export default Accessorie;