import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { validateSchema, loginSchema } from '../utils/validation';
import { LoginData, AuthResponse } from '../types';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password }: LoginData = validateSchema(loginSchema, req.body);

    // Check admin credentials from environment variables
    const adminUser = process.env.ADMIN_USER;
    const adminPass = process.env.ADMIN_PASS;

    if (!adminUser || !adminPass) {
      res.status(500).json({
        success: false,
        error: 'Admin credentials not configured',
      });
      return;
    }

    // Verify credentials
    const isUsernameValid = username === adminUser;
    const isPasswordValid = await bcrypt.compare(password, adminPass);

    if (!isUsernameValid || !isPasswordValid) {
      res.status(401).json({
        success: false,
        error: 'Invalid credentials',
      });
      return;
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: 'admin', username },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    const response: AuthResponse = {
      token,
      user: {
        id: 'admin',
        username,
      },
    };

    res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Login failed',
    });
  }
};
