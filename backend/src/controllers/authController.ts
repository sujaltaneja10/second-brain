import bcrypt from 'bcrypt';
import { config } from '../config/env';
import { UserModel } from '../models/User';
import { UserSchema } from '../validators/userValidator';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export async function signupController(req: Request, res: Response) {
  try {
    const parsedData = UserSchema.safeParse(req.body);

    // Request body is in invalid format
    if (!parsedData.success) {
      res.status(411).json({ error: parsedData.error.issues[0].message });
      return;
    }

    const user = await UserModel.findOne({
      username: parsedData.data.username,
    });

    // User already exists
    if (user) {
      res.status(403).json({ error: 'User already exists' });
      return;
    }

    // Hash password
    const hashedPassword: string = await bcrypt.hash(
      parsedData.data.password,
      config.SALT_ROUNDS
    );

    // Create user
    await UserModel.create({ ...parsedData.data, password: hashedPassword });
    res.json({ message: 'User signed up' });
  } catch (error) {
    res.status(500).json({ error });
  }
}

export async function signinController(req: Request, res: Response) {
  try {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });

    // If user does not exist in database
    if (!user) {
      res.status(403).json({ error: 'User does not exist' });
      return;
    }

    const userFound = await bcrypt.compare(password, user.password);

    // If wrong password
    if (!userFound) {
      res.status(403).json({ error: 'Username and password does not match' });
      return;
    }

    const token = jwt.sign(
      { username: user.username, id: user._id },
      config.JWT_SECRET
    );

    // Send JWT token
    res.setHeader('Authorization', `Bearer ${token}`);
    res.json({ message: 'User signed in' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
