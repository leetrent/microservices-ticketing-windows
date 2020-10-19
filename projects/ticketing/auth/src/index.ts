import mongoose from 'mongoose';
import { app } from './app';

const start = async() => {
    if (!process.env.JWT_KEY) {
        throw new Error('[auth][index.ts] => JWT_KEY not found.')
    }
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('[ticketing.windows][ticketing][auth][index.ts] => Successfully connectedto Mongo DB.');
    } catch(errObj) {
        console.error(errObj);
    }
    app.listen(3000, () => {
        console.log('[ticketing.windows][ticketing][auth][index.ts] => Listening on port 3000 ...');
    });
};
start();
