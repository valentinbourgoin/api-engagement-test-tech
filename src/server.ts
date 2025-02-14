import express, { Application } from 'express';
import { impressionRouter } from './routes/impressionRoutes';

const app: Application = express();

app.use('/r', impressionRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});