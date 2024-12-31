import { connectDB } from "../config/mongodb";
import { LuckTravel, luckTravelSchema } from "../models/schemas/luckTravel";
import { cities } from './data';


const check=async()=>{

    await Promise.all(cities.map(async (city) => {
        let searchCriteria = {
            departure: city.code
        };
        const luckyTravel = await LuckTravel.find(searchCriteria).exec();
        if (!luckyTravel || luckyTravel.length !== 5 ) {
            console.log(`Lucky travel not found for city: ${city.label}  ${city.code}`);
        }
    }));
}

async function main(){
    await connectDB();
    await check();
    console.log("Done");
}
main().then(()=>{}).catch((error)=>{
    console.log(error);
});