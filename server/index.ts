import dotenv from 'dotenv';
dotenv.config({ path: './.env.local' });

import { dbToConnect } from './db';
import { app } from './app';

dbToConnect()
    .then(() => {
        app.on('error', (error: any) => {
            console.error('❌ UNEXPECTED ERROR:', error.message);
            process.exit(1);
        });

        if (!process.env.PORT) {
            throw new Error('PORT environment variable is not set');
        }

        const port = process.env.PORT || 8000;

        app.listen(port, () => {
            console.log(`🚀 Server running on port: ${port}`);
        });
    })
    .catch((error: any) => {
        console.error(`❌ MongoDB connection error:`, error);
        process.exit(1);
    });
