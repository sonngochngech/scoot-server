

import mongoose, { Document, Schema } from "mongoose";

export interface LuckAnalizationDoc extends Document{
    phoneNumber: string;
    chatId: string|null|undefined;
    content: string|null|undefined;    
    createdAt: Date;
}

const luckAnalizationSchema: Schema= new mongoose.Schema({
    phoneNumber: {type: String, required: true},
    chatId: {type: String, required: false},
    content: {type: String, required: false},
    createdAt: { type: Date, default: Date.now }
})

export const LuckAnalization=mongoose.model<LuckAnalizationDoc>('LuckAnalization', luckAnalizationSchema);