import express from "express";
import { body } from "express-validator";

// Validation middleware array

export const signUpValidator = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isString()
    .withMessage("First name must be a string"),
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .isString()
    .withMessage("Last name must be a string"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

export const signInValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email your email")
    .isEmail()
    .withMessage("Invalid email format"),
  body("password").trim().notEmpty().withMessage("Your Password is required"),
  body("role").trim().notEmpty().withMessage("Select your role in the school to sign in"),
];
