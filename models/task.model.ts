import { Schema, model } from "mongoose";

enum TaskStatus {
	PENDING = "pending",
	OVERDUE = "overdue",
	COMPLETED = "completed",
}

const taskSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	dueDate: {
		type: Date,
		required: true,
	},
	status: {
		type: String,
		enum: Object.values(TaskStatus),
		default: TaskStatus.PENDING,
	},
	assignedTo: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
});

const Task = model("Task", taskSchema);

export { Task, TaskStatus };
