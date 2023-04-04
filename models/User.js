import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name"],
    minLength: 3,
    maxLength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email address",
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide your name"],
    minLength: 6,
    select: false,
  },
  lastName: {
    type: String,
    maxLength: 20,
    default: "lastName",
  },
  location: {
    type: String,
    maxLength: 20,
    default: "My City",
  },
});

UserSchema.pre("save", async function () {
  // console.log(this.modifiedPaths());
  if(!this.isModified("password")) return
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
    
  });
};

UserSchema.methods.comparePassword = async function(candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}
export default mongoose.model("User", UserSchema);
