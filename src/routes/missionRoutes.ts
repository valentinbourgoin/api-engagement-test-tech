import { Router, Request, Response } from 'express';
import prisma from '../prisma/client';
import { z } from 'zod';

const router: Router = Router(); 

const missionSchema = z.object({
    missionId: z.string().regex(
        /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/, 
        'Mission ID doit être un identifiant UID'
    ),
    publisherId: z.string().regex(
        /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/, 
        'Publisher ID doit être un identifiant UID'
    )
});

router.get('/:missionId/:publisherId', async (req: Request, res: Response) => {
    const validation = missionSchema.safeParse(req.params);
    if (!validation.success) {
        return res.status(400).json({ error: validation.error.errors });
    }
    
    const { missionId, publisherId } = validation.data;

    const mission = await prisma.mission.findUnique({
        where: {
            id: missionId
        }
    });

    if (!mission) {
        return res.status(404).json({ error: 'Mission introuvable' });
    }

    const publisher = await prisma.publisher.findUnique({
        where: {
            id: publisherId
        }
    });

    if (!publisher) {
        return res.status(404).json({ error: 'Publisher introuvable' });
    }

    try {
        const token = "1234567890";

        await prisma.redirection.create({
            data: {
                missionId: missionId,
                publisherId: publisherId,
                token,
                timestamp: new Date()
            }
        });

        return res.redirect(301, `${mission.applicationUrl}?apiengagement_id=${token}`);
    
    } catch (error) {
        return res.status(500).json({ error: 'Erreur lors de l’enregistrement de la redirection' });
    }
});

export default router;