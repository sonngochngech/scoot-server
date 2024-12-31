
import { City, CityDoc } from '../models/schemas/city';
import { LuckTravel } from "../models/schemas/luckTravel";
import { CityType } from "../types/types";


export const getLuckyCitys=async(hy_than: string[], placeOfBirth: string,destinationCode: string):Promise<{desiredCity:CityType,recommendsCity: CityType[]}>=>{
    try{
        let luckyTravel=null;
        for (const item of hy_than) {
            const searchCriteria = {
                hythan: item,
                departure: placeOfBirth
            };
            luckyTravel = await LuckTravel.findOne(searchCriteria).exec();
            if (luckyTravel) {
                break;
            }
        }
        if(luckyTravel===null){
            throw new Error("Lucky travel not found");
        }
        
        let cities: (CityDoc|null)[] = await Promise.all(luckyTravel.destination.map(async (city) => {
            const storedCity= City.findOne({code: city}).exec();
           return storedCity || null;
        }));
        cities=cities.filter((city)=>city!==null);
        
        const desiredCity=await City.findOne({code: destinationCode}).exec();
        if(desiredCity==null){
            throw new Error("City not found");
        }
        if(cities.length===0){
            return {
                desiredCity: { name: desiredCity.name, code: desiredCity.code },
                recommendsCity: []
            }
        }
        
        return {
            desiredCity: { name: desiredCity.name, code: desiredCity.code },
            recommendsCity: cities.map((city)=>{
                if(city==null){
                    throw new Error("City not found");
                }
                return {name: city.name, code: city.code};
            })
        };
    }catch(e){
       throw e;
    }
}

export const getAll=async()=>{
    try{
        const cities=await City.find({}).exec();
        return cities;
    }catch(e){
        throw e;
    }
}

export const getCityByCode=async(code: string): Promise<CityDoc|null>=>{
    try{
        const city=await City.findOne({
            code: code
        }).exec();
        return city;

    }catch(error:any){
        throw error;

    }

}


