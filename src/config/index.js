import { config } from "dotenv";

config();

const DB = process.env.DB;
const PORT = process.env.PORT;
const SENDER_ID = process.env.SENDERID;
const APP_SECRET = process.env.APP_SECRET_KEY;
const MSG_91_API_KEY = process.env.MSG_91_API_KEY;

export { DB, PORT, APP_SECRET, MSG_91_API_KEY, SENDER_ID };
