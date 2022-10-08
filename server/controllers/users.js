import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/users.js';
import dotenv from 'dotenv';
dotenv.config();
export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "this user doesn't exist" });
    const isPasswordCorrect = await bcryptjs.compare(
      password,
      existingUser.password,
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: 'invaild password' });
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.DECODE,
      { expiresIn: '48h' },
    );
    res.status(200).json({ result: existingUser, token });
  } catch (err) {
    res.status(500).json({ message: 'unknown error' });
  }
};
export const signUp = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'this user is already exist' });
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Password don't match." });

    const hashPassword = await bcryptjs.hash(password, 12);
    const result = await User.create({
      email,
      password: hashPassword,
      name: `${firstName} ${lastName}`,
    });
    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.DECODE,
      {
        expiresIn: '48h',
      },
    );
    res.status(200).json({ result, token });
  } catch (err) {
    res.status(500).json({ message: 'unknown error' });
  }
};
