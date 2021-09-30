import dotenv from 'dotenv';
dotenv.config();

export const JWT_SECRET = process.env.JWT;
export const JWT_SECRET_ADMIN = process.env.JWT_ADMIN;

export const debug = process.env.NODE_ENV !== 'production';
let mongoUrl;


switch (process.env.NODE_ENV) {
  case 'production':
    mongoUrl = process.env.DB_URL_PROD;
    break;
  case 'development':
    mongoUrl = process.env.DB_URL_DEV;
    break;
  case 'test':
    mongoUrl = process.env.DB_URL_TEST;
    break;
  default:
    mongoUrl = process.env.DB_URL_LOCAL || 'mongodb://localhost:27017/wolf';
    break;
}
export {mongoUrl}


