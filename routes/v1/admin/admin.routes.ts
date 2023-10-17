import { Router } from "express";
import { loginAdmin, addStudent, createAdmin, assignTask } from "../../../controllers/admin";

var adminRouter = Router();

adminRouter.post("/login", loginAdmin);
adminRouter.post("/addStudent", addStudent);
adminRouter.post("/createAdmin", createAdmin);
adminRouter.post("/assignTask", assignTask);

export default adminRouter;