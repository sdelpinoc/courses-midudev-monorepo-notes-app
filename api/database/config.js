import mongoose from 'mongoose'

const { MONGODB_CNN, MONGODB_CNN_TEST, NODE_ENV } = process.env

const dbConnection = async () => {
  const connectionString = NODE_ENV === 'test'
    ? MONGODB_CNN_TEST
    : MONGODB_CNN

  try {
    await mongoose.connect(connectionString)
    // console.log('DB connected')
  } catch (error) {
    console.log(error)
    throw new Error('Error starting database')
  }
}

export {
  dbConnection
}
