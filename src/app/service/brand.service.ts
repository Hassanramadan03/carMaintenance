import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { CarBrand } from "../model/car-brand";
import { Image } from "../model/image";
import { AllBrands } from "../model/all-brands";
import { GlobalTokenService } from "./global-token.service";

@Injectable()
export class BrandService {
  total: number;
  checkOut: String;
  carBrand: CarBrand;
  allbrands: AllBrands;
  constructor(private http: Http, private tokenService: GlobalTokenService) { }

  addBrand(carBrand) {
    let header = new Headers();
    console.log(JSON.stringify(carBrand));
    header.append("Content-Type", "application/json");
    header.append("Authorization", "Bearer " + this.tokenService.getToken());
    return this.http
      .post("http://41.187.117.153:8080/addBrand", carBrand, { headers: header })
      .map(res => res.json());
  }

  getAllBrands(allbrands: AllBrands) {
    let header = new Headers();
    header.append("Content-Type", "application/json");
    header.append("Authorization", "Bearer " + this.tokenService.getToken());
    console.log("I'm About to send request");
    return this.http
      .post("http://41.187.117.153:8080/get-all-brands", allbrands, {
        headers: header
      })
      .map(res => res.json());
  }

  updateBrand(carBrand) {
    let header = new Headers();
    console.log(JSON.stringify(carBrand));
    header.append("Content-Type", "application/json");
    header.append("Authorization", "Bearer " + this.tokenService.getToken());
    return this.http
      .post("http://41.187.117.153:8080/updateBrand", carBrand, { headers: header })
      .map(res => res.json());
  }

  deleteBrand(id) {
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
