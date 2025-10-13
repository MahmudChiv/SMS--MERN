import express, { Router } from "express";
import { signUpController } from "../controller/authController";
import { signInController } from "../controller/authController";
import { signOutController } from "../controller/authController"
import { signUpValidator } from "../middleware/validator";
import { signInValidator } from "../middleware/validator";

const router: Router = express.Router();

router.post("/signup", signUpValidator, signUpController);
router.post("/signin", signInValidator, signInController);

router.post("/logout", signOutController);



export default router;