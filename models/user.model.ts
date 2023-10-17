import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		department: {
			type: String,
			required: true,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		tasks: {
			type: [{ type: Schema.Types.ObjectId, ref: "Task" }],
			default: [],
		},
	},
	{
		timestamps: true,
	}
);

export default model("User", UserSchema);
