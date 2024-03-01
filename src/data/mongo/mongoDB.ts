import mongoose from "mongoose"

interface ConnectionOptions {
  mongoURI: string
  dbName: string
}

class MongoDataBase {
  static readonly connect = async ({ dbName, mongoURI }: ConnectionOptions) => {
    try {
      await mongoose.connect(mongoURI, {
        dbName,
      })
      return true
    } catch (error) {
      console.error("Mongo connection error")
      throw error
    }
  }
}

export default MongoDataBase
