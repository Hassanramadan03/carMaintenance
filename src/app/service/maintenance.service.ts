import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { MaintenanceType } from "../model/maintenance-type";
import { Image } from "../model/image";
import { GlobalTokenService } from "./global-token.service";
import { Pagenation } from "../model/pagination";

@Injectable()
export class MaintenenaceService {
  total: number;
  checkOut: String;
  type: MaintenanceType;
  pagenation: Pagenation;
  constructor(private http: Http, private tokenService: GlobalTokenService) { }

  addType(type) {
    let header = new Headers();
    console.log(JSON.stringify(type));
    header.append("Content-Type", "application/json");
    header.append("Authorization", "Bearer " + this.tokenService.getToken());
    return this.http
      .post("http://41.187.117.153:8080/addServiceType", type, { headers: header })
      .map(res => res.json());
  }

  getAllTypes(pagenation: Pagenation) {
    let header = new Headers();
    header.append("Content-Type", "application/json");
    header.append("Authorization", "Bearer " + this.tokenService.getToken());
    return this.http
      .post("http://41.187.117.153:8080/findAllServiceAdmin", pagenation, {
        headers: header
      })
      .map(res => res.json());
  }

  updateType(type) {
    let header = new Headers();
    console.log(JSON.stringify(type));
    header.append("Content-Type", "application/json");
    header.append("Authorization", "Bearer " + this.tokenService.getToken());
    return this.http
      .post("http://41.187.117.153:8080/updateServiceType", type, {
        headers: header
      })
      .map(res => res.json());
  }

  deleteType(id) {
    let header = new Headers();
    console.log(JSON.stringify(id));
    header.append("Content-Type", "application/json");
    header.append("Authorization", "Bearer " + this.tokenService.getToken());
    return this.http
      .post("http://41.187.117.153:8080/deleteServiceType", id, { headers: header })
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

  // Services

  getAllServices(pagenation: Pagenation) {
    let header = new Headers();
    header.append("Content-Type", "application/json");
    header.append("Authorization", "Bearer " + this.tokenService.getToken());
    return this.http
      .post("http://41.187.117.153:8080/findAllMaintainceRequeste", pagenation, {
        headers: header
      })
      .map(res => res.json());
  }

  getServicesById(id) {
    let header = new Headers();
    header.append("Content-Type", "application/json");
    header.append("Authorization", "Bearer " + this.tokenService.getToken());
    return this.http
      .get("http://41.187.117.153:8080/findMaintainceRequesteById/" + id, {
        headers: header
      })
      .map(res => res.json());
  }

  deleteServicesById(id) {
    let header = new Headers();
    header.append("Content-Type", "application/json");
    header.append("Authorization", "Bearer " + this.tokenService.getToken());
    return this.http
      .get("http://41.187.117.153:8080/deleteService/" + id, {
        headers: header
      })
      .map(res => res.json());
  }

  readServicesById(id) {
    let header = new Headers();
    header.append("Content-Type", "application/json");
    header.append("Authorization", "Bearer " + this.tokenService.getToken());
    return this.http
      .get("http://41.187.117.153:8080/readService/" + id, {
        headers: header
      })
      .map(res => res.json());
  }
}
