import Itinerary from '../models/schemas/itinerary';




const getItinerary = async (itineraryId: string) => {
    try {
        const itinerary = await Itinerary.findById(itineraryId);
        console.log(itinerary);
        if (!itinerary) {
            throw new Error('Itinerary not found');
        }
        return itinerary;
    } catch (error) {
        throw new Error(`Error fetching itinerary:`);
    }
}

const saveItinerary=async(itineraryData:any)=>{
    try{
        const itinerary = new Itinerary(itineraryData);
        await itinerary.save();
        return itinerary;

    }catch(error){
        console.log(error);
        throw new Error(`Error saving itinerary:`);
    }
}


export {getItinerary,saveItinerary};
