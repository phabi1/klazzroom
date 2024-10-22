import { Request, Response, NextFunction } from 'express';

export interface PluginHook {
  name: string;
  handler: (req: Request, res: Response, next: NextFunction) => void;
  priority?: number;
}
