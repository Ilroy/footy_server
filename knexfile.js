
import dotenv from 'dotenv';
dotenv.config();

const knexFile =  {
  development: {
    client: "pg",
    connection: {
      host: "localhost",//process.env.DB_HOST,
      user: "postgres",//process.env.DB_USER,
      password: "postgres",//process.env.DB_PASS,
      database: "footy_db",//process.env.DB_NAME,
    },
    useNullAsDefault: true,
    migrations:{
        directory: './database/migrations',
    },
    seeds: {
        directory: './database/seeds'
    }
  },
};

export default knexFile;
