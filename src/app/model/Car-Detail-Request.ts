import { CarDetails } from './car-details';


export interface CarDetailsRequest{

    carDetails: CarDetails;
    carModelId:number;
    internalImage:String[];
    externalImage:String[];
    language:number;


}