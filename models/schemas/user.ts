

import mongoose, { Document, Schema } from "mongoose";

export interface UserDoc extends Document{
    phoneNumber: string;
    content: string|null|undefined;
    createdAt: Date;

}

const userSchema: Schema= new mongoose.Schema({
    phoneNumber: {type: String, required: true},
    content: {type: String, required: false},
    createdAt: { type: Date, default: Date.now }
})

export const User=mongoose.model<UserDoc>('User', userSchema);