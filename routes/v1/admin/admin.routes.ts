import { Router } from "express";
import {
	loginAdmin,
	addStudent,
	assignTask,
	validateStudent,
    createAdmin
} from "../../../controllers/admin";

var adminRouter = Router();

adminRouter.post("/createAdmin", createAdmin);
adminRouter.post("/add", validateStudent, addStudent);
adminRouter.post("/assign", assignTask);

export default adminRouter;