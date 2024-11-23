import mongoose from 'mongoose';
const productSchema = new mongoose.Schema({
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
    stockQuantity: {
        type: Number,
    },
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'categories' }],
    coque: [{ type: mongoose.Schema.Types.ObjectId, ref: 'options' }],
    button: [{ type: mongoose.Schema.Types.ObjectId, ref: 'options' }],
    pads: [{ type: mongoose.Schema.Types.ObjectId, ref: 'options' }],
    laniere: [{ type: mongoose.Schema.Types.ObjectId, ref: 'options' }],
    stickers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'options' }],
    batterie: [{ type: mongoose.Schema.Types.ObjectId, ref: 'options' }],
    screen: [{ type: mongoose.Schema.Types.ObjectId, ref: 'options' }],
    sacoche: [{ type: mongoose.Schema.Types.ObjectId, ref: 'accessories' }],
    screen_shield: [{ type: mongoose.Schema.Types.ObjectId, ref: 'accessories' }],
    silicone_shield: [{ type: mongoose.Schema.Types.ObjectId, ref: 'accessories' }]
});
const Product = mongoose.model('products', productSchema);
export default Product;
