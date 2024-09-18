
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
      option:[
        [{type: mongoose.Schema.Types.ObjectId, ref : 'options'}]
      ],
      accessorie:[
        [{type: mongoose.Schema.Types.ObjectId, ref : 'accessorie'}]
      ]
  
});

const Product = mongoose.model('products', productSchema);

export default Product;