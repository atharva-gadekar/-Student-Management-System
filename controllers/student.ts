import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import {body} from "express-validator";
import { Task, TaskStatus } from "../models/task.model";
import {
	response_200,
	response_400,
	response_404,
	response_500,
} from "../utils/responseCodes";

interface LoginRequestBody {
	email: string;
	password: string;
};

interface UpdateTaskRequestBody {
	status: string;
};

//route : api/v1/student/login
export const login = async (
	req: Request<{}, {}, LoginRequestBody>,
	res: Response
) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });

		if (!user) {
			return response_404(res, "User not found");
		}

		const match = await bcrypt.compare(password, user.password);

		if (!match) {
			return response_400(res, "Invalid credentials");
		}

        const token = jwt.sign(
					{ username: user.email },
					process.env.JWT_SECRET!,
					{ expiresIn: "1h" }
				);

        const response = {
					id: user._id,
					name: user.name,
					email: user.email,
					department: user.department,
					token,
				};

		response_200(res, "Login successful", response);
	} catch (error: unknown) {
		console.error(error);
		response_500(res, "Server error");
	}
};

//route : api/v1/student/tasks/:id
export const getTasks = async (
	req: Request<{ id: string }>,
	res: Response
) => {
	try {
		const { id } = req.params;
		var user = await User.findById(id).populate("tasks");

		if (!user) {
			return response_404(res, "User not found");
		}

        var tasks = user.tasks || [];

        for (let i = 0; i < tasks.length; i++) {
            const taskId = tasks[i];
            const task = await Task.findById(taskId);
            const now = new Date();
            const dueDate = new Date(task.dueDate);

            if (now > dueDate) {
                task.status = TaskStatus.OVERDUE;
                await task.save();
            }
        }

        user = await User.findById(id).populate("tasks");
        tasks = user.tasks || [];

        response_200(res, "Tasks fetched successfully", tasks);
	} catch (error: unknown) {
		console.error(error);
		response_500(res, "Server error");
	}
};

//route : api/v1/student/update/:taskId
export const updateTaskStatus = async (
	req: Request<{taskId: string}, {}, UpdateTaskRequestBody>,
	res: Response
) => {
	try {
		const { taskId } = req.params;
		const { status } = req.body;

		const task = await Task.findById(taskId);

		if (!task) {
			return response_404(res, "Task not found");
		}

		task.status = status as TaskStatus;
		await task.save();

		response_200(res, "Task status updated successfully", task);
	} catch (error: unknown) {
		console.error(error);
		response_500(res, "Server error");
	}
};
