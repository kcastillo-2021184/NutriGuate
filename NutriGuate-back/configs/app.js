import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import multer from 'multer';
/*
import authRoutes from '../src/auth/auth.routes.js';
import userRoutes from '../src/user/user.routes.js';
import {initializeAdmin} from '../src/user/user.controller.js'
*/
import { limiter } from '../middlewares/rate.limit.js';

const upload = multer();

const configs = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true })); 
    app.use(upload.none()); 
    app.use(cors());
    app.use(helmet());
    app.use(limiter);
    app.use(morgan('dev'));
};

const routes = (app) => {
    app.use('/api/auth', authRoutes)
    app.use('/v1/user', userRoutes)
    app.use('/v1/room', roomRoutes)
    app.use('/v1/hotel', hotelRoutes)
    app.use('/v1/service', serviceRoutes)
    app.use('/v1/reservation', reservationRoutes)
    app.use('/v1/bill', billRoutes)
    app.use('/v1/event', eventsRoutes)
};

export const initServer = async () => {
    const app = express();
    try {
        configs(app);
        routes(app);
        app.listen(process.env.PORT);
        console.log(`Server running on port ${process.env.PORT}`);
    } catch (err) {
        console.error('Server init failed', err);
    }
};

//initializeAdmin()
