import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

/** Main Pages */
router.get('/', (req: Request, res: Response) => {
  res.json('Hello World');
});

export default router;
