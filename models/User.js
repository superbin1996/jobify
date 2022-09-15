import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    trim: true,
    // minLength: 3,
    // naxLength: 20,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide validated email',
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    // minLength: 6,
  },
  lastName: {
    type: String,
    trim: true,
    // naxLength: 20,
    default: 'doe'
  },
  location: {
    type: String,
    trim: true,
    // maxLength: 20,
    default: 'my city',
  },
})

// function argument is not arrow func
UserSchema.pre('save', async function(){
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function() {
  return jwt.sign({id:this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME})
}

export default mongoose.model('User', UserSchema)