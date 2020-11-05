import knex from 'knex';
import knexFile from '../knexfile.js';

const env = 'development';

const configOptions = knexFile[env];

const database = knex(configOptions);
export default database;