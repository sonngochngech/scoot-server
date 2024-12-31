import { Request, Response } from "express";
import { getLuckyTrip } from "../facades/fengShuiPrediction";
import { LuckyTravelInfo } from "../types/types";
import { getPlanning, TripInfo } from "../facades/TripPlanning";
import { getItinerary, saveItinerary } from "../services/itinerary";
import { fengShuiInfoSchema, tripPlanningSchema } from "../types/validate";
import { fakeResponse } from "../tests/data";
import { getAll } from "../services/city";

export const getCities = async (req: Request, res: Response) => {
    try{
        const result=await getAll();
        res.json({
            status: 200,
            result: result,
        });
    }catch(err){
        res.status(400).json({
            message: "Hiện tại bạn không thể xem, vui lòng thử lại"
        })
    }
}
export const getFengShui = async (req: Request, res: Response) => {
    try{
        const {error,value}=fengShuiInfoSchema.validate(req.body);
        if(error){
            throw new Error(error.message);
        }
        const luckyTravelInfor: LuckyTravelInfo = req.body as unknown as LuckyTravelInfo ;
        // const result = await getLuckyTrip(luckyTravelInfor);
        const result= {
        "comment": "According to Feng Shui Bazi, your energy profile reveals a deficiency in both Wood, at 15.17%, and Fire elements, with no specified percentage, contributing to a lack of assertiveness and dynamism in personal pursuits. While you exhibit stability and responsibility due to a balanced Earth element at 29.08% and find comfort in structured and long-term goals, the lack of Fire may make you feel less enthusiastic and deterred by a lack of excitement in routine tasks. To enhance your personal growth and energy levels, consider traveling to destinations southeast towards areas that provide a lively and energetic environment. These locations stimulate your inner Fire and Wood elements, thereby invigorating your zest for life and fostering lively interactions with people. By encouraging more engagement with nature and warmer climatic regions imbued with the energy of growth and transformation, such travel will help replenish your motivational fire and restore a sense of vitality, enabling you to pursue endeavors with renewed zeal and creativity.",
        "introduction": "Based on your astrological data, here's an analysis of your element and recommendations for destinations to balance your energy:",
        "departureCity": "HN-VN",
        "arrivalCity": {
            "code": "NY-US",
            "name": "New York",
            "reason": [
                {
                    "criteria": "Natural landscape",
                    "description": "New York's vibrant cityscape, structured with tall skyscrapers and bustling urban environments, reflects a dynamic flow of energy. While surrounded by water bodies like the Hudson River, the city's active and lively atmosphere is akin to the needed Fire energy, providing a complementary boost to your elemental requirement."
                },
                {
                    "criteria": "Rich activities",
                    "description": "The culturally rich and diverse tapestry of New York offers an array of experiences, from world-class art museums to lively theater performances and diverse culinary adventures. These activities can invigorate and inspire individuals, offering excitement and a renewed sense of purpose, aligning well with your need for increased enthusiasm."
                },
                {
                    "criteria": "Support for the user's element",
                    "description": "New York, with its vibrant, fast-paced energy, offers a potential surge of motivational force akin to the Fire element. This environment supports the enhancement of your creative and inspirational prowess, aligning well with your lacking Fire energy."
                }
            ],
            "images": [
                "https://kenh14cdn.com/thumb_w/650/2016/n1-1464592882945.jpg",
                "https://media.istockphoto.com/id/1406960186/vi/anh/%C4%91%C6%B0%E1%BB%9Dng-ch%C3%A2n-tr%E1%BB%9Di-c%E1%BB%A7a-th%C3%A0nh-ph%E1%BB%91-new-york-hoa-k%E1%BB%B3.jpg?s=612x612&w=0&k=20&c=rdZLmhIpV-EIFC7obUd2Ke8-sFelqEZn5eXUer77Fi4=",
                "https://media.istockphoto.com/id/1454217037/vi/anh/t%C6%B0%E1%BB%A3ng-n%E1%BB%AF-th%E1%BA%A7n-t%E1%BB%B1-do-v%C3%A0-%C4%91%C6%B0%E1%BB%9Dng-ch%C3%A2n-tr%E1%BB%9Di-th%C3%A0nh-ph%E1%BB%91-new-york-v%E1%BB%9Bi-khu-t%C3%A0i-ch%C3%ADnh-manhattan-trung-t%C3%A2m.jpg?s=612x612&w=0&k=20&c=S4eluGOFZJTAyb_Jgim5-nJmkZNMhcy5t4_VOA2kKR0=",
                "https://usis.us/uploads/images/contents/pr/danh_lam_thang_canh_my_2.jpg",
                "https://www.thm.vn/media/k2/items/cache/7e64c4d2a4a242251ffdaa790b21fa01_XL.jpg",
                "https://media.istockphoto.com/id/599766748/vi/anh/th%C3%A0nh-ph%E1%BB%91-c%E1%BB%A7a-nh%E1%BB%AFng-gi%E1%BA%A5c-m%C6%A1-%C4%91%C6%B0%E1%BB%9Dng-ch%C3%A2n-tr%E1%BB%9Di-c%E1%BB%A7a-th%C3%A0nh-ph%E1%BB%91-new-york-l%C3%BAc-ch%E1%BA%A1ng-v%E1%BA%A1ng.jpg?s=612x612&w=0&k=20&c=owVwNNd6z8qSe8NvsyjjkDhmcVDWo6EMkGrPbSmbpVk=",
                "https://www.tiktok.com/api/img/?itemId=7402612269676350737&location=0&aid=1988",
                "https://upload.wikimedia.org/wikipedia/commons/0/05/View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu.jpg",
                "https://media.istockphoto.com/id/525232662/vi/anh/t%C3%B2a-nh%C3%A0-nh%C3%A0-n%C6%B0%E1%BB%9Bc-%C4%91%E1%BA%BF-ch%E1%BA%BF-new-york-v%C3%A0-t%C6%B0%E1%BB%A3ng-n%E1%BB%AF-th%E1%BA%A7n-t%E1%BB%B1-do.jpg?s=612x612&w=0&k=20&c=EMOwh8nXR-n3e5tlIgHbk1d0iEcIEiYGYziiJs1vvhY=",
                "https://vemaybaydimy.org.vn/static/ticket/2021/0330/thanh-pho-new-york-ve-dem-4-381_thumb_250x180.jpg"
            ]
        },
        "suggestedCities": [
            {
                "code": "HI-US",
                "name": "Hawaii",
                "reason": [
                    {
                        "criteria": "Natural landscape",
                        "description": "Hawaii's breathtaking scenery, characterized by lush tropical forests, volcanic landscapes, and sun-kissed beaches, offers a natural affinity to the Fire element. The warm climate further supports a renewing experience, making it an ideal destination for enhancing one's vibrant energy and vitality."
                    },
                    {
                        "criteria": "Rich activities",
                        "description": "The cultural richness of Hawaii, from hula dancing to traditional luau feasts, invites participants into a dynamic world of movement and joy. These activities offer a unique opportunity to engage with the vibrant energy of the islands, providing rejuvenation and inspiration in alignment with the missing Fire element in your chart."
                    },
                    {
                        "criteria": "Support for the user's element",
                        "description": "Hawaii's abundant sunshine and volcanic energy inherently resonate with the Fire element, offering a natural healing and energizing experience. By immersing oneself in this environment, one can enhance creativity, motivation, and enthusiasm, directly addressing the lack of Fire strength."
                    }
                ],
                "images": [
                    "https://media.istockphoto.com/id/624711274/vi/anh/honolulu-hawaii.jpg?s=612x612&w=0&k=20&c=ARtDthwU7kmyTKrs2FeOg-b9eX1QinVs-RtdmbW8RP4=",
                    "https://media.istockphoto.com/id/610041376/vi/anh/b%C3%ACnh-minh-tuy%E1%BB%87t-%C4%91%E1%BA%B9p-tr%C3%AAn-bi%E1%BB%83n.jpg?s=612x612&w=0&k=20&c=Z7X7dpshWmCJx903eNpSjczaWwniiwh92r2yYahdqZY=",
                    "https://vemaybaydimy.biz.vn/wp-content/uploads/ve-may-bay-di-honolulu.jpg",
                    "https://media.istockphoto.com/id/1427704241/vi/anh/nh%C3%ACn-t%E1%BB%AB-tr%C3%AAn-cao-c%E1%BB%A7a-th%C3%A0nh-ph%E1%BB%91-wailuku-tr%C3%AAn-%C4%91%E1%BA%A3o-maui-%E1%BB%9F-hawaii.jpg?s=612x612&w=0&k=20&c=rfqlk19ne_3e75-sWe4_jO3m79P9scsQJjVH9RBdN0U=",
                    "https://media.istockphoto.com/id/938335974/vi/anh/nh%C3%ACn-t%E1%BB%AB-tr%C3%AAn-kh%C3%B4ng-khu-v%E1%BB%B1c-kualoa-c%E1%BB%A7a-oahu-hawaii.jpg?s=612x612&w=0&k=20&c=MID2wbkXvDJjMAoZGqAvTf1JqwmZsQIE6StRMYxGF9c=",
                    "https://media.istockphoto.com/id/1038532990/vi/anh/diamond-head-state-park-tr%C3%AAn-kh%C3%B4ng.jpg?s=612x612&w=0&k=20&c=bnH-rlgFz9tbtZE9rdOJBOshJO7nGrS9vcQfSh0XS7k=",
                    "https://thegioiviet.com.vn/wp-content/uploads/2015/02/hawaii.jpg",
                    "https://media.istockphoto.com/id/1371880849/vi/anh/hawaii-b%C3%A3i-bi%E1%BB%83n-honolulu-c%E1%BA%A3nh-quan-du-l%E1%BB%8Bch-th%C3%A0nh-ph%E1%BB%91-c%E1%BB%A7a-b%C3%A3i-bi%E1%BB%83n-waikiki-v%C3%A0-%C4%91%E1%BB%89nh-n%C3%BAi-diamond.jpg?s=612x612&w=0&k=20&c=O-60nz3nx7hbBLKQpb6AFh4NYBPMNBro6bdoUKxw4rQ=",
                    "https://a.travel-assets.com/findyours-php/viewfinder/images/res70/499000/499154-makiki-lower-punchbowl-tantalus.jpg",
                    "https://media.istockphoto.com/id/117211856/vi/anh/n%C6%A1i-d%E1%BB%ABa-ph%C3%A1t-tri%E1%BB%83n.jpg?s=612x612&w=0&k=20&c=8ewKoEmd4NrByN8WlPYz1Kg2_R4ktY1UzbeY9lelCjI="
                ]
            },
            {
                "code": "TAS-AU",
                "name": "Sydney",
                "reason": [
                    {
                        "criteria": "Natural landscape",
                        "description": "Sydney is renowned for its stunning harbor setting, golden beaches, and sunny climate, closely resonating with the Fire element. This environment offers plenty of opportunities to bask in the life-giving warmth and make the most of the natural surroundings that uplift spirit and energy."
                    },
                    {
                        "criteria": "Rich activities",
                        "description": "Sydney offers a wealth of cultural and recreational activities, from the renowned Sydney Opera House showcasing vibrant performances to exciting festivals and waterfront activities. These experiences not only entertain but also rejuvenate, offering the dynamics you need to balance your inherent energies."
                    },
                    {
                        "criteria": "Support for the user's element",
                        "description": "The sunny and lively environment of Sydney supports the cultivation of the Fire element, essential for uplifting and invigorating your energy. A visit to such an environment encourages the enhancement of creativity, energy, and enthusiasm, which are crucial per your astrological needs."
                    }
                ],
                "images": [
                    "https://www.thm.vn/media/k2/items/cache/3f4808b525a42a0bb340252b3c0de1d3_XL.jpg",
                    "https://media.baoquangninh.vn/dataimages/201709/original/images983038_1.jpg",
                    "https://media.istockphoto.com/id/535455441/vi/anh/quang-c%E1%BA%A3nh-c%E1%BA%A3ng-sydney-%C3%BAc.jpg?s=612x612&w=0&k=20&c=E5A3AaJ0JGx9X3U98SjE8pmcy1Vb82BbluDfSmTM3IY=",
                    "https://apibeta.baoninhbinh.org.vn/user-blob/bnb_old_data/DATA/ARTICLES/2024/4/26/du-lich-sydney-thanh-pho-xinh-dep-dang-trai-nghiem-tai-xu-so-4e307.png",
                    "https://www.shutterstock.com/image-photo/opera-house-sydney-australia-260nw-2548736919.jpg",
                    "https://www.wtour.vn/content_vnvacations/upload/Image/sydney_above.jpg",
                    "https://uca.com.vn/wp-content/uploads/2022/07/thanh-pho-sydney-cua-uc-05.jpg",
                    "https://www.vietnambooking.com/wp-content/uploads/2018/11/dulich-nuoc-uc-6n5d-kham-pha-thanh-pho-sydney-melbourne-20112018-8.jpg",
                    "https://www.dulichhaidang.com/uploads/content/thanh-pho-sydney_1696334182.jpg",
                    "https://dulichtoancau.com.vn/wp-content/uploads/2023/03/1-12.jpg"
                ]
            }
        ]
        }
        res.json({
            status: 200,
            result: result,
        });
    }catch(err: any){
        console.log(err);
        res.status(400).json({
            message: err.message || "Hiện tại bạn không thể xem trang, vui lòng thử lại"
        })
    }
}

export const getTripPlanning = async (req: Request, res: Response) => {
    try{
        const {error,value}=tripPlanningSchema.validate(req.body);
        if(error){
            throw new Error(error.message);
        }
        const  tripInfo: TripInfo =req.body as unknown as TripInfo;
        // const result =await getPlanning(tripInfo);
        // const result=fakeResponse.result;
        const result={
            "itinerary": [
                {
                    "day": 1,
                    "realDay": "2024-01-10",
                    "activities": [
                        {
                            "position": 1,
                            "type": "location",
                            "name": "Hoan Kiem Lake",
                            "description": "A scenic lake in the historical center of Hanoi, known for its peaceful atmosphere and the Ngoc Son Temple.",
                            "startTime": "09:00",
                            "endTime": "11:00"
                        },
                        {
                            "position": 2,
                            "type": "food",
                            "name": "Pho Bo (Beef Noodle Soup)",
                            "description": "A traditional Vietnamese noodle soup consisting of broth, rice noodles, herbs, and beef.",
                            "startTime": "11:30",
                            "endTime": "12:30"
                        },
                        {
                            "position": 4,
                            "type": "location",
                            "name": "Old Quarter",
                            "description": "A bustling area known for its narrow streets, artisan shops, and local eateries.",
                            "startTime": "13:00",
                            "endTime": "16:00"
                        }
                    ]
                },
                {
                    "day": 2,
                    "realDay": "2024-01-11",
                    "activities": [
                        {
                            "position": 3,
                            "type": "location",
                            "name": "Ho Chi Minh Mausoleum",
                            "description": "The final resting place of Vietnam's revolutionary leader, Ho Chi Minh.",
                            "startTime": "09:00",
                            "endTime": "10:30"
                        },
                        {
                            "position": 1,
                            "type": "food",
                            "name": "Cha Ca La Vong",
                            "description": "A Hanoi specialty made of grilled fish with turmeric and dill, served with rice noodles and fresh herbs.",
                            "startTime": "11:00",
                            "endTime": "12:00"
                        },
                        {
                            "position": 5,
                            "type": "location",
                            "name": "One Pillar Pagoda",
                            "description": "A historic Buddhist temple in Hanoi, known for its unique architecture.",
                            "startTime": "13:00",
                            "endTime": "15:00"
                        }
                    ]
                },
                {
                    "day": 3,
                    "realDay": "2024-01-12",
                    "activities": [
                        {
                            "position": 2,
                            "type": "location",
                            "name": "Temple of Literature",
                            "description": "Vietnam's first national university dedicated to Confucius, with beautiful gardens and preserved architecture.",
                            "startTime": "09:00",
                            "endTime": "11:00"
                        },
                        {
                            "position": 3,
                            "type": "food",
                            "name": "Bun Cha",
                            "description": "A Vietnamese dish of grilled pork and noodle, served with a flavorful broth and herbs.",
                            "startTime": "11:30",
                            "endTime": "12:30"
                        },
                        {
                            "position": 7,
                            "type": "location",
                            "name": "Hanoi Opera House",
                            "description": "A stunning building reflecting French colonial architecture, hosting various cultural performances.",
                            "startTime": "13:00",
                            "endTime": "15:00"
                        }
                    ]
                },
                {
                    "day": 4,
                    "realDay": "2024-01-13",
                    "activities": [
                        {
                            "position": 6,
                            "type": "location",
                            "name": "Thang Long Imperial Citadel",
                            "description": "A UNESCO World Heritage Site with significant historical and cultural importance.",
                            "startTime": "09:00",
                            "endTime": "11:00"
                        },
                        {
                            "position": 4,
                            "type": "food",
                            "name": "Banh Cuon",
                            "description": "A popular Vietnamese dish made of steamed rice rolls filled with a mixture of ground pork and mushrooms.",
                            "startTime": "11:30",
                            "endTime": "12:30"
                        },
                        {
                            "position": 8,
                            "type": "location",
                            "name": "Vietnam Museum of Ethnology",
                            "description": "An exhibition center showcasing the diverse cultures of Vietnam's 54 ethnic groups.",
                            "startTime": "13:00",
                            "endTime": "15:30"
                        }
                    ]
                },
                {
                    "day": 5,
                    "realDay": "2024-01-14",
                    "activities": [
                        {
                            "position": 9,
                            "type": "location",
                            "name": "Hoa Lo Prison",
                            "description": "A historical site that served as a prison during the French occupation and the Vietnam War.",
                            "startTime": "09:00",
                            "endTime": "10:30"
                        },
                        {
                            "position": 5,
                            "type": "food",
                            "name": "Banh Mi",
                            "description": "A Vietnamese sandwich featuring a crispy baguette filled with various meats, vegetables, and herbs.",
                            "startTime": "11:00",
                            "endTime": "12:00"
                        },
                        {
                            "position": 10,
                            "type": "location",
                            "name": "West Lake",
                            "description": "The largest freshwater lake in Hanoi offering scenic views and leisure activities.",
                            "startTime": "12:30",
                            "endTime": "15:00"
                        }
                    ]
                },
                {
                    "day": 6,
                    "realDay": "2024-01-15",
                    "activities": [
                        {
                            "position": 8,
                            "type": "food",
                            "name": "Bun Thang",
                            "description": "A traditional dish made of chicken, eggs, pork, and vermicelli noodles in a light broth.",
                            "startTime": "09:00",
                            "endTime": "10:00"
                        },
                        {
                            "position": 10,
                            "type": "food",
                            "name": "Che",
                            "description": "A Vietnamese sweet dessert soup or pudding, rich in flavors and textures.",
                            "startTime": "10:30",
                            "endTime": "11:30"
                        },
                        {
                            "position": 6,
                            "type": "food",
                            "name": "Nem Cua Be",
                            "description": "Crispy fried spring rolls filled with crab meat and other ingredients, served with dipping sauce.",
                            "startTime": "12:00",
                            "endTime": "13:00"
                        }
                    ]
                },
                {
                    "day": 7,
                    "realDay": "2024-01-16",
                    "activities": [
                        {
                            "position": 7,
                            "type": "food",
                            "name": "Xoi xeo",
                            "description": "Sticky rice cooked with turmeric and topped with mung bean paste, crispy shallots, and sometimes fried chicken.",
                            "startTime": "09:00",
                            "endTime": "10:00"
                        },
                        {
                            "position": 6,
                            "type": "food",
                            "name": "Thit Kho Tau",
                            "description": "Vietnamese caramelized and braised pork belly and eggs, served with steamed rice.",
                            "startTime": "10:30",
                            "endTime": "11:30"
                        }
                    ]
                }
            ],
            "totalFee": {
                "flights": 3500,
                "transportation": 300,
                "activities": 500,
                "accommodation": 700,
                "food": 500,
                "miscellaneous": 200
        },
            "foods": [
                {
                    "position": 1,
                    "name": "Phở",
                    "restaurantName": "Phở Gia Truyền Bát Đàn",
                    "description": "Traditional Hanoi beef noodle soup with herbs and spices.",
                    "address": "49 Bát Đàn, Hoàn Kiếm, Hà Nội"
                },
                {
                    "position": 2,
                    "name": "Bún Chả",
                    "restaurantName": "Bún Chả Hàng Mành",
                    "description": "Grilled pork served with rice noodles and herbs, a classic Hanoi dish.",
                    "address": "1 Hàng Mành, Hoàn Kiếm, Hà Nội"
                },
                {
                    "position": 3,
                    "name": "Chả Cá Lã Vọng",
                    "restaurantName": "Chả Cá Lã Vọng",
                    "description": "Grilled fish with turmeric and dill, a iconic Hanoi specialty.",
                    "address": "14 Phố Chả Cá, Hoàn Kiếm, Hà Nội"
                },
                {
                    "position": 4,
                    "name": "Bánh Cuốn",
                    "restaurantName": "Bánh Cuốn Bà Hanh",
                    "description": "Steamed rice rolls filled with minced pork and mushrooms.",
                    "address": "26B Thọ Xương, Hoàn Kiếm, Hà Nội"
                },
                {
                    "position": 5,
                    "name": "Bánh Mì Pâté",
                    "restaurantName": "Bánh Mì 25",
                    "description": "Vietnamese sandwich with pork, pâté, and vegetables.",
                    "address": "25 Hàng Cá, Hoàn Kiếm, Hà Nội"
                },
                {
                    "position": 6,
                    "name": "Cà Phê Trứng",
                    "restaurantName": "Cà Phê Giảng",
                    "description": "Egg coffee, a unique Hanoian beverage with creamy egg foam.",
                    "address": "39 Nguyễn Hữu Huân, Hoàn Kiếm, Hà Nội"
                },
                {
                    "position": 7,
                    "name": "Nem Rán",
                    "restaurantName": "Nem Cua Bể Hương Mai",
                    "description": "Vietnamese spring rolls, crispy and filled with crab meat.",
                    "address": "25 Lãn Ông, Hoàn Kiếm, Hà Nội"
                },
                {
                    "position": 8,
                    "name": "Xôi Xéo",
                    "restaurantName": "Xôi Yến",
                    "description": "Sticky rice with mung beans and fried onions, a popular breakfast option.",
                    "address": "35B Nguyễn Hữu Huân, Hoàn Kiếm, Hà Nội"
                },
                {
                    "position": 9,
                    "name": "Bún Thang",
                    "restaurantName": "Bún Thang Bà Đức",
                    "description": "A delicate vermicelli noodle soup with chicken, mushrooms, and pork.",
                    "address": "48 Cầu Gỗ, Hoàn Kiếm, Hà Nội"
                },
                {
                    "position": 10,
                    "name": "Bánh Tôm Hồ Tây",
                    "restaurantName": "Nhà Hàng Hồ Tây",
                    "description": "Crispy shrimp cakes, a specialty from the West Lake area.",
                    "address": "Lạc Long Quân, Tây Hồ, Hà Nội"
                }
            ],
            "locations": [
                {
                    "position": 1,
                    "name": "Hoàn Kiếm Lake",
                    "description": "A scenic lake located in the historical center of Hanoi, famous for the Ngoc Son Temple and the Turtle Tower. It is a great spot for walking and enjoying the atmosphere of the city.",
                    "address": "Hoàn Kiếm, Hanoi, Vietnam"
                },
                {
                    "position": 2,
                    "name": "Ho Chi Minh Mausoleum",
                    "description": "The final resting place of Vietnamese revolutionary leader Ho Chi Minh, this mausoleum is a large monumental structure located in central Hanoi.",
                    "address": "2 Hùng Vương, Điện Biên, Ba Đình, Hà Nội, Vietnam"
                },
                {
                    "position": 3,
                    "name": "Temple of Literature",
                    "description": "Built in 1070, this temple is dedicated to Confucius and is the site of Vietnam's first university. It's a well-preserved example of traditional Vietnamese architecture.",
                    "address": "58 Quốc Tử Giám, Văn Miếu, Đống Đa, Hà Nội, Vietnam"
                },
                {
                    "position": 4,
                    "name": "Hanoi Old Quarter",
                    "description": "A bustling area of narrow streets and alleys each named after the trade that used to take place there. It's a great place to discover Vietnamese culture and shop for local goods.",
                    "address": "Hoàn Kiếm, Hanoi, Vietnam"
                },
                {
                    "position": 5,
                    "name": "Vietnam Museum of Ethnology",
                    "description": "A comprehensive museum showcasing the diverse ethnic groups of Vietnam with a large collection of artifacts, traditional clothing, and cultural displays.",
                    "address": "Nguyễn Văn Huyên, Quan Hoa, Cầu Giấy, Hà Nội, Vietnam"
                },
                {
                    "position": 6,
                    "name": "Thang Long Imperial Citadel",
                    "description": "A UNESCO World Heritage Site, the citadel has been a political center of Vietnam for more than a thousand years. It offers insight into the history and culture of the region.",
                    "address": "19C Hoàng Diệu, Điện Biên, Ba Đình, Hà Nội, Vietnam"
                },
                {
                    "position": 7,
                    "name": "Hoa Lo Prison Museum",
                    "description": "Originally used by the French to imprison Vietnamese revolutionaries, this museum offers a historical perspective of struggles during the war era.",
                    "address": "1 Hỏa Lò, Trần Hưng Đạo, Hoàn Kiếm, Hà Nội, Vietnam"
                },
                {
                    "position": 8,
                    "name": "St. Joseph's Cathedral",
                    "description": "A neo-Gothic church built in 1886, reminiscent of Notre Dame de Paris. It remains a functioning cathedral and is a landmark in Hanoi.",
                    "address": "40 Nhà Chung, Hàng Trống, Hoàn Kiếm, Hà Nội, Vietnam"
                },
                {
                    "position": 9,
                    "name": "Long Bien Bridge",
                    "description": "A historic cantilever bridge across the Red River, designed by Gustave Eiffel. It's an iconic symbol of Hanoi with beautiful views and a rich history.",
                    "address": "Long Biên, Hanoi, Vietnam"
                },
                {
                    "position": 10,
                    "name": "West Lake (Hồ Tây)",
                    "description": "The largest freshwater lake in Hanoi, offering a relaxing escape with numerous gardens, temples, hotels, and cafes along its banks.",
                    "address": "Quảng An, Tây Hồ, Hanoi, Vietnam"
                }
            ],
            "accommodation": [
                {
                    "name": "Hanoi Boutique Hotel",
                    "address": "7 Hang Dau, Hoan Kiem, Hanoi, Vietnam",
                    "description": "A charming hotel located in the heart of Hanoi's Old Quarter. Offers modern amenities and complimentary breakfast."
                },
                {
                    "name": "Hanoi Holiday Diamond Hotel",
                    "address": "5 Nguyen Sieu Street, Hoan Kiem District, Hanoi, Vietnam",
                    "description": "Budget-friendly option with excellent service and proximity to major attractions like Hoan Kiem Lake."
                },
                {
                    "name": "Hanoi Old Quarter Hotel",
                    "address": "2 Nguyen Huu Huan, Hoan Kiem, Hanoi, Vietnam",
                    "description": "Ideal location in the Old Quarter with comfortable rooms and traditional Vietnamese decor."
                },
                {
                    "name": "La Siesta Hotel Trendy",
                    "address": "12 Nguyen Quang Bich, Hoan Kiem, Hanoi, Vietnam",
                    "description": "A boutique hotel featuring chic design and a tranquil, stylish setting."
                },
                {
                    "name": "Oriental Central Hotel",
                    "address": "39 Hang Bac Street, Hoan Kiem District, Hanoi, Vietnam",
                    "description": "Located at the center of the bustling city, offering amenities like a fitness center and a soothing spa."
                },
                {
                    "name": "Serene Boutique Hotel & Spa",
                    "address": "16-18 Bat Su, Hoan Kiem, Hanoi, Vietnam",
                    "description": "Known for its serene environment and attentive staff, perfect for relaxation after a day exploring the city."
                },
                {
                    "name": "Hanoi Graceful Hotel",
                    "address": "21 Hang Phen, Hoan Kiem, Hanoi, Vietnam",
                    "description": "Provides comfort with a delightful oriental touch in room decor and services."
                },
                {
                    "name": "The Hanoian Hotel",
                    "address": "42A Hang Cot, Hoan Kiem District, Hanoi, Vietnam",
                    "description": "Offers a luxurious stay with modern facilities and a convenient location near Old Quarter attractions."
                },
                {
                    "name": "Hanoi Pearl Hotel",
                    "address": "No 6, Bao Khanh Lane, Hoan Kiem, Hanoi, Vietnam",
                    "description": "Chic hotel with a variety of services including a rooftop bar offering views of Hoan Kiem Lake."
                },
                {
                    "name": "Little Hanoi Deluxe Hotel",
                    "address": "71 Hang Luoc Street, Hoan Kiem District, Hanoi, Vietnam",
                    "description": "Affordable, family-friendly option with free Wi-Fi and a simple, cozy ambiance."
                }
            ],
            "tips": [
                {
                    "name": "Learn Basic Vietnamese",
                    "description": "Familiarity with key Vietnamese phrases can significantly enhance your communication and travel experience."
                },
                {
                    "name": "Download Offline Maps",
                    "description": "Save offline maps of Hanoi to help navigate the city without relying on an internet connection."
                },
                {
                    "name": "Pack Light and Efficiently",
                    "description": "Bring versatile clothing and leave room in your suitcase for souvenirs and local goods."
                }
            ],
            "weather": {
                "name": "mildly cool and dry",
                "description": "Hanoi experiences its cooler, drier season during January, with less rainfall than other times of the year.",
                "temperature": 18
            },
            "topExperience": {
                "forTheBody": "Try a traditional Vietnamese massage at a local spa.",
                "forTheMind": "Visit the historic Temple of Literature and explore its ancient grounds.",
                "forTheSoul": "Experience a quiet early morning walk around Hoan Kiem Lake."
            },
            "wardrobe": {
                "clotheRecommendations": "Comfortable layers such as long-sleeve shirts, pants, and a light jacket, considering Hanoi’s mild and sometimes chilly weather.",
                "accessoriesRecommendations": "Comfortable walking shoes, a small backpack for day trips, and a hat for sun protection."
            },
            "img": {
                "location": [
                    [
                        "https://upload.wikimedia.org/wikipedia/commons/7/79/Thap_Rua.jpg",
                        "https://lilystravelagency.com/wp-content/uploads/2024/09/hoan-kiem-lake1.png",
                        "https://statics.vinpearl.com/Hoan-Kiem-Lake-6_1662341107.jpg",
                        "https://media.hanoitimes.vn/2022/11/1/Hanoi%20photogra[hy%20and%20life.jpg",
                        "https://vietnamtour.in/wp-content/uploads/Hoan-Kiem-lake-1-1-1120x800.jpg"
                    ],
                    [
                        "https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/27/65/85.jpg",
                        "https://www.travelvietnam.com/images/temple-of-literature-hanoi-entrance_6092b.jpg",
                        "https://backend.threeland.com/storage/images/files/image-20230601213455-3%20(1).png",
                        "https://izitour.com/media/blog/temple-literature-hanoi-vietnam.webp",
                        "https://images.squarespace-cdn.com/content/v1/56c13cc00442627a08632989/1599003762546-5HELKRFFY01BR5D6AU73/templeofliteraturebanner.jpg?format=1500w"
                    ],
                    [
                        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/32/93/64/mausoleum.jpg?w=1200&h=-1&s=1",
                        "https://media.cnn.com/api/v1/images/stellar/prod/191007104451-05-ho-chi-minh-mausoleum.jpg?q=w_1920,h_1080,x_0,y_0,c_fill",
                        "https://backend.threeland.com/storage/images/files/image-20230604143713-3.png",
                        "https://localvietnam.com/wp-content/uploads/2021/04/ho-chi-minh-mausoleum-2.jpg",
                        "https://www.indochina.tours/wp-content/uploads/2016/12/ho-chi-minh-mausoleum-history.jpg"
                    ],
                    [
                        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/e5/7a/42/caption.jpg?w=1200&h=-1&s=1",
                        "https://vietnam.travel/sites/default/files/inline-images/visit%20old%20quarter%20Hanoi-12.jpg",
                        "https://hanoioldquarter.info/wp-content/uploads/2018/02/stock-photo-155026169-741x486.jpg",
                        "https://upload.wikimedia.org/wikipedia/commons/d/da/Old_Quarter_Street_Scene_-_Hanoi_-_Vietnam_%2848256301206%29.jpg",
                        "https://a.travel-assets.com/findyours-php/viewfinder/images/res70/35000/35909-Old-Quarter.jpg?impolicy=fcrop&w=450&h=280&q=medium"
                    ],
                    [
                        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/61/62/de/chua-m-t-c-t-one-pillar.jpg?w=1200&h=-1&s=1",
                        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/4f/a7/36/vista-d-insieme.jpg?w=900&h=500&s=1",
                        "https://www.indochina.tours/wp-content/uploads/2016/12/one-pillar-pagoda-travel-guide.jpg",
                        "https://www.indochina.tours/wp-content/uploads/2016/12/one-pillar-pagoda-photo.jpg",
                        "https://www.indochina.tours/wp-content/uploads/2016/12/one-pillar-pagoda-history.jpg"
                    ],
                    [
                        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/c5/b7/6b/the-front-of-doan-mon.jpg?w=1200&h=-1&s=1",
                        "https://statics.vinpearl.com/Imperial-Citadel-of-Thang-Long-02_1694340388.jpg",
                        "https://www.indochina.tours/wp-content/uploads/2016/12/imperial-citadel-of-thang-long-reviews.jpg",
                        "https://www.vietnamdrive.com/wp-content/uploads/2024/11/gate-of-imperial-citadel-of-thang-long.jpg",
                        "https://www.indochina.tours/wp-content/uploads/2016/12/imperial-citadel-of-thang-long-photos.jpg"
                    ],
                    [
                        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/70/b7/33/hanoi-opera-house.jpg?w=1200&h=-1&s=1",
                        "https://lilystravelagency.com/wp-content/uploads/2024/09/hanoi-opera-house1.png",
                        "https://silkpathhotel.com/wp-content/uploads/2023/12/silkpath-hanoi-attractions-hanoi-opera-house-night.jpg",
                        "https://silkpathhotel.com/wp-content/uploads/2023/12/silkpath-hanoi-things-to-do-hanoi_opera_house.jpg",
                        "https://a.travel-assets.com/findyours-php/viewfinder/images/res70/95000/95347-Hanoi-Opera-House.jpg"
                    ],
                    [
                        "https://lp-cms-production.imgix.net/2019-06/ae67624a79f02b5ac0736f2917869afa89b857ff8621413ad1afa77910c25fec.jpg?w=1920&h=640&fit=crop&crop=faces%2Cedges&auto=format&q=75",
                        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/df/60/bc/p-20151223-095557-2-largejpg.jpg?w=900&h=-1&s=1",
                        "https://d1bb1mccaihlpl.cloudfront.net/variants/k4ck9ofzcuwbmas88t9ign7e9qzg/5495488087431af32265aaaaa1b8a274541d70555aa4d7c01d8d0fed27e7c152",
                        "https://c8.alamy.com/comp/C26440/entrance-to-the-vietnam-museum-of-ethnology-nguyen-van-huyen-st-cau-C26440.jpg",
                        "https://vietnamtravel.com/images/2020/06/Vietnam-Museum-of-Ethnology-7.jpg"
                    ],
                    [
                        "http://duongsrestaurant.com/wp-content/uploads/2024/02/Hoa-Lo-Prison-Museum.jpg",
                        "https://images.vietnamtourism.gov.vn/en/images/2022/hoalo.jpg",
                        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/2c/0d/94/photo7jpg.jpg?w=1200&h=-1&s=1",
                        "https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/2c/f1/44.jpg",
                        "https://vietnamtour.in/wp-content/uploads/hoa-lo-prison-1.jpg"
                    ],
                    [
                        "https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/39/7c/db.jpg",
                        "https://www.anywhere.com/img-a/attraction/ho-tay-west-lake-lake-vietnam/West-Lake-WebRes1-jpg",
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/H%E1%BB%93_T%C3%A2y_ho%C3%A0ng_h%C3%B4n_-_NKS.jpg/1200px-H%E1%BB%93_T%C3%A2y_ho%C3%A0ng_h%C3%B4n_-_NKS.jpg",
                        "https://localvietnam.com/wp-content/uploads/2021/06/tran-quoc-pagoda-1.jpg",
                        "https://a.travel-assets.com/findyours-php/viewfinder/images/res70/95000/95316-Tay-Ho-West-Lake.jpg"
                    ]
                ],
                "food": [
                    [
                        "https://balancewithjess.com/wp-content/uploads/2020/09/Cha-Ca-Feat.jpg",
                        "http://static1.squarespace.com/static/52cb511fe4b03e12f2fe4e08/52cb84cce4b03e12f2fe8642/55a489f6e4b0c900390a1552/1436850948164/?format=1500w",
                        "https://poshjournal.com/wp-content/uploads/2022/10/cha-ca-vietnamese-turmeric-fish-dill-6.jpg",
                        "https://www.thefooddictator.com/wp-content/uploads/2022/05/chaca.jpg",
                        "https://i0.wp.com/vickypham.com/wp-content/uploads/2023/08/8d1bc-2023_07_31eosm506317.jpg?resize=3575%2C3575"
                    ],
                    [
                        "https://www.oliveandmango.com/images/uploads/2021_12_26_beef_pho_noodle_soup_recipe_2.jpg",
                        "https://img.taste.com.au/XG13QkMs/taste/2016/11/beef-and-noodle-soup-pho-bo-33067-1.jpeg",
                        "https://vickypham.com/wp-content/uploads/2024/08/48f43-2023_06_09eosm506018.jpg",
                        "https://img.sndimg.com/food/image/upload/f_auto,c_thumb,q_55,w_744,ar_5:4/v1/img/recipes/28/83/81/sGCq11aGT9pM1XwQx2pI-pho.jpg",
                        "https://howdaily.com/wp-content/uploads/2017/04/vietnamese-pho-bo.jpg"
                    ],
                    [
                        "https://www.recipetineats.com/tachyon/2019/01/Vietnamese-Pork-Meatballs_6.jpg",
                        "https://www.seriouseats.com/thmb/atsVhLwxdCWyX-QDuhOLhR0Kx4s=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/20231204-SEA-VyTran-BunChaHanoi-18-e37d96a89a0f43d097e02311686290f2.jpg",
                        "http://www.ricenflour.com/wp-content/uploads/2016/09/bun-cha-recipe-banner-770x440.jpg",
                        "https://www.cooking-therapy.com/wp-content/uploads/2022/05/Bun-Cha-Gio-5.jpg",
                        "https://www.budgetbytes.com/wp-content/uploads/2022/07/Bun-Cha-side-500x500.jpg"
                    ],
                    [
                        "https://images.food52.com/kULrrL84JHhLTr8ZEFnUgNO01Ts=/1200x900/65d94dd2-1509-4e86-9f82-02bc2190de45--Vegan-Banh-Cuon-F52Website.jpg",
                        "https://cdn.shortpixel.ai/spai2/q_glossy+ret_img+to_auto/www.hungryhuy.com/wp-content/uploads/banh-cuon-w-herbs-sauce-500x500.jpg",
                        "https://ironchefshellie.com/wp-content/uploads/2024/04/Banh-Cuon-6493.jpg",
                        "https://www.wokandkin.com/wp-content/uploads/2021/05/Banh-Cuon-saved-for-web.png",
                        "https://assets.epicurious.com/photos/647a294bffb3de465867f5fb/4:3/w_2887,h_2165,c_limit/Banh%20Cuon-RECIPE.jpg"
                    ],
                    [
                        "https://www.allrecipes.com/thmb/XRO7XOwqZflluq97rtvzEftrNa0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-187342-Banh-Mi-4x3-22bee17c1dfe4817adefce0ff4c218d3.jpg",
                        "https://images.getrecipekit.com/20230518150440-andy-20cooks-20-20bahn-20mi.jpg?aspect_ratio=16:9&quality=90&",
                        "https://hips.hearstapps.com/hmg-prod/images/banh-mi-with-grilled-pork1-1663331872.jpg?crop=1xw:0.82801766437684xh;center,top&resize=1200:*",
                        "https://cdn.loveandlemons.com/wp-content/uploads/2019/02/banh-mi.jpg",
                        "https://www.allrecipes.com/thmb/HTJHVC_LYKmXaMF54dhe2gZQkNI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/roasted-pork-banh-mi-vietnamese-sandwitch-ddmfs-3X4-0332-cfb4d2e149e7476ab2a2b4030c543f1b.jpg"
                    ],
                    [
                        "https://helenrecipes.com/wp-content/uploads/2021/01/NemCuaBe-1200x675.jpg",
                        "https://netspace.edu.vn/app_assets/images/2020/03/26/cach-lam-nem-cua-be-thom-ngon-gion-rum-244958-800.jpg",
                        "https://i-giadinh.vnecdn.net/2022/11/19/Thanh-pham-1-1-8326-1668826338.jpg",
                        "https://www.vietnamonline.com/media/uploads/froala_editor/images/VNO_NEM2_dd6kwzi.jpg",
                        "https://cdn.tgdd.vn/2022/01/CookDish/cach-lam-bun-nem-cua-be-thom-gion-vang-uom-kho-cuong-cuc-don-avt-1200x676.jpg"
                    ],
                    [
                        "https://delightfulplate.com/wp-content/uploads/2019/09/Vietnamese-Mung-Bean-Sticky-Rice-Xoi-Xeo-Hanoi.jpg",
                        "https://delightfulplate.com/wp-content/uploads/2019/09/Xoi-Xeo-Hanoi-Vietnamese-Sticky-Rice-with-Mung-Bean.jpg",
                        "https://delightfulplate.com/wp-content/uploads/2019/09/Vietnamese-Sticky-Rice-with-Hand-Cut-Mung-Bean-Xoi-Xeo.jpg",
                        "https://www.vietnamonline.com/media/uploads/froala_editor/images/VNO_xoixeo.jpg",
                        "https://veggieanh.com/wp-content/uploads/2024/02/Xoi-Xeo-Sticky-Rice-Mung-Bean-Paste-1.jpg"
                    ],
                    [
                        "https://www.cooking-therapy.com/wp-content/uploads/2018/06/Bun-Thang-7.jpg",
                        "https://delightfulplate.com/wp-content/uploads/2020/05/Bun-thang-square.jpg",
                        "https://i0.wp.com/mmbonappetit.com/wp-content/uploads/2022/02/IMG_7109-1-scaled.jpg?resize=500%2C500&ssl=1",
                        "https://i0.wp.com/vickypham.com/wp-content/uploads/2024/10/bun-thang-hanoi-chicken-noodle-soup-5-watermark.jpg?fit=3167%2C3167&ssl=1",
                        "https://www.cooking-therapy.com/wp-content/uploads/2023/11/Bun-Thang-2-683x1024.jpg"
                    ],
                    [
                        "https://delightfulplate.com/wp-content/uploads/2020/04/Vietnamese-Caramelized-Pork-Belly-Thit-Kho-Tau.jpg",
                        "https://i.ytimg.com/vi/Q5V0uEkdTPg/maxresdefault.jpg",
                        "https://i0.wp.com/mmbonappetit.com/wp-content/uploads/2020/12/IMG_8476-2-scaled.jpg?fit=2560%2C1920&ssl=1",
                        "https://i.ytimg.com/vi/QTWVqKeYhJs/maxresdefault.jpg",
                        "https://takestwoeggs.com/wp-content/uploads/2023/01/Thit-Kho-Tau-Vietnamese-Braised-Pork-Belly-TakesTwoeggs-Final-Photography-sq.jpg"
                    ],
                    [
                        "https://cdn.britannica.com/44/11344-050-9456729E/Che-Guevara.jpg",
                        "https://upload.wikimedia.org/wikipedia/commons/8/80/Che_Guevara_-_Guerrillero_Heroico_by_Alberto_Korda.jpg",
                        "https://s3.amazonaws.com/criterion-production/films/4c9d05c3a4e297288956d667b30332c7/hCINFPsLgP4ggTVxwTci7CxtXIy8Y8_large.jpg",
                        "https://www.pbs.org/wgbh/americanexperience/media/canonical_images/feature/Che_Guevara_canonical.jpg",
                        "https://cdn.europosters.eu/image/1300/posters/che-guevara-red-i11214.jpg"
                    ]
                ],
                "accommodation": [
                    [
                        "https://q-xx.bstatic.com/xdata/images/hotel/max500/496835315.jpg?k=3050808629698fdc9e1e92c9f93acf505831bdfe32caf5cbd9b1c3af153051b0&o=",
                        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/496510145.jpg?k=236763b18244c0257c3dc4f4d09c7b97e49fd48bacc845db9320bbf8d04fb6c6&o=&hp=1",
                        "https://pix10.agoda.net/hotelImages/230721/-1/e2d7a50437f86906daa5593addbd7f45.jpg?ce=0&s=414x232",
                        "https://waybird.imgix.net/lodge_images/images/000/141/434/original/1.jpg?w=1400&h=960",
                        "https://pix10.agoda.net/hotelImages/230721/-1/e45bccb8fcd97e432434c2c7cd492dcc.jpg?ce=0&s=414x232"
                    ],
                    [
                        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/502036064.jpg?k=c80f0cdf963b578cd9961bb4586f7974749e711e05abddef48c616c6e0613e20&o=&hp=1",
                        "http://orientalsuiteshotel.com/images/banner.jpg",
                        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/f2/6f/2c/entrance--v11778544.jpg?w=700&h=-1&s=1",
                        "https://ak-d.tripcdn.com/images/1mc5812000cgpxgh50CB2_R_960_660_R5_D.jpg",
                        "https://cdn2.vietnambooking.com/wp-content/uploads/hotel_pro/hotel_343896/402bf7f6f6df57682ce5dd42e79c7bf8.jpg"
                    ],
                    [
                        "https://pix10.agoda.net/hotelImages/686315/-1/b77746dff77065466a2796ccf447029d.jpg?ca=15&ce=1&s=414x232",
                        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/375098597.jpg?k=0611751b5b6752811d73f5761047dd2668dd8eb0b08217e0160fad71110a5f6e&o=&hp=1",
                        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/243260075.jpg?k=7f57f482747ff4164819b29a4251380044b802b35351674a72baaeafd0af04e9&o=&hp=1",
                        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/236510138.jpg?k=6c3a69e3650392d06c93345c037d885f8b1efcaaa79509d8fd3bd728059cfcea&o=&hp=1",
                        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/375098603.jpg?k=7210dac0dda595d7da0b7a4ca53edbbd2f6ea15748209ef77a7d796b2b56d94a&o=&hp=1"
                    ],
                    [
                        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/6a/b0/11/apricot-hotel.jpg?w=700&h=-1&s=1",
                        "https://apricothotels.com/wp-content/uploads/2016/08/Hotel-lobby-s.jpg",
                        "https://hotelmedia.s3.amazonaws.com/720/480/e43db1eaecaf92eba84c1f6b1d26609b8b66c90a",
                        "https://cf.bstatic.com/xdata/images/hotel/max200/56009974.jpg?k=e8defed90d76c647eef581cb703c3ec439a82023ad61e9278887a61a13a5e5d2&o=&hp=1",
                        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/26/b9/25/apricot-hotel.jpg?w=700&h=-1&s=1"
                    ],
                    [
                        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/b0/f1/98/sofitel-legend-metropole.jpg?w=700&h=-1&s=1",
                        "https://upload.wikimedia.org/wikipedia/commons/a/a0/Sofitel_Metropole%2C_Ng%C3%B4_Quy%E1%BB%81n_-_2022-09-02_01.jpg",
                        "https://www.sofitel-legend-metropole-hanoi.com/wp-content/uploads/sites/95/2022/06/DSC00934-scaled.jpg",
                        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/01/fb/54/c7/swimming-pool.jpg?w=700&h=-1&s=1",
                        "https://www.sofitel-legend-metropole-hanoi.com/wp-content/uploads/sites/95/2022/07/DSC00503-scaled.jpg"
                    ],
                    [
                        "https://images.trvl-media.com/lodging/6000000/5130000/5128700/5128657/430db852.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill",
                        "https://images.trvl-media.com/lodging/6000000/5130000/5128700/5128657/86346262.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill",
                        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/76/8f/4f/street--v17858023.jpg?w=700&h=-1&s=1",
                        "https://ik.imagekit.io/tvlk/apr-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/20046947-93e771cd784ba47da4ffefa12f862ced.png?tr=q-80,c-at_max,w-740,h-500&_src=imagekit",
                        "https://image.vietgoing.com/hotel/01/39/large/vietgoing_vxj2203098985.webp"
                    ],
                    [
                        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/451874949.jpg?k=ad31cc4b6050ce6aa6bba28b763048a2e81ce09421a3a4b1fd2b80ae6acb23f1&o=&hp=1",
                        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/1f/84/ac/kha-ch-sa-n-the-chi-boutique.jpg?w=700&h=-1&s=1",
                        "https://pix10.agoda.net/hotelImages/129/1295184/1295184_16081921540045641790.jpg?ca=6&ce=1&s=414x232&ar=16x9",
                        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0c/b3/8c/ae/getlstd-property-photo.jpg?w=700&h=-1&s=1",
                        "https://q-xx.bstatic.com/xdata/images/hotel/max500/77160324.jpg?k=40be0e00e497175d49009347c790c55faa2b4aade04433599bb243c5a61fe4f7&o="
                    ],
                    [
                        "https://d2e5ushqwiltxm.cloudfront.net/wp-content/uploads/sites/55/2016/10/24081155/Hotel-de-lopera-Hotel-Exterior-1.jpg",
                        "https://pix10.agoda.net/hotelImages/255/255653/255653_17051010150052877079.jpg?ca=6&ce=1&s=414x232&ar=16x9",
                        "https://www.kayak.com/rimg/himg/37/cc/16/leonardo-143078838-7832_sw_04_p_3000x2250_O-674761.jpg?width=1366&height=768&crop=true",
                        "https://d2e5ushqwiltxm.cloudfront.net/wp-content/uploads/sites/55/2016/10/24073033/Hotel-de-lopera-Entrance1.jpg",
                        "https://www.ticati.com/img/hotel/2858889s.jpg"
                    ],
                    [
                        "https://waybird.imgix.net/lodge_images/images/000/084/388/original/HNE5107-Crop-150090.jpg?w=1400&h=960",
                        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/526531595.jpg?k=aee83c1b758a802159da60fd1dc7601f7fe03d5b9966f7d1f1f9d9a2849d35c0&o=&hp=1",
                        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/375098603.jpg?k=7210dac0dda595d7da0b7a4ca53edbbd2f6ea15748209ef77a7d796b2b56d94a&o=&hp=1",
                        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/59/4c/d3/hanoi-la-siesta-hotel.jpg?w=700&h=-1&s=1",
                        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/82/9b/c4/hanoi-la-siesta-hotel.jpg?w=700&h=-1&s=1"
                    ],
                    [
                        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/47/be/5d/serene-boutique-hotel.jpg?w=700&h=-1&s=1",
                        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/ef/ce/b8/photo0jpg.jpg?w=1100&h=-1&s=1",
                        "https://pix10.agoda.net/property/37021600/0/84796d02df94c0f895067566fa923ac0.jpg?ce=0&s=414x232",
                        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/47/be/9f/serene-boutique-hotel.jpg?w=700&h=-1&s=1",
                        "https://pix10.agoda.net/property/2238842/0/c18c6fa8e68a36eb721fe8790ebe72a8.jpeg?ce=0&s=414x232"
                    ]
                ]
            }
        }
        
        res.json({
            status: 200,
            result: result,
        })  
    }catch(err: any){
        console.log(err);
        res.status(400).json({
            message: err.message || "Hiện tại bạn không thể xem trang, vui lòng thử lại"
        })

    }
}

export const getPage =async(req: Request,res: Response)=>{
    try{
        const id=req.params.id;
        const result=await getItinerary(id);
        res.json({
            status: 200,
            result: result
        })
        
    }catch(err){
        res.status(400).json({
            message: "Hiện tại bạn không thể xem trang, vui lòng thử lại"
        })

    }

}

export const createPage=async(req:Request,res:Response)=>{ 
    try{
        const tripData=req.body;
        const result=await saveItinerary(tripData);
        res.json({
            status: 200,
            result: result._id
        })
    }catch(err){
        res.status(400).json({
            message: "Hiện tại bạn không thể chia sẻ trang, vui lòng thử lại"
        })
    }

}


const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
