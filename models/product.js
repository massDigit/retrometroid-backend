const mongoose = require('mongoose');

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
      imageFond: {
        type: String,
        default: "",
      },
      shellImg: {
        type: String,
        default: "",
      },
      backShellImg: {
        type: String,
        default: "",
      },
      screenImg: {
        type: String,
        default: "",
      },
      buttonImg: {
        type: String,
        default: "",
      },
      padsImg: {
        type: String,
        default: "",
      },
      strapImg: {
        type: String,
        default: "",
      },
      stickerImg: {
        type: String,
        default: "",
      },
      powered: {
        type: Boolean,
        default: false,
      },
      led: {
        type: Boolean,
        default: false,
      },
      ledTrigger: {
        type: String,
      },
      dPad: {
        type: Boolean,
        default: false,
      },
      AmpAudio: {
        type: [String], 
      },
  
});

const Product = mongoose.model('products', productSchema);

export default Product;