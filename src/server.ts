import express, { Application } from 'express';
import root from './routes/root';
import applicationRoutes from './routes/applicationRoutes';
import impressionRoutes from './routes/impressionRoutes';
import missionRoutes from './routes/missionRoutes';

const app: Application = express();

app.use(express.json());

app.use("/", root);
app.use("/r/", missionRoutes);
app.use("/r/apply", applicationRoutes);
app.use("/r/impression", impressionRoutes);

const PORT = 3003;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));