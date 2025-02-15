import {Router, Request, Response} from 'express';

const router: Router = Router();

router.get('/', (req: Request, res: Response): Response => {
    return res.json({
        name: 'API Engagement Test Tech',
        version: '1.0.0',
    });
});

export default router;
