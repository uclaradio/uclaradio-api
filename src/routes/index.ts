import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

/** Main Pages */
router.get('/', (req: Request, res: Response) => {
  res.json('test');
});

export default router;
