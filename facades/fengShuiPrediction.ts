import { getCityByCode,getAll } from "../services/city";
import { formatedResCompletion } from "../utils/gpt/gpt";
import { CityResponse } from "../utils/gpt/type";
import * as fs from "fs";
import { CityType, LuckTravelResponse, LuckyTravelInfo, LuckyUserInfo, UserLuckyProfile } from '../types/types';
import { zodResponseFormat } from "openai/helpers/zod";
import path from "path";
import { getImage } from "../utils/serperUtils";
import { gptFengShuiRole, instructFengShuiText } from '../config/data/instruct';
import { saveUserAnalization, saveUserLuckyProfile } from "../services/user";
import * as dotenv from 'dotenv';
import { City, CityDoc } from "../models/schemas/city";
import * as  levenshtein from 'fast-levenshtein';
dotenv.config();
const { dungHyThan, getFormattedJson } = require('dunghythan');
const filePath = path.resolve(__dirname, '../config/data/luckyPlace.txt');




const getLuckyTrip = async (luckyTravelInfor: LuckyTravelInfo): Promise<LuckTravelResponse | null> => {
    try {
        const userLuckyProfile = await getHythan(luckyTravelInfor.userInfo);
        const desiredCity: CityDoc|null=await getCityByCode(luckyTravelInfor.arrivalCity);
        if(desiredCity===null) {
            throw new Error("City not found");
        }

        const recomendsCity:CityType[]|null=null;
        const isDesiredCityInRecommendCity=false;

        // get gpt recommendations
        const prompt = luckyProfile(userLuckyProfile, desiredCity, recomendsCity,isDesiredCityInRecommendCity);
        const format = zodResponseFormat(CityResponse, "cityResponse");
        const res = await formatedResCompletion(gptFengShuiRole(), prompt, format, null);
        if (res?.parsed === undefined) throw new Error("Error in fetching lucky trip");
        let luckyCities = res.parsed as any;

        // get images
        const cityTitle = [imageTilte(desiredCity.name), ...luckyCities.suggestedCity.map((city: CityType) => imageTilte(city.name))];
        const images = await getImage(cityTitle, Number(process.env.IMAGE_COUNT));

        // save to user analization
        const stringCityLuckyCities=JSON.stringify(luckyCities);
        if(luckyTravelInfor.userInfo.phone !== null && luckyTravelInfor.userInfo.phone !== undefined) await  saveUserAnalization(luckyTravelInfor.userInfo.phone, stringCityLuckyCities);
     

        // get city codes
        let matchedCities=await getCodes(luckyCities.suggestedCity.map((city: CityType) => city.name));

        luckyCities.suggestedCity=luckyCities.suggestedCity.map((city: CityType,index:number)=>{
            if(matchedCities[index]===null) return {...city,code: null};
            return {
                ...city,
                code: matchedCities[index].code
            }
        });

        const response = {
            comment: luckyCities.comment,
            introduction: luckyCities.introduction,
            departureCity: luckyTravelInfor.departureCity,
            arrivalCity: {
                code: desiredCity.code as string,
                reason: luckyCities.desiredCity.reason,
                images: images[0]
            },
            suggestedCities: luckyCities.suggestedCity.map((city: CityType, index: number) => ({
                code: city.code,
                reason: luckyCities.suggestedCity[index].reason,
                images: images[index + 1]
            })),
        };
        return response;
    } catch (e) {
        throw e;
    }

}



const luckyProfile = (luckyUserProfile: UserLuckyProfile, destination: CityType, suggestedCity: CityType[]|null,isRecommend:boolean) => {
    const prompt = fs.readFileSync(filePath, "utf-8");
    const userProfile = context(luckyUserProfile, destination, suggestedCity,isRecommend);
    const instruct = instructFengShuiText();
    return prompt + `\n${userProfile}\n${instruct}`;  
}

const context = (userLuckyProfile: UserLuckyProfile, destination: CityType, suggestedCity: CityType[]|null,isRecommend: boolean) => {
    try{
        const  appropiate= isRecommend? 'phù hợp': 'phù hợp nhưng cần phải lưu ý';
    const context =
    userLuckyProfile.gia_tri.moc!== null? `
   Context: 
    Thông tin người dùng:
     Can chi:   
        năm: ${userLuckyProfile.can_chi.nam}
        tháng:${userLuckyProfile.can_chi.thang}
        ngày:${userLuckyProfile.can_chi.ngay}
        giờ: ${userLuckyProfile.can_chi.gio}
    Mệnh: ${userLuckyProfile.menh}
    Mệnh chủ: ${userLuckyProfile.menh_chu}
    Dụng hỷ thần (khuyết): ${userLuckyProfile.dung_hy_than}
    Giá trị:
        Mộc:${userLuckyProfile.gia_tri.moc}
        Hỏa:${userLuckyProfile.gia_tri.hoa}
        Thổ:${userLuckyProfile.gia_tri.tho}
        Kim:${userLuckyProfile.gia_tri.kim}
        Thủy:${userLuckyProfile.gia_tri.thuy}
        Ấn tinh:${userLuckyProfile.gia_tri.an_tinh}
        Tỷ kiếp:${userLuckyProfile.gia_tri.ty_kiep}
        Tài tinh: ${userLuckyProfile.gia_tri.tai_tinh}
        Thực thương: ${userLuckyProfile.gia_tri.thuc_thuong}
        Quan sát:${userLuckyProfile.gia_tri.quan_sat}
        MC:${userLuckyProfile.gia_tri.mc}
    Địa điểm muốn đi: ${destination.name} với mã code ${destination.code}  ${appropiate} với mệnh chủ
    `
    :
    `
    Context: 
    Thông tin người dùng:
     Can chi:   
        năm: ${userLuckyProfile.can_chi.nam}
        tháng:${userLuckyProfile.can_chi.thang}
        ngày:${userLuckyProfile.can_chi.ngay}
        giờ: ${userLuckyProfile.can_chi.gio}
    Mệnh: ${userLuckyProfile.menh}
    Mệnh chủ: ${userLuckyProfile.menh_chu}
    Dụng hỷ thần (khuyết): ${userLuckyProfile.dung_hy_than}
    Địa điểm muốn đi: ${destination.name} với mã code ${destination.code}  ${appropiate} với mệnh chủ
  
    `
    return context;
    }catch(e){
        throw e;
    }
}


const imageTilte = (city: string | null | undefined) => {
    return `Bức ảnh đẹp về thành phố ${city},việt nam`;
}


const getHythan =async  (userInfo: LuckyUserInfo) => {
  try{
    console.log(userInfo);
    let { name, birthdate, sex, timeOfBirth, placeOfBirth } = userInfo;
    if(sex === 0) sex=-1;

    const [year, month, day] = birthdate.split("-");
    console.log(year, month, day);
    let [hour, minute]: [number | null, number | null] = [0, 0];
    if(timeOfBirth === undefined || timeOfBirth === null){
            hour =null;
            minute = null;
    }else{
        [hour, minute] = timeOfBirth.split(":").map((element) => parseInt(element));
    }
    console.log(year, month, day);
     console.log(parseInt(year), parseInt(month), parseInt(day), hour, minute,sex);

    const res = await dungHyThan(parseInt(year), parseInt(month), parseInt(day), hour, minute, sex);
    const hythan = getFormattedJson(res);
    const formatedHythan = {
        can_chi: {
            nam: hythan['Can Chi']['Năm'],
            thang: hythan['Can Chi']['Tháng'],
            ngay: hythan['Can Chi']['Ngày'],
            gio: hythan['Can Chi']['Giờ'],
        },
        menh: hythan['Mệnh'],
        menh_chu: hythan['Mệnh chủ'],
        dung_hy_than: hythan['Dụng hỷ thần (khuyết)'],
        gia_tri: {
            moc: hythan['Mộc'],
            hoa: hythan['Hoả'],
            tho: hythan['Thổ'],
            kim: hythan['Kim'],
            thuy: hythan['Thuỷ'],
            an_tinh: hythan['Ấn Tinh'],
            ty_kiep: hythan['Tỷ Kiếp'],
            tai_tinh: hythan['Tài Tinh'],
            thuc_thuong: hythan['Thực Thương'],
            quan_sat: hythan['Quan Sát'],
            mc: `${res.nc}%`,
        },
    };


    const userInfoText=JSON.stringify(userInfo);
    const stringHythan = JSON.stringify(hythan);    
    let content = `Thông tin cơ bản của người dùng: ${userInfoText} \n Thông tin phong thủy của người dùng: ${stringHythan}`;
    if(userInfo.phone !== null &&  userInfo.phone !== undefined) {await saveUserLuckyProfile(userInfo.phone, content);};

    return formatedHythan;
  }catch(e){
    console.log(e);
      throw e;
  }


}

const getCodes=async(name: string[])=>{
    const cities=await getAll();
    let matchedCities=name.map((text)=>{
        let bestMatch = null;
        let smallestDistance = Infinity;
            for(const query of cities){
                const distance = levenshtein.get(text.toLowerCase(), query.name.toLowerCase());
                    if (distance < smallestDistance) {
                    smallestDistance = distance;
                    bestMatch = query;
                    }
            }
        return bestMatch;
    })
    return matchedCities;
    
}


export { getLuckyTrip };