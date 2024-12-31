import { formatedResCompletion } from "../utils/gpt/gpt";
import { AccommodationResponse, FlightResponse, FoodResponse, FormatedItineraryResponse, ItineraryResponse, LocationResponse, MinPriceResponse, TipWeatherFeeResponse } from "../utils/gpt/type";
import { zodResponseFormat } from "openai/helpers/zod";
import { CityType } from "../types/types";
import { getImage } from "../utils/serperUtils";
import * as dotenv from 'dotenv';
dotenv.config();


export type TripInfo = {
    duration: number;
    budget: number;
    arrival: CityType;
    departure: CityType;
    travelerQuantities: number;
    startDate: string;
    endDate: string;
}



export const getPlanning = async (tripInfo: TripInfo) => {
    try {
        const minPrompt = getMinQuestion(tripInfo.departure.name, tripInfo.arrival.name, tripInfo.budget.toString(), tripInfo.duration.toString());
        const minFormat = zodResponseFormat(MinPriceResponse, 'minPriceResponse');

        const minRes = await formatedResCompletion(undefined, minPrompt, minFormat, null);
        if (minRes?.parsed === undefined) throw new Error("Error in fetching min price");
        const minPrice = minRes.parsed as any;
        if (minPrice.canGo === false) throw new Error(`Unable to travel, the minimum price required is ${minPrice?.price}. Please increase your budget.`);

        let gptRes: any = {
            fly: null,
            locations: null,
            foods: null,
            accommodations: null,
            other: null,
        };

        await Promise.all(TotalQuery.map(async (query: string, index: number) => {
            const promptQuery = `${context(tripInfo)} \n ${query}`;
            const formatQuery = zodResponseFormat(TotalFormat[index], stringResFormat[index]);
            const resQuery = await formatedResCompletion(undefined, promptQuery, formatQuery, null);
            if (resQuery?.parsed === undefined) throw new Error("Error in fetching data");
            const parsedRes = resQuery.parsed as any;
            gptRes[key[index]] = parsedRes[key[index]];
        }));
        console.log(gptRes);

        const foodName = gptRes.foods.map((item: any) => item.name);
        const locationName = gptRes.locations.map((item: any) => item.name);

        const prompt = `${context(tripInfo)} \n ${itineraryContext(foodName, locationName)}${itineraryQuestion(tripInfo.duration, tripInfo.budget)}`;

        const format = zodResponseFormat(FormatedItineraryResponse, "formatedItineraryResponse");
        const res = await formatedResCompletion(undefined, prompt, format, null);
        if (res?.parsed === undefined) throw new Error("Error in fetching lucky trip");
        let itineraryRes = res.parsed as any;
    
        let data = {
            itinerary: itineraryRes.itinerary,
            totalFee: gptRes.other.totalFee,
            foods: gptRes.foods,
            locations: gptRes.locations,
            accommodation: gptRes.accommodations,
            tips: gptRes.other.tips,
            weather: gptRes.other.weather,
            topExperience: gptRes.other.topExpereince,
            wardrobe: gptRes.other.wardrobe,
            img: {}
        };

        const locationImg = await getImage(data.locations.map((item: any) => `${item.name}-${item.address}`), 5);
        const foodImg = await getImage(data.foods.map((item: any) => `${item.name}`), 5);
        const accommodationImg = await getImage(data.accommodation.map((item: any) => `${item.name}-${item.address}`), 5);
        data.img = {
            location: locationImg,
            food: foodImg,
            accommodation: accommodationImg
        };
        return data;

    } catch (e) {
        console.log(e);
        throw e;
    }
};

const context = (tripInfo: TripInfo) => {
    const context = `
        Context:
        The user is currently in ${tripInfo.departure.name} with the code ${tripInfo.departure.code}.
        The user wants to plan a trip to the city ${tripInfo.arrival.name} with the code ${tripInfo.arrival.code} for ${tripInfo.duration} days, from ${tripInfo.startDate} to ${tripInfo.endDate}, with a budget of ${tripInfo.budget} VND for ${tripInfo.travelerQuantities} people.
    `;

    return context;
};





const getMinQuestion = (departure: string, arrival: string, budget: string, duration: string) => {
    const question = `The user is currently in ${departure} and wants to plan a trip to ${arrival} for ${duration} days with a budget of ${budget} dollars per person.
                Please let me know if the user can travel within this budget.
                If yes, respond with yes. If no, respond with no, and include the minimum price based on the given context.
                The response should be in the format:
     {canGo: , price: }
    `
    return question;
}
const itineraryContext = (foods: string[], locations: string[]) => {
    let foodContext = ``;
    foods.forEach((food, index) => {
        foodContext += `Order number: ${index + 1} and name: ${food}\n`;
    });
    let locationContext = ``;
    locations.forEach((location, index) => {
        locationContext += `Order number: ${index + 1} and name: ${location}\n`;
    });
    return `List of Foods: ${foodContext} \n List of Attractions: ${locationContext} \n ${ItineraryQuery}`;
};

const LocationQuery = `2. Please research famous tourist destinations and provide 10 locations in order (include their position) and respond in the format: 
             locations: [{position: , name: , description: , address: }]`;

const FoodQuery = `3. Please research famous dishes and provide 10 dishes in order along with the restaurants serving these dishes, their addresses, and respond in the format: 
             food: [{position: , name: , restaurantName: , address: }]`;

const AccommodationQuery = `4. Please research suitable accommodations and provide 10 options in the format:
                accommodations: [{name: , address: , description: }]`;

const TipQuery = `
                 7. Please provide 3 tips for the journey in the format: 
                   tips: [{name: , description: }]
                6. Please list the costs for the itinerary above, including:flights price, trasportation, activities, food and acommodation and miscellaneous in the format: 
                    totalFee: {flights: , transportation: , activities: , food: ,acommodation: ,miscellaneous: }
                 8. Provide weather information (name: including 3 types - rainy, cloudy, sunny; description: describe the weather; temperature) in the format:
                  weather: [{name: , description: , temperature: }]
                9.Please list the top  experiences in the city according to the For the body, For the mind and For the soul in th forma:
                  topExperiences:[{forTheBody: , forTheMind: , forTheSoul: }]
                10.Please list Feng Shui-Inspired Travel Wardrobe according to clothe recommendations and Accessories recommendations in the format:
                    wardrobe:[{clotheRecommendation: , accessoriesRecommendation: }]
                  
                  `;

const FlightQuery = `1. Please research whether it is possible to travel by plane operated by VietjetAir (if yes, respond with "yes" and include the price in Vietnamese Dong, otherwise respond with "no"). Respond in the format:
            fly: {canFly: , price: }`;



const itineraryQuestion = (duration: number, budget: number) => {
    const query = `
    Question: 
    5. The user wants an itinerary based on the LOCATIONS AND FOODS MENTIONED IN THE CONTEXT for ${duration} days with a budget of ${budget} and each activity being one of two types: location or food. Pay special attention to the "position," which should correspond to the order number of the location or food in the context list, depending on the type. Additionally, "realDay" should represent the actual date (e.g., April 12, 2023). Respond in the format:
            itinerary: [{day: , realDay: , activities: [{name: , description: , startTime: , endTime: , type: , position: }]}]`;
    
    return query;
};


const TotalQuery=[FlightQuery,LocationQuery,FoodQuery,AccommodationQuery,TipQuery];

const TotalFormat=[FlightResponse,LocationResponse,FoodResponse,AccommodationResponse,TipWeatherFeeResponse];

const stringResFormat=["flightResponse","locationDescriptionsResponse","foodDescriptionsResponse","acommodationResponse","tipWeatherFeeResponse"];

const key=["fly","locations","foods","accommodations","other"];

const ItineraryQuery=`
        5. Người dùng muốn có một lịch trình dựa trên các ĐỊA ĐIỂM ĐÃ ĐƯỢC ĐỀ CẬP Ở QUERY 1 VÀ MÓN ĂN VÀ QUÁN ĂN Ở QUERY 2 và trong  và mỗi hoạt động là 1 trong 2 loại location,food và id sẽ là số thứ tự trong danh sách phía trên và realDay là ngày ,tháng năm thực sư (ví dụ: ngày 12 tháng 4 năm 2023)  trả lời dưới dạng:
                itinerary: [{day: ,realDay: , activities: [{name: , description: , startTime: , endTime: ,type: ,id:  }]}] 
        `


// const instructText = (duration: number, budget: number) => {
//     const query =
//         `
//         Query:
//             1. Hãy research đẻ xem có thể di chuyển được bằng máy bay được khai thác bởi hãy vietjetAIr hay không ( nếu có thì trả lời yes và ghi giá theo việt nam đồng còn không thì trả lời no) trả lời theo dạng:
//             fly: {canFly: , price: }
//             2.Hãy research các địa điểm du lịch nổi tiếng và đưa ra 10 địa điểm theo thứ tự(đánh thứ tự lên position) và trả lời dưới dạng 
//              locations: [{position: name: , description: ,address:  }]
//             3. Hãy research các món ăn nổi tiếp và hãy đưa ra 10 món  theo thứ tự đồng thời gồm các quán ăn bán món ăn đó, địa chỉ của quán ăn và đánh thứ tự và trả lời dưới dạng
//               food: [{position: ,name: , restaurantName: ,address: }]
//             4. Hãy research  các chỗ ở phù hợp và đưa ra 4 chỗ ở 
//                 accommodations: [{name: , address: , description: }]
//             5. Người dùng muốn có một lịch trình dựa trên các ĐỊA ĐIỂM ĐÃ ĐƯỢC ĐỀ CẬP Ở QUERY 1 VÀ MÓN ĂN VÀ QUÁN ĂN Ở QUERY 2 và trong ${duration} ngày với chi phí  ${budget} và mỗi hoạt động là 1 trong 2 loại location,food và id sẽ là số thứ tự trong danh sách phía trên và realDay là ngày ,tháng năm thực sư (ví dụ: ngày 12 tháng 4 năm 2023)  trả lời dưới dạng:
//             itinerary: [{day: ,realDay: , activities: [{name: , description: , startTime: , endTime: ,type: ,id:  }]}] 
//             6. Hãy đưa ra các chi phí cho lịch trình trên bao gồm: chi phí cho trải nghiệm, di chuyển, ăn uống, chỗ ở và các chi phí khác và trả lời dưới dạng: 
//              totalFee:{ travelExperience: , transportation: , accommodation: , food: , other: }
//             7. Hãy đưa ra 3 tips cho hành trình: 
//                 tips: [{name: , description: }]
//             8. Thông tin về thời tiết ( name: gồm 3 loại rainny, cloudy, sunny và description: mô tả thời tiết và temperature) và trả lời dưới dạng:
//                 weather: [{name: , description: , temperature: }]
//     `
//     return query;

// }