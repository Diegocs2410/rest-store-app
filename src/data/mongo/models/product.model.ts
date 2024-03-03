import { Schema, model } from "mongoose"

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Product Name is required"],
  },
  available: {
    type: Boolean,
    default: false,
  },
  price: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
})

export default model("Product", productSchema)
