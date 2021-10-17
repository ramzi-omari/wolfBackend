/**
 * Required External Modules
 */
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors'
import mongoose from 'mongoose';
import passport from 'passport';
import socket from 'socket.io';
import routerBro from '../src/routes/admin.router';
import routes from './routes';
import { debug, mongoUrl } from './config/index';
import jwt from './middlewares/jwt';
import socketEvent from './helpers/socketEvent';

/**
 * App Variables
 */
const app = express();
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 8000;

/**
 *  App Configuration
 */
app.disable('x-powered-by');
app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use('/uploads', express.static('uploads'));

// setup db
if (debug) {
  mongoose.set('debug', true);
}
mongoose.promise = global.Promise;
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true , useFindAndModify: true});
// make a connection to mongodb
const connection = mongoose.connection;
connection.once('open', () => console.log('MongoDB --  database connection established successfully!'));
connection.on('error', (err) => {
  console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
  process.exit();
});

app.use(passport.initialize());
jwt(passport);

/**
 * Routes Definitions
 */
app.get('/', (req, res) => {
  res.status(200).send('Running...');
});

app.use('/api', routes);
app.use('/admin', routerBro)
app.use(bodyParser.json());

/**
 * Server Activation
 */
const server = app.listen(port, () => {
  console.log(`Listening to requests on http://${host}:${port} \n AdminBro is under http://${host}:${port}/admin`);
});

/**
 * socket io
 */
const io = socket(server, { origins: '*:*' });
socketEvent(io);