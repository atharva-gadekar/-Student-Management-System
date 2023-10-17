import { Router } from "express";
import {
	updateTaskStatus,
	getTasks,
} from "../../../controllers/student";

var studentRouter = Router();

studentRouter.get("/tasks/:id", getTasks);
studentRouter.patch("/update/:taskId", updateTaskStatus);

export default studentRouter;
