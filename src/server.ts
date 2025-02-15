import express, { Application } from 'express';
import root from './routes/root';
import impressionRoutes from './routes/impressionRoutes';

const app: Application = express();

app.use(express.json());

app.use("/", root);
app.use("/r/impression", impressionRoutes);

const PORT = 3003;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));