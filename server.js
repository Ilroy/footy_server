import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/index.js';


dotenv.config();
const app = express();


app.use(bodyParser.json());
app.use(cors());
app.use('/api',router);

app.listen(process.env.PORT || 3000, () =>{
    console.log("SERVER RUNNING");
});
