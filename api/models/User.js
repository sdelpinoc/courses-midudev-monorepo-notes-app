import mongoose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'

const { Schema, model } = mongoose

const UserSchema = Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    default: true
  },
  notes: [{
    type: Schema.Types.ObjectId,
    ref: 'Note'
  }]
})

// Another option to remove attributes from the schema and re-assign them
UserSchema.methods.toJSON = function () {
  const { _id: id, __v, passwordHash, ...user } = this.toObject()

  user.id = id

  return user
}

UserSchema.plugin(mongooseUniqueValidator)

// Mongoose by default it will add a 's' to the name of collection
// The initial letter must be capitalized
const User = model('User', UserSchema)

export default User
