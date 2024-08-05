import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const MONGO_URL = process.env.MONGO_URL;
export const DB = async () => {
    mongoose.set("strictQuery", false);
    await mongoose.connect(MONGO_URL).then(() => { console.log("Database Connected") }).catch((err) => {
        console.log(err);
        process.exit(1);
    });
};
export default DB;