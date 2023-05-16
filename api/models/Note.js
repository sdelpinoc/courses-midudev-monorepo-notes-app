import mongoose from 'mongoose'

const { Schema, model } = mongoose

const NoteSchema = Schema({
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  important: {
    type: Boolean,
    default: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

// Another option to remove attributes from the schema and re-assign them
NoteSchema.methods.toJSON = function () {
  const { _id: id, __v, ...note } = this.toObject()

  note.id = id

  return note
}

// Mongoose by default it will add a 's' to the name of collection
// The initial letter must be capitalized
const Note = model('Note', NoteSchema)

export default Note
