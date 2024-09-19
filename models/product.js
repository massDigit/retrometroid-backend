
import mongoose from 'mongoose'


const productSchema = mongoose.Schema({
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      price: {
        type: Number,  
        required: true,
      },
      type: {
        type: String,
      },
      stockQuantity:{
        type:Number,
      },
      category:[
        {type: mongoose.Schema.Types.ObjectId, ref : 'categories'}
      ],
      options:
        [
          {type: mongoose.Schema.Types.ObjectId, ref : 'options'}
        ]
      ,
      accessories:
        [
          {type: mongoose.Schema.Types.ObjectId, ref : 'accessories'}
        ]
      
  
});

const Product = mongoose.model('products', productSchema);

export default Product;