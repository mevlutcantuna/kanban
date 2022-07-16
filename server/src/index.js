import dotenv from "dotenv";

// to get some variables from .env file
dotenv.config();

console.log(process.env.MONGO_DB_URL);
