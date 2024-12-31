
import mongoose, { Document, Schema } from "mongoose";
import { City, CityDoc } from "./city";

export interface LuckTravelDoc extends Document{
    hythan: string;
    departure: string;
    destination: string[];
}

export const luckTravelSchema: Schema= new mongoose.Schema({
    hythan: {type: String, required: true},
    departure: { type: String, ref: 'City', required: true },
    destination: [{ type: String, ref: 'City' }]
});

export const LuckTravel=mongoose.model<LuckTravelDoc>('LuckTravel', luckTravelSchema);