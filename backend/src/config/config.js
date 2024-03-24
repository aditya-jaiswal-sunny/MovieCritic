import dotenv from 'dotenv';

// this helps in loading env file to process.env
dotenv.config();

const config = {
  port: process.env.PORT,
  postgresDbUrl: process.env.POSTGRES_DB_URL,
};

export default config;
