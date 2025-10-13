import express, { Router } from "express";
import { signUpController } from "../controller/authController";
import { signInController, signOutController } from "../controller/authController";
import { signUpValidator, signInValidator } from "../middleware/validator";

const router: Router = express.Router();

router.post("/signup", signUpValidator, signUpController);
router.post("/signin", signInValidator, signInController);

router.post("/logout", signOutController);



export default router;