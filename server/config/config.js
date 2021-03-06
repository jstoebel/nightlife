// eslint-disable-next-line max-len
// borrowed from here: http://stackoverflow.com/questions/5778245/expressjs-how-to-structure-an-application/7350875#7350875

let currentEnv;

// determine evniornment type. default: production
if (process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test') {
  currentEnv = process.env.NODE_ENV;
  process.env.RootUrl = 'http://localhost:8000';
  const dotenv = require('dotenv');
  dotenv.load();
} else {
  currentEnv = 'production';
}

const appName = 'nightlife';

let dbName = `${appName.toLowerCase()}_${currentEnv}`;

// either Heroku's URL or create my own
const db = {URL: process.env.MONGODB_URI ||
    `mongodb://localhost:27017/${dbName}`,
  name: dbName,
};

const secret = process.env.SESSION_SECRET;

export {currentEnv, appName, db, secret};
