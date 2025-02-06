import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
  name : String,
});

const Category = mongoose.model('categories', categorySchema);

export default Category;