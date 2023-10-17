import { Router } from "express";
import {
	updateTaskStatus,
	login,
	getTasks,
} from "../../../controllers/student";

var studentRouter = Router();

studentRouter.post("/login", login);
studentRouter.get("/tasks", getTasks);
studentRouter.patch("/update", updateTaskStatus);

export default studentRouter;
