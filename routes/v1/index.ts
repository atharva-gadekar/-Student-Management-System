import { Router } from "express";
import adminRouter from "./admin/admin.routes";
import studentRouter from "./student/student.routes";
import {verifyAdmin, verifyUser} from "../../middleware/auth.middleware";

var router = Router();

router.use("/admin", verifyAdmin, adminRouter);
router.use("/student", verifyUser, studentRouter);

export default router;