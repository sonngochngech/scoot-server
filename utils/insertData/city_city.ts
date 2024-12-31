import * as fs from "fs";
import * as path from 'path';
import  cityTocity from '../../config/data/city_city.json';
import { LuckTravel, LuckTravelDoc } from "../../models/schemas/luckTravel";
import { connectDB } from '../../config/mongodb';
import mongoose from 'mongoose';
const processCSV = (filePath: string) => {
  try {
    // Read the file
    const fileContent = fs.readFileSync(filePath, "utf8");

    // Split the content by new lines and commas
    const rows = fileContent.split("\n");
    const processedData = rows.map((row) => row.split(",").map((cell) => cell.trim()));

    // Log or process the data
    console.log("Processed Data:", processedData);

    // Optional: Convert to JSON or save it to a file
    const jsonOutput = JSON.stringify(processedData, null, 2);
    fs.writeFileSync(path.resolve(__dirname, '../../config/data/city_city.json'), jsonOutput, "utf8");
    console.log("Data saved to output.json");
  } catch (error) {
    console.error("Error reading or processing the file:", error);
  }
};

// Call the function with your file path
// processCSV(path.resolve(__dirname, '../../config/data/city_city.csv'));

async function addToDB(){

    
    try{
        const cities= await cityTocity;
        const hythanTravel:LuckTravelDoc[]=[];
        let departure='';
        let destination: string[]=[];
        let hythan='';
        for(const city of cities){
            if(city[2].length != 0){
                hythanTravel.push({hythan,departure,destination: [...destination]} as LuckTravelDoc)
                if(city[0].length != 0) departure=city[1];
                    hythan=city[2];
                    destination.length=0;
                    destination.push(city[5]);
            }
            if(city[0].length == 0 && city[2].length == 0){
                destination.push(city[5]);
            }
        }
        hythanTravel.push({hythan,departure,destination} as LuckTravelDoc)
        hythanTravel.shift();
        await LuckTravel.insertMany(hythanTravel);
        console.log('Data inserted successfully');
        


        
    }catch(error){
        console.log(error);
    }

}

// async function main() {
//     try {
//         await connectDB();
//         console.log('Connected to MongoDB'); 
//         // const filePath = path.resolve(__dirname, '../../config/data/city.txt');
//         await addToDB();
//     } catch (error) {
//         console.error('Error:', error);
//     } finally {
//         await mongoose.disconnect();
//     }
// }

// main().catch(console.error);