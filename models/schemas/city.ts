
import mongoose, { Document, Schema } from "mongoose";

export interface CityDoc  extends Document{
    name: string;
    code: string;
  
}

const citySchema: Schema= new mongoose.Schema({
    name: {type: String, required: true},
    code: {type: String, required: true,unique: true},
})

export const City=mongoose.model<CityDoc>('City', citySchema);