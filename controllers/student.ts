import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
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

export const login = async (
	req: Request<{email : string, password : string}, {}, LoginRequestBody>,
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
            user,
            token,
        };

		response_200(res, "Login successful", response);
	} catch (error: unknown) {
		console.error(error);
		response_500(res, "Server error");
	}
};

export const getTasks = async (
	req: Request<{ userId: string }>,
	res: Response
) => {
	try {
		const { userId } = req.params;
		const user = await User.findById(userId).populate("tasks");

		if (!user) {
			return response_404(res, "User not found");
		}

		const tasks = user.tasks || [];

		response_200(res, "Tasks fetched successfully", tasks);
	} catch (error: unknown) {
		console.error(error);
		response_500(res, "Server error");
	}
};

export const updateTaskStatus = async (
	req: Request<{ taskId: string, status : string }, {}, UpdateTaskRequestBody>,
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
