import Joi from "joi";

const fengShuiInfoSchema = Joi.object({
    userInfo: Joi.object({
        name: Joi.string().required().messages({
            "string.empty": "You have not entered the name",
            "any.required": "You have not entered the name"
        }),
        birthdate: Joi.string().required().messages({
            "string.empty": "You have not entered the birth date",
            "any.required": "You have not entered the birth date"
        }),
        sex: Joi.number().required().messages({
            "number.empty": "You have not selected the gender",
            "any.required": "You have not selected the gender"
        }),
        timeOfBirth: Joi.string().messages({
            "string.empty": "You have not entered the time of birth",
            "any.required": "You have not entered the time of birth"
        }),
        placeOfBirth: Joi.string().required().messages({
            "string.empty": "You have not entered the place of birth",
            "any.required": "You have not entered the place of birth"
        }),
        phone: Joi.string().required().messages({
            "string.empty": "You have not entered the phone number",
            "any.required": "You have not entered the phone number"
        }),
    }).required(),
    departureCity: Joi.string().required().messages({
        "string.empty": "You have not selected the departure city",
        "any.required": "You have not selected the departure city"
    }),
    arrivalCity: Joi.string().required().messages({
        "string.empty": "You have not selected the destination city",
        "any.required": "You have not selected the destination city"
    })
});


const tripPlanningSchema = Joi.object({
    duration: Joi.number().required().messages({
        "number.empty": "You have not entered the number of days",
        "any.required": "You have not entered the number of days"
    }),
    budget: Joi.number().required().messages({
        "number.empty": "You have not entered the budget",
        "any.required": "You have not entered the budget"
    }),
    arrival: Joi.object({
        code: Joi.string().required().messages({
            "string.empty": "You have not selected the destination city",
            "any.required": "You have not selected the destination city"
        }),
        name: Joi.string().required().messages({
            "string.empty": "You have not selected the destination city",
            "any.required": "You have not selected the destination city"
        })
    }).required().messages({
        "object.required": "You have not selected the destination city"
    }),
    departure: Joi.object({
        code: Joi.string().required(),
        name: Joi.string().required()
    }).required().messages({
        "object.required": "You have not selected the departure city"
    }),
    travelerQuantities: Joi.number().required().messages({
        "number.empty": "You have not entered the number of travelers",
        "any.required": "You have not entered the number of travelers"
    }),
    startDate: Joi.string().required().messages({
        "string.empty": "You have not entered the start date",
        "any.required": "You have not entered the start date"
    }),
    endDate: Joi.string().required().messages({
        "string.empty": "You have not entered the end date",
        "any.required": "You have not entered the end date"
    })  
});


export { fengShuiInfoSchema, tripPlanningSchema }