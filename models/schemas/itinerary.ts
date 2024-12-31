import mongoose, { Schema, Document } from 'mongoose';
import { StringLiteral } from 'typescript';
import { number } from 'zod';
import { posix } from 'path';

export interface Itinerary extends Document {
    tripData:{
        locations: {
            name?: string;
            description?: string;
            address?: string;
            position?: number;
        }[];
        foods: {
            name?: string;
            description?: string;
            address?: string;
            position?: number;
        }[];
        totalFee: {
            flights: number,
            activities: number;
            transportation: number;
            accommodation: number;
            food: number;
            miscellaneous: number;
        };
        topExperience:{
            forTheBody: string;
            forTheMind: string;
            forTHeSoul: string;
        }
        wardrobe:{
            clotheRecommendations: string;
            accessoriesRecommendations: string
        }
        accommodation: {
            name: string;
            address: string;
            description: string;
        }[];
        tips: {
            name: string;
            description: string;
        };
        weather:{
            temperature: number;
            description: string;
            name: string;
        }
        itinerary: {
            day: number;
            realDay: string;
            activities: {
                name: string;
                description: string;
                position: number,
                type: string,
            }[];
        }[];
        img:{
            location: string[][];
            food: string[][];
            accommodation: string[][];
        }
    },
    userInfo:{
        name: string;
        sex: number|null;
        email: string;
        phone: string;
        birthdate: string;
        placeOfBirth: {
            code : string;
            name: string;
        };
        timeOfBirth: string;

    }

    tripInfo:{
        startDate: string;
        endDate: string;
        duration: number;
        budget: number;
        departure: {
            code : string;
            name: string;
        };
        arrival: {
            code : string;
            name: string;
        };
        arrivalImg: string[];
        arrivalDescription: string;
    }
}

const itinerarySchema: Schema = new mongoose.Schema({
    tripData:{
        locations: [{
            name: { type: String, required: true },
            description: { type: String, required: true },
            address: { type: String, required: true },
            position: { type: Number, required: true }
        }],
        foods: [{
            name: { type: String, required: true },
            description: { type: String, required: true },
            address: { type: String, required: true },
            position: { type: Number, required: true }
        }],
        totalFee: {
            flights: { type: Number, required: false },
            activities: { type: Number, required: true },
            transportation: { type: Number, required: true },
            accommodation: { type: Number, required: true },
            food: { type: Number, required: true },
            miscellaneous: { type: Number, required: true }
        },
        topExperience: {
            forTheBody: { type: String, required: true },
            forTheMind: { type: String, required: true },
            forTheSoul: { type: String, required: true },
        },
        wardrobe: {
            clotheRecommendations: { type: String, required: true },
            accessoriesRecommendations: { type: String, required: true },
        },
        accommodation: [{
            name: { type: String, required: true },
            address: { type: String, required: true },
            description: { type: String, required: true }
        }],
        tips: [{
            name: { type: String, required: true },
            description: { type: String, required: true }
        }],
        weather:{
            temperature: { type: Number, required: true },
            description: { type: String, required: true },
            name: { type: String, required: true }
        },
        itinerary: [{
            day: { type: Number, required: true },
            realDay: { type: String, required: true },
            activities: [{
                name: { type: String, required: true },
                description: { type: String, required: false },
                position: { type: Number, required: true },
                type: { type: String, required: true }
            }]
        }],
        img: {
            location: [[{ type: String, required: false }]],
            food: [[{ type: String, required: false }]],
            accommodation: [[{ type: String, required: false }]]
        }
    },
    userInfo: {
      name: { type: String, required: true },
      sex: { type: Number, required: false },
      email: { type: String, required: false },
      phone: { type: String, required: true },
      birthdate: { type: String, required: true },
      placeOfBirth: {
        code: { type: String, required: true },
        name: { type: String, required: true },
      },
      timeOfBirth: { type: String, required: true },
    },
    tripInfo: {
      startDate: { type: String, required: true },
      endDate: { type: String, required: true },
      duration: { type: Number, required: true },
      budget: { type: Number, required: true },
      departure: {
        code: { type: String, required: true },
        name: { type: String, required: true },
      },
      arrival: {
        code: { type: String, required: true },
        name: { type: String, required: true },
      },
      arrivalImg: [{ type: String, required: true }],
      arrivalDescription: { type: String, required: true },
    }
});

const Itinerary = mongoose.model<Itinerary>('Itinerary', itinerarySchema);

export default Itinerary;