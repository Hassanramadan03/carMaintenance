import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { CarModel } from "../model/car-model";
import { Image } from "../model/image";
import { AllModels } from "../model/all-models";
import { GlobalTokenService } from "./global-token.service";

@Injectable()
export class Modelervice {
  total: number;
  checkOut: String;
  carModel: CarModel;
  allModels: AllModels;
  constructor(private http: Http, private tokenService: GlobalTokenService) { }

  addModel(carModel) {
    let header = new Headers();
    console.log(JSON.stringify(carModel));
    header.append("Content-Type", "application/json");
    header.append("Authorization", "Bearer " + this.tokenService.getToken());
    return this.http
      .post("http://41.187.117.153:8080/add-car-model", carModel, {
        headers: header
      })
      .map(res => res.json());
  }

  getAllModels(AllModels) {
    let header = new Headers();
    console.log(JSON.stringify(AllModels));
    header.append("Content-Type", "application/json");

    return this.http
      .post("http://41.187.117.153:8080/find-all-models", AllModels, {
        headers: header
      })
      .map(res => res.json());
  }

  updateModel(carModel) {
    let header = new Headers();
    console.log(JSON.stringify(carModel));
    header.append("Content-Type", "application/json");
    header.append("Authorization", "Bearer " + this.tokenService.getToken());

    return this.http
      .post("http://41.187.117.153:8080/update-car-model", carModel, {
        headers: header
      })
      .map(res => res.json());
  }

  deleteModel(modelId) {
    let header = new Headers();
    console.log(JSON.stringify(modelId));
    header.append("Content-Type", "application/json");
    header.append("Authorization", "Bearer " + this.tokenService.getToken());
    return this.http
      .post("http://41.187.117.153:8080/deleteModel", modelId, { headers: header })
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
