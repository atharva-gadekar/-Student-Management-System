import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/user.model";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import { response_401, response_500 } from "../utils/responseCodes"; 

dotenv.config();

interface ExtendedRequest extends Request {
	user?: any;
}

interface CustomJwtPayload extends JwtPayload {
	username: string;
}

const verifyUser = async (
	req: ExtendedRequest,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const token = req.header("Authorization");
	if (!token) {
		response_401(res, "Unauthorized");
		return;
	}
	try {
		const tokenWithoutBearer = token.replace("Bearer ", "");
		const decoded = jwt.verify(
			tokenWithoutBearer,
			process.env.JWT_SECRET!
		) as CustomJwtPayload;
		const user = await User.findOne({ email: decoded.email });
		if (!user) {
			response_401(res, "Unauthorized");
			return;
		}
		req.user = user;
		next();
	} catch (err) {
		console.log(err);
		response_500(res, "Internal server error");
	}
};

const verifyAdmin = async (
	req: ExtendedRequest,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const token = req.header("Authorization");
	if (!token) {
		response_401(res, "Unauthorized");
		return;
	}
	try {
		const tokenWithoutBearer = token.replace("Bearer ", "");
		const decoded = jwt.verify(
			tokenWithoutBearer,
			process.env.JWT_SECRET!
		) as CustomJwtPayload;
		const user = await User.findOne({ email: decoded.email });
		if (!user) {
			response_401(res, "Unauthorized");
			return;
		}
		if (!user.isAdmin) {
			response_401(res, "Unauthorized");
			return;
		}
		req.user = user;
		next();
	} catch (err) {
		console.log(err);
		response_500(res, "Internal server error");
	}
};

export { verifyUser, verifyAdmin };
