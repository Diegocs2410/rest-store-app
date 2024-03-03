import { Schema, model } from "mongoose"

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, "Category Name is required"],
  },
  available: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
})

export default model("Category", categorySchema)
