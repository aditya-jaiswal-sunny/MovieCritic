import pg from 'pg';
import config from './config.js';

const connectPostgresDB = () => {
  let pool = null;

  const init = new Promise((resolve, reject) => {
    const { Pool } = pg;
    pool = new Pool({
      max: 20,
      connectionString: config.postgresDbUrl,
    });

    pool.on('error', (err) => {
      console.error('Postgres connection error:', err);
    });
    pool.connect((err, client) => {
      if (err) {
        console.error('Error connecting to Postgres:', err);
        reject(err);
      } else {
        console.info('Connected to Postgres');
        resolve();
      }
    });
  });

  const query = (quertText, params) => new Promise((resolve, reject) => {
    pool
      .query(quertText, params)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

  return { init, query };
};

const postgresDB = connectPostgresDB();
export default postgresDB;
