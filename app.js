import express, { json as _json } from 'express';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import xss from 'xss-clean';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';
import { serve, setup } from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import messageRouter from './routers/messageRouter.js';
import userRouter from './routers/userRouter.js';
import apiRouter from './routers/apiRouter.js';
import viewRouter from './routers/viewRouter.js';
import blogsRouter from './routers/blogsRouter.js';
import projectsRouter from './routers/projectsRouter.js';
import globalErrorHandler from './controllers/errorController.js';
import AppError from './util/AppError.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const { urlencoded, json } = bodyParser; 

const app = express();

const swaggerOptions = {
  swaggerDefinition: {
    swagger: "2.0",
    info: {
      version: '1.0.0',
      title: 'Uwambaje Eddy portfolio API',
      description:
        'Hi there, You can use the below end points to explore some of the website data.  You can find out more about My brand website at [https://uwambajeeddy.herokuapp.com](https://uwambajeeddy.herokuapp.com) ',
      contact: {
        name: 'Eddy Uwambaje',
        email: "uwambajeddy@gmail.com"
      },
      server: [{
        url:`${
          process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000'
            : 'https://uwambajeeddy.herokuapp.com/'
        }`
      }]
    }
  },
  apis: [`./routers/*.js`]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs/v1', serve, setup(swaggerDocs));

app.use(cors());
app.options('*', cors());
app.enable('trust proxy');

app.use(urlencoded({ extended: false }));

app.use(_json());

// app.use(helmet());

app.use(json());
app.use(cookieParser());
app.use(xss());
 
app.use(compression());

app.set('view engine', 'ejs');
app.set('views', ['./views', './views/admin']);
app.use(express.static('public'));

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

const limit = rateLimit({
  max: 5000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again later in an hour'
});

app.use('/api', limit);

app.use('/', viewRouter);
app.use('/api/', apiRouter);
app.use('/api/v1/user/', userRouter);
app.use('/api/v1/blogs/', blogsRouter);
app.use('/api/v1/projects/', projectsRouter);
app.use('/api/v1/messages/', messageRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Opps! can't find "${req.originalUrl}" on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
