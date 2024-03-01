import { Schema, model } from "mongoose"

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
  },
  emailValidated: {
    type: Boolean,
    defaul: false,
  },
  password: {
    type: String,
    required: [true, "Password required"],
  },
  img: {
    type: String,
  },
  role: {
    type: [String],
    default: ["USER_ROLE"],
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },
})

export default model("User", userSchema)
