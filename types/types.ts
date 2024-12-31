

export interface UserLuckyProfile {
    can_chi: {
        nam: string;
        thang: string;
        ngay: string;
        gio: string;
    }
    menh: string;
    menh_chu: string;
    dung_hy_than: string[];
    gia_tri: {
        moc: string;
        hoa: string;
        tho: string;
        kim: string;
        thuy: string;
        an_tinh: string;
        ty_kiep: string;
        tai_tinh: string;
        thuc_thuong: string;
        quan_sat: string;
        mc: string;
    }
}
export interface CityType{
    code: string|null;
    name: string;
}

export interface TravelLucky{
    departureCity: CityType;
    arrivalCity: CityType;
    hy_than: string;
    suggestedCities: CityType[];
}

export interface GPTConfig{
    tempature: number;
}

export interface LuckyUserInfo{
    name: string;
    birthdate: string;
    sex: number;
    phone: string|null|undefined;
    timeOfBirth: string|undefined|null;
    placeOfBirth: string;
}
export interface LuckyTravelInfo{
    userInfo: LuckyUserInfo;
    departureCity: string;
    arrivalCity: string;
}

export interface LuckTravelResponse{
    comment: string;
    departureCity: string;
    arrivalCity: {
        // code: string;
        reason: {
            criteria: string;
            description: string;
        }[];
        images: string[];
    }
    suggestedCities: {
        // code: string;
        reason: {
            criteria: string;
            description: string;
        }[];
        images: string[];
    }[];

}