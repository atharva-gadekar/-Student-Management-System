import { Router } from "express";
import adminRouter from "./admin/admin.routes";
import studentRouter from "./student/student.routes";
import { createAdmin, loginAdmin } from "../../controllers/admin";
import {login} from "../../controllers/student";
import {verifyAdmin, verifyUser} from "../../middleware/auth.middleware";

var router = Router();

router.post("/admin/login", loginAdmin);
router.post("/student/login", login);
router.use("/admin", verifyAdmin, adminRouter);
router.use("/student", verifyUser, studentRouter);

export default router;