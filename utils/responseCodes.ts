import { Response } from "express";

export function response_200(
	res: Response,
	message: string,
	data: any
): Response {
	return res.status(200).json({
		status: "OK",
		message,
		data,
	});
}

export function response_201(
	res: Response,
	message: string,
	data: any
): Response {
	return res.status(201).json({
		status: "Inserted",
		message,
		data,
	});
}

export function response_204(res: Response, message: string): Response {
	return res.status(204).json({
		status: "No content",
		message,
	});
}

export function response_400(res: Response, message: string): Response {
	return res.status(400).json({
		status: "error",
		error: message,
	});
}

export function response_401(res: Response, message: string): Response {
	return res.status(401).json({
		status: "error",
		error: message,
	});
}

export function response_403(res: Response, message: string): Response {
	return res.status(403).json({
		status: "error",
		error: message,
	});
}

export function response_404(res: Response, message: string): Response {
	return res.status(404).json({
		status: "error",
		error: message,
	});
}

export function response_500(
	res: Response,
	log_message: string,
	err?: string | null
): Response {
	const message = err != null ? `${log_message}: ${err}` : log_message;

	console.debug(message);

	return res.status(500).json({
		status: "error",
		error: `Something went wrong.\n${message}`,
	});
}
