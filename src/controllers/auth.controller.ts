import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { registerSchema, loginSchema } from '../models/validation/auth.schema';

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { error, value } = registerSchema.validate(req.body);
      if (error) return res.status(400).json({ error: error.details[0].message });

      const result = await AuthService.register(value);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { error, value } = loginSchema.validate(req.body);
      if (error) return res.status(400).json({ error: error.details[0].message });

      const result = await AuthService.login(value.email, value.password);
      res.status(200).json(result);
    } catch (error) {
      res.status(401).json({ error: (error as Error).message });
    }
  }
}