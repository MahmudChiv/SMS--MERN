import { validationResult } from "express-validator";
import type { Request, Response, NextFunction } from "express";
import { Admin } from "../models/SQL/Admin";
import bcrypt from "bcrypt";
import passport from "passport";

export const signUpController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) res.status(400).json({ errors: errors.array() });

  const adminExist = await Admin.findOne({
    where: { email: req.body.email },
  });
  if (adminExist) {
    res.status(400).json({ message: "Admin already exist" });
  }

  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword)
      res.status(400).json({ message: "Password do not match!" });
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await Admin.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    res
      .status(200)
      .json({ message: "You've successfully signed up as an admin!", newAdmin });
  } catch (error) {
    console.log(error + " na error wey u dey face be dis")
    res.status(500).json({ message: "Error signing up" });
  }
};

export const signInController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) res.status(400).json({ errors: errors.array() });

    passport.authenticate("local", (err: Error, user: any, info: any) => {
      if (err) return res.status(500).json({ message: "Server error" });
      if (!user) return res.status(401).json({ message: info?.message });

      req.logIn(user, (err) => {
        if (err) return next(err);
        res.json({ message: "Login successful", user });
      });
    })(req, res, next);
  } catch (error) {
    console.log(error + " na d error be this")
  }
};

export const signOutController =  (req: Request, res: Response) => {
  req.logout(() => {
    res.json({ message: "Logged out successfully" });
  });
}