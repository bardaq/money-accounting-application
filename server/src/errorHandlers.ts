import { Express, Request, Response, NextFunction } from 'express';

export default function errorHandlers(app: Express) {
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    // console.log('Global err:', err);
    return res.status(500).json({ error: err.message });
  });
}
