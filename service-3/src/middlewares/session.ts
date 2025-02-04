import MongoStore = require('connect-mongo');
import session from 'express-session';
import dotenv from 'dotenv';

dotenv.config();
const sessionMiddleware = session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        dbName: process.env.MONGO_DB_NAME,
        collectionName: 'session',
        crypto: {
            secret: process.env.SESSION_ENCRYPTION_KEY || '',
        },
      }),
    secret: process.env.SESSION_SECRET || 'defaultSecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
    },
});

export default sessionMiddleware;
