import { Router } from "express";
import adminRouter from "./admin/admin.routes";
import studentRouter from "./student/student.routes";

var router = Router();

router.use("/admin", adminRouter);
router.use("/student", studentRouter);

export default router;