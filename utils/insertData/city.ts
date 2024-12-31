// import * as fs from 'fs';
// import * as readline from 'readline';
// import mongoose from 'mongoose';
// import { City, CityDoc } from '../../models/schemas/city';
// import { connectDB } from '../../config/mongodb';
// import * as path from 'path';
// // async function readLines(filePath: string): Promise<void> {
// //     const fileStream = fs.createReadStream(filePath);

import { cities } from "../../config/constants"
import { connectDB } from "../../config/mongodb";
import { City } from "../../models/schemas/city"

// //     const rl = readline.createInterface({
// //         input: fileStream,
// //         crlfDelay: Infinity
// //     });

// //     const cities: CityDoc[] = [];

// //     for await (const line of rl) {

// //         const [id, name, code] = line.split(',');
// //         console.log(`id: ${id}, name: ${name}, code: ${code}`);
// //         cities.push({ name, code } as CityDoc);
// //     }

// //     // Insert the cities in bulk
// //     await City.insertMany(cities);
// //     console.log('Cities inserted successfully');
// // }

// // Connect to MongoDB and call the readLines function
// async function main() {
//     try {
//         await connectDB();
//         console.log('Connected to MongoDB'); 
//         const filePath = path.resolve(__dirname, '../../config/data/city.txt');
//         await readLines(filePath);
//     } catch (error) {
//         console.error('Error:', error);
//     } finally {
//         await mongoose.disconnect();
//     }
// }

const insertCity=async()=>{
    await City.insertMany(cities);
    

}

// async function  main() {
//     await connectDB();
//     await insertCity();
//     console.log('Cities inserted successfully');
    
// }
// main();