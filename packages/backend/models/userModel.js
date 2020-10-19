import mongoose from 'mongoose';

const schemaOptions = {
  timestamps: true
}

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  }
}, schemaOptions);

const User = mongoose.model('User', userSchema);

export default User;
