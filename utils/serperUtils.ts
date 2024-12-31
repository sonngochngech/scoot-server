import axios from "axios";
import { ImageReq } from "../config/serper";

export  async function getImage(items: string[],number: number): Promise<string[][]>{
    try{
        const imgUrlList = await Promise.all(items.map(async (item: any, index: string | number) => {
            const res = await axios(ImageReq(`${item}`));
            return res.data.images.map((element: { imageUrl: string }) => element.imageUrl).slice(0, number);
        }));
        if(imgUrlList === null ) throw new Error("image not found");
        return imgUrlList;
    }catch(e){
        console.log(e);
        return [];
    }
}

export async function getAddress(name: string): Promise<any> {

}

