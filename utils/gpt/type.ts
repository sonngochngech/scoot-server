import { posix } from "path";
import { z } from "zod";

const itineraryActivity = z.object({
    position: z.number(),
    type: z.string(),
    name: z.string(),
    description: z.string(),
    startTime: z.string(),
    endTime: z.string()
});

const city= z.object({
    name: z.string(),
    reason: z.array(z.object({
        criteria: z.string(),
        description: z.string()
    })),
});

export const CityResponse = z.object({
    comment: z.string(),
    introduction: z.string(),
    desiredCity: city,
    suggestedCity: z.array(city)
});
export const AcommodationItemResponse = z.array(z.object({
    name: z.string(),
    address: z.string(),
    description: z.string(),
}));
export const LocationItemResponse = z.array(z.object({
    position: z.number(),
    name: z.string(),
    description: z.string(),
    address: z.string()
}));
export const FoodItemResponse = z.array(z.object({
    position: z.number(),
    name: z.string(),
    restaurantName: z.string(),
    description: z.string(),
    address: z.string(),
}));

export const WeatherResponse =z.object({
    name: z.string(),
    description: z.string(),
    temperature: z.number()
});
export const TipResponse=z.array(z.object({
    name: z.string(),
    description: z.string()
}));
export const TotalFeeResponse=z.object({
    flights: z.number(),
    transportation: z.number(),
    activities: z.number(),
    accommodation: z.number(),
    food: z.number(),
    acommodation: z.number(),
    miscellaneous: z.number()
});
export const topExperienceResponse=z.object({
    forTheBody: z.string(),
    forTheMind: z.string(),
    forTheSoul: z.string(),
});
export const WardrobeResponse=z.object({
    clotheRecommendations: z.string(),
    accessoriesRecommendations: z.string(),
});

export const TipWeatherFeeResponse=z.object({
    other:z.object({
        tips: TipResponse,
        weather: WeatherResponse,
        totalFee: TotalFeeResponse,
        topExpereince: topExperienceResponse,
        wardrobe: WardrobeResponse
    })
});
export const FlightResponse=z.object({
    fly: z.object({
        canFly: z.boolean(),
    price: z.number()
    })
});

export const ItineraryResponse = z.object({
    itinerary: z.array(
        z.object({
            day: z.number(),
            realDay: z.string(),
            activities: z.array(itineraryActivity)
        })
    ),
    totalFee: TotalFeeResponse,
    foods: FoodItemResponse,
    locations: LocationItemResponse,
    accommodation: AcommodationItemResponse,
    tips: TipResponse,
    weather: WeatherResponse
});
export const FormatedItineraryResponse=z.object({
    itinerary: z.array(
        z.object({
            day: z.number(),
            realDay: z.string(),
            activities: z.array(itineraryActivity)
        })
    ),
})





export const MinPriceResponse=z.object({
    canGo: z.boolean(),
    price: z.number()
});


// option 2 

export const FoodResponse=z.object({
    foods: FoodItemResponse
});
export const LocationResponse=z.object({
    locations: LocationItemResponse
});
export const AccommodationResponse=z.object({
    accommodations: AcommodationItemResponse
});