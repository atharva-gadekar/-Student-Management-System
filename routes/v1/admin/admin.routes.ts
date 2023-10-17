import { Router } from "express";
import { loginAdmin, addStudent, createAdmin, assignTask } from "../../../controllers/admin";

var adminRouter = Router();

adminRouter.post("/login", loginAdmin);
adminRouter.post("/add", addStudent);
adminRouter.post("/createAdmin", createAdmin);
adminRouter.post("/assign", assignTask);

export default adminRouter;