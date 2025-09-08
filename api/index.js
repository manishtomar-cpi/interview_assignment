import 'dotenv/config'
import {createServer} from './app.js'
import { db_connection, closeDB } from './config/db.js';

const PORT = Number(process.env.PORT || 3000);
const app = createServer();

//checking db connecion 
try{
    db_connection();
}
catch(err){
    console.error("db connection failed: ", err.message);
}
const server = app.listen(PORT, ()=> console.log(`server is running on port ${PORT}`));