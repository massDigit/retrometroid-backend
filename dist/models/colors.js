import mongoose from 'mongoose';
const colorSchema = new mongoose.Schema({
    name: String,
});
const Color = mongoose.model('colors', colorSchema);
export default Color;
