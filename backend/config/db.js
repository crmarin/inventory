const mongoose = require('mongoose')

mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
    //   useUnifiedTopology: true,
    //   useNewUrlParser: true,
    //   useCreateIndex: true,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`)
    console.log('🚀 The connection has been established successfully. 🚀');
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

module.exports = connectDB;