import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { User } from "../model/user";
import { Image } from "../model/image";
import { Pagenation } from "../model/pagination";
import { GlobalTokenService } from "./global-token.service";

@Injectable()
export class UserCarService {
  total: number;
  checkOut: String;
  user: User;
  pagenation: Pagenation;

  constructor(private http: Http, private tokenService: GlobalTokenService) { }

  addUserCar(userCar) {
    let header = new Headers();
    console.log(JSON.stringify(userCar));
    header.append("Content-Type", "application/json");
    header.append("Authorization", "Bearer " + this.tokenService.getToken());
    return this.http
      .post("http://41.187.117.153:8080/addBrand", userCar, { headers: header })
      .map(res => res.json());
  }

  getUserCars(pagenation: Pagenation) {
    let header = new Headers();
    header.append("Content-Type", "application/json");
    header.append("Authorization", "Bearer " + this.tokenService.getToken());
    return this.http
      .post("http://41.187.117.153:8080/get-all-brands", pagenation, {
        headers: header
      })
      .map(res => res.json());
  }

  getUserCar(userCarId) {
    let header = new Headers();
    header.append("Content-Type", "application/json");
    header.append("Authorization", "Bearer " + this.tokenService.getToken());
    return this.http
      .get("http://41.187.117.153:8080/findByCarId/" + userCarId, {
        headers: header
      })
      .map(res => res.json());
  }

  updateUserCar(pagenation) {
    let header = new Headers();
    console.log(JSON.stringify(pagenation));
    header.append("Content-Type", "application/json");
    header.append("Authorization", "Bearer " + this.tokenService.getToken());
    return this.http
      .post("http://41.187.117.153:8080/updateBrand", pagenation, {
        headers: header
      })
      .map(res => res.json());
  }

  deleteUserCar(id) {
    let header = new Headers();
    console.log(JSON.stringify(id));
    header.append("Content-Type", "application/json");
    header.append("Authorization", "Bearer " + this.tokenService.getToken());
    return this.http
      .post("http://41.187.117.153:8080/deleteBrand", id, { headers: header })
      .map(res => res.json());
  }

  deleteImage(image: Image) {
    let header = new Headers();

    header.append("Content-Type", "application/json");
    header.append("Authorization", "Bearer " + this.tokenService.getToken());
    return this.http
      .post("http://41.187.117.153:8080/delete-image-brand", image, {
        headers: header
      })
      .map(res => res.json());
  }
}
