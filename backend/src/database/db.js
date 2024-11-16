import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({
  path: '../.env'
});

const db = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
    console.log(`\n MongoDB connected !! DB HOST :: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error('Mongodb connection error', error);
    process.exit(1);
  }
};

export default db;
