const mysql = require('mysql2/promise');

const path = require('path');

const args = process.argv.slice(2)[0];

const envFile = args === 'test' ? '../.env.test' : '../.env';

require('dotenv').config({
  path: path.join(__dirname, envFile),
});

const { DB_PASSWORD, DB_NAME, DB_USER, DB_HOST, DB_PORT } = process.env;

const setUpDatabase = async () => {
  try {
    const db = await mysql.createConnection({
      host: "us-cdbr-east-05.cleardb.net",
      user: "b69ca368fb6a03",
      password: "121c0ef5",
      port: DB_PORT,
    });

    await db.query(`CREATE DATABASE IF NOT EXISTS heroku_67b59f0fc3ba242`);
    await db.query(`USE heroku_67b59f0fc3ba242`);
    db.close();
  } catch (err) {
    console.log(
      `Your environment variables might be wrong. Please double check .env file`
    );
    console.log('Environment Variables are:', {
      DB_PASSWORD,
      DB_NAME,
      DB_USER,
      DB_HOST,
      DB_PORT,
    });
    console.log(err);
  }
};

setUpDatabase();
