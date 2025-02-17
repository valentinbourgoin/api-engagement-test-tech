import { Router, Request, Response } from 'express';
import prisma from '../prisma/client';
import { z } from 'zod';

const router: Router = Router(); 

const applicationSchema = z.object({
    missionId: z.string().regex(
        /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/, 
        'Mission ID doit être un identifiant UID'
    ),
    publisherId: z.string().regex(
        /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/, 
        'Publisher ID doit être un identifiant UID'
    ), 
    view: z.string()
});

router.get('/', async (req: Request, res: Response) => {
    const validation = applicationSchema.safeParse(req.query);
    if (!validation.success) {
        return res.status(400).json({ error: validation.error.errors });
    }
    
    const { missionId, publisherId, view } = validation.data;

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

    const redirection = await prisma.redirection.findUnique({
        where: {
            token: view
        }
    });

    if (!redirection || redirection.missionId !== missionId || redirection.publisherId !== publisherId) {
        return res.status(401).json({ error: 'Token invalide' });
    }

    try {
        await prisma.application.create({
            data: {
                missionId: missionId,
                publisherId: publisherId,
                timestamp: new Date()
            }
        });

        return res.status(200).json({ message: 'Candidature enregistrée avec succès' });
    
    } catch (error) {
        return res.status(500).json({ error: 'Erreur lors de l’enregistrement de la redirection' });
    }
});

export default router;