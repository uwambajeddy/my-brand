const express = require('express');

const app = express();
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const messageRouter = require('./routers/messageRouter');
const userRouter = require('./routers/userRouter');
const blogsRouter = require('./routers/blogsRouter');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./util/AppError');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: '1.0.0',
      title: 'Uwambaje Eddy portfolio API',
      description:
        'Hi there, You can use the below end points to explore some of the website data. <br> { Base URL: localhost:3000 }',
      contact: {
        name: 'Eddy Uwambaje'
      },
      servers: ['http://localhost:3000']
    }
  },
  apis: [`${__dirname}/routers/*.js`]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs/v1', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cors());
app.options('*', cors());
app.enable('trust proxy');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(xss());

app.use(compression());

app.set('view engine', 'ejs');
app.set('views', [
  path.join(__dirname, 'views'),
  path.join(__dirname, 'views/admin')
]);
app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

const limit = rateLimit({
  max: 5000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again later in an hour'
});

app.use('/api', limit);

// app.use('/', viewRoute);
app.use('/api/v1/user/', userRouter);
app.use('/api/v1/blogs/', blogsRouter);
app.use('/api/v1/messages/', messageRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
