
import dotenv from 'dotenv';
dotenv.config();

const knexFile =  {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
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
