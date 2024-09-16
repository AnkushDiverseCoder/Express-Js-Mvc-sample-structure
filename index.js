import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userProfile from './src/routes/userprofile.routes.js';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 8000;

dotenv.config();
app.use(cors())

mongoose.set("strictQuery", false);
const mongoDB = "mongodb://127.0.0.1/tradebook";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoDB);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
  }
}

app.get('/', (req, res) => {
  res.json({'message': 'ok'});
})

app.use('/api/user/profile', userProfile);

app.listen(port, '0.0.0.0', async () => {
  await connectDB();
  console.log(`Server listening at http://localhost:${port}`)
});
