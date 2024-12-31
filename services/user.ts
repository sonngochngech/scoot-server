import { connectDB } from "../config/mongodb";
import { LuckAnalization } from "../models/schemas/luckAnalization";
import { User } from "../models/schemas/user";


export const saveUserLuckyProfile=async(phoneNumber: string,content:string)=>{
    try{
        const user =new User({
            phoneNumber,
            content
        })
        await user.save();
        return user;
    }catch(error){
        console.log(error);
        throw new Error(`Error saving user:`);
    }
}
export const saveUserAnalization= async(phoneNumber: string,content:string)=>{
    try{
        const userAlization=new LuckAnalization({
            phoneNumber,
            content
        })
        await userAlization.save();

    }catch(error){
        console.log(error);
        throw new Error(`Error saving user:`);
    }
}
