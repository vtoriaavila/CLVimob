import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDatabase = () => {
    console.log("Wait connecting to the database");

    mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log("MongoDB atlas connected"))
        .catch((error) => console.log("Error connecting to MongoDB:", error));
}

export default connectDatabase;
