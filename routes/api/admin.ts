import { Router } from "express";
import { dashboard } from "../../controller/adminController";
import multer from "multer";
import { inviteTeachers, inviteStudents } from "../../controller/adminController";

const upload = multer({ dest: "uploads/" });
const router: Router = Router();

router.get("/dashboard", dashboard);
router.post("/inviteTeachers", upload.single("teachersFile"), inviteTeachers);
router.post("/inviteStudents", upload.single("studentsFile"), inviteStudents);

export default router;
