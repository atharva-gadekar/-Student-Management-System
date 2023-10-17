import { Router } from "express";
import {
	loginAdmin,
	addStudent,
	createAdmin,
	assignTask,
	validateStudent,
} from "../../../controllers/admin";

var adminRouter = Router();

adminRouter.post("/login", loginAdmin);
adminRouter.post("/add", validateStudent, addStudent);
adminRouter.post("/createAdmin", createAdmin);
adminRouter.post("/assign", assignTask);

export default adminRouter;