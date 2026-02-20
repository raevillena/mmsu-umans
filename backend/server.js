import express from 'express';
import { initDB } from './models/index.js';
import path from 'path';
import {fileURLToPath} from 'url'
import { usersRoute, appsRoute, roleRoute, authRoute, googleRoute, userTypesRoute, sessionsRoute, mqttRoute, logsRoute, analyticsRoute } from './routes/index.js';
import logger from './middleware/logger.js';
import errorHandler from './middleware/error.js';
import notFound from './middleware/notFound.js';
import { corsMiddleware } from './middleware/cors.js';
import cookieParser from 'cookie-parser'
import { swaggerSpec } from './docs/swagger.js';
import swaggerUi from 'swagger-ui-express';



//Get env from .env file
const port = process.env.PORT || 3000;
const api_url = process.env.API_URL
const debug = process.env.DEBUG === 'true'
const allowedOrigins = debug
  ? process.env.ALLOWED_ORIGINS_DEV
  : process.env.ALLOWED_ORIGINS_PROD?.split(',').map(origin => origin.trim())
  
//Setup directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Setup express instance
const app = express();

//peek the allowed origins
console.log(allowedOrigins)

app.use(corsMiddleware);

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

//Logger middleware using winston
app.use(logger);

//setup static and folder
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


//Routes
app.use('/api/users', usersRoute);
app.use('/api/apps', appsRoute);
app.use('/api/roles', roleRoute);
app.use('/api/auth', authRoute);
app.use('/api/auth/google', googleRoute);
app.use('/api/type', userTypesRoute);
app.use('/api/sessions', sessionsRoute);
app.use('/api/mqtt', mqttRoute);
app.use('/api/logs', logsRoute);
app.use('/api/analytics', analyticsRoute);

//error handler middleware
app.use(notFound);
app.use(errorHandler);


//Initialize database
initDB();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Swagger docs at ${api_url}:${port}/api-docs`);
});