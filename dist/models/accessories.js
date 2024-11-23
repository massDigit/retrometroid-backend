import mongoose from 'mongoose';
const accessorieSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
});
const Accessorie = mongoose.model('accessories', accessorieSchema);
export default Accessorie;
