import type {Request, Response, NextFunction} from "express"

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) return next();
  return res.status(401).json({ message: "Not logged in" });
}

export const hasRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.user && req.user.role === role) return next();
    return res.status(403).json({ message: "Access denied" });
  };
}

