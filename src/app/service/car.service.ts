import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { Image } from "../model/image";
import { CarDetails } from "../model/car-details";
import { AllCars } from "../model/all.cars";
import { GlobalTokenService } from "./global-token.service";

@Injectable()
export class CarService {
  total: number;
  checkOut: String;
  carDetails: CarDetails;
  allCars: AllCars;
  constructor(private http: Http, private tokenService: GlobalTokenService) { }

  addCar(carDetails) {
    let header = new Headers();
    header.append("Authorization", "Bearer " + this.tokenService.getToken());
    return this.http
      .post("http://41.187.117.153:8080/add-car", carDetails, { headers: header })
      .map(res => res.json());
  }

  getAllCars(allCars) {
    let header = new Headers();
    console.log(JSON.stringify(allCars));
    header.append("Content-Type", "application/json");

    return this.http
      .post("http://41.187.117.153:8080/find-all-car", allCars, { headers: header })
      .map(res => res.json());
  }
  findCarById(carId) {
    let header = new Headers();
    header.append("Authorization", "");
    return this.http
      .post("http://41.187.117.153:8080/find-by-car-id/" + carId + "/1", {
        headers: header
      })
      .map(res => res.json());
  }

  updateCar(carDetails) {
    let header = new Headers();
    header.append("Authorization", "Bearer " + this.tokenService.getToken());
    console.log(JSON.stringify(carDetails));

    return this.http
      .post("http://41.187.117.153:8080/update-car", carDetails, { headers: header })
      .map(res => res.json());
  }

  deleteCar(id) {
    let header = new Headers();
    console.log(JSON.stringify(id));
    header.append("Content-Type", "application/json");
    header.append("Authorization", "Bearer " + this.tokenService.getToken());
    return this.http
      .post("http://41.187.117.153:8080/delete-car", id, { headers: header })
      .map(res => res.json());
  }
}
