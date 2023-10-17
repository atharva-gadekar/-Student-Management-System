import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user.model";
import { Task } from "../models/task.model";
import {
	response_200,
	response_201,
	response_400,
	response_404,
	response_500,
} from "../utils/responseCodes";
import {check, validationResult} from "express-validator";

interface LoginRequestBody {
	email: string;
	password: string;
}

interface AddStudentRequestBody {
	name: string;
	email: string;
	department: string;
	password: string;
}

interface AssignTaskRequestBody {
	studentId: string;
	taskName: string;
	dueDate: Date;
	description: string;
}


//route : api/v1/admin/login
export const loginAdmin = async (
	req: Request<{}, {}, LoginRequestBody>,
	res: Response
) => {
	const { email, password } = req.body;

	try {
		const admin = await User.findOne({ email });

		if (!admin || !admin.isAdmin) {
			return response_404(res, "Admin not found");
		}

		const isMatch = await bcrypt.compare(password, admin.password);

		if (!isMatch) {
			return response_400(res, "Invalid credentials");
		}

		const token = jwt.sign(
			{ username: admin.email },
			process.env.JWT_SECRET!,
			{ expiresIn: "1h" } 
		);

		const response = {
			admin,
			token,
		};

		response_200(res, "Login successful", response);
	} catch (error: unknown) {
		console.error(error);
		response_500(res, "Server error");
	}
};

export const validateStudent = [
	check("email", "Please include a valid email").isEmail(),
	check(
		"password",
		"Please enter a password with 6 or more characters"
	).isLength({ min: 6 }),
];

//route : api/v1/admin/add
export const addStudent = async (
	req: Request<{}, {}, AddStudentRequestBody>,
	res: Response
) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return response_400(res, `Invalid input ` + errors.array());
	}

	const { name, email, department, password } = req.body;

	try {
		const existingStudent = await User.findOne({ email });

		if (existingStudent) {
			return response_400(res, "Student already exists");
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newStudent = new User({
			name,
			email,
			department,
			password: hashedPassword,
			isAdmin: false,
		});

		await newStudent.save();

		response_201(res, "Student added successfully", newStudent);
	} catch (error: unknown) {
		console.error(error);
		response_500(res, "Server error");
	}
};

//route : api/v1/admin/createAdmin
export const createAdmin = async (
    req: Request<{}, {}, AddStudentRequestBody>,
    res: Response
) => {
    const { name, email, department, password } = req.body;

    try {
        const existingAdmin = await User.findOne({ email });

        if (existingAdmin) {
            return response_400(res, "Admin already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAdmin = new User({
            name,
            email,
            department,
            password: hashedPassword,
            isAdmin: true,
        });

        await newAdmin.save();

        response_201(res, "Admin added successfully", newAdmin);
    } catch (error: unknown) {
        console.error(error);
        response_500(res, "Server error");
    }
}

//route : api/v1/admin/assign
export const assignTask = async (
	req: Request<{}, {}, AssignTaskRequestBody>,
	res: Response
) => {
	const { studentId, taskName, dueDate, description } = req.body;

	try {
		const student = await User.findById(studentId);

		if (!student || student.isAdmin) {
			return response_404(res, "Student not found");
		}

		const newTask = new Task({
			student: studentId,
			taskName,
			description,
			dueDate,
		});

		await newTask.save();

		student.tasks.push(newTask._id);
		await student.save();

		response_201(res, "Task assigned successfully", newTask);
	} catch (error: unknown) {
		console.error(error);
		response_500(res, "Server error");
	}
};
