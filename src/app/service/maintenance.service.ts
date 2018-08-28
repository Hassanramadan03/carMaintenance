import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { MaintenanceType } from "../model/maintenance-type";
import { Image } from "../model/image";
import { GlobalTokenService } from "./global-token.service";
import { Pagenation } from "../model/pagination";
import { ApiUrlService } from "./api-url.service";

@Injectable()
export class MaintenenaceService {
  total: number;
  checkOut: String;
  type: MaintenanceType;
  pagenation: Pagenation;
  constructor(private http: Http, private tokenService: GlobalTokenService,private apiUrlService:ApiUrlService) { }

  addType(type) {
    return this.http
      .post(this.apiUrlService.getApiUrl().addServiceType, type, this.apiUrlService.getHeaders())
      .map(res => res.json());
  }

  getAllTypes(pagenation: Pagenation) {
    
    return this.http
      .post(this.apiUrlService.getApiUrl().findAllServiceAdmin, pagenation, this.apiUrlService.getHeaders())
      .map(res => res.json());
  }

  updateType(type) {
    return this.http
      .post(this.apiUrlService.getApiUrl().updateServiceType, type, this.apiUrlService.getHeaders())
      .map(res => res.json());
  }

  deleteType(id) {
    
    return this.http
      .post(this.apiUrlService.getApiUrl().deleteServiceType, id, this.apiUrlService.getHeaders())
      .map(res => res.json());
  }

  deleteImage(image: Image) {
    return this.http
      .post(this.apiUrlService.getApiUrl().deleteImageBrand, image, this.apiUrlService.getHeaders())
      .map(res => res.json());
  }

  // Services

  getAllServices(pagenation: Pagenation) {
    
    return this.http
      .post(this.apiUrlService.getApiUrl().findAllMaintainceRequeste, pagenation, this.apiUrlService.getHeaders())
      .map(res => res.json());
  }

  getServicesById(id) {
    
    return this.http
      .get(this.apiUrlService.getApiUrl().findMaintainceRequesteById + id, this.apiUrlService.getHeaders())
      .map(res => res.json());
  }

  deleteServicesById(id) {
    
    return this.http
      .get(this.apiUrlService.getApiUrl().deleteService + id, this.apiUrlService.getHeaders())
      .map(res => res.json());
  }

  readServicesById(id) {
    
    return this.http
      .get(this.apiUrlService.getApiUrl().readService + id, this.apiUrlService.getHeaders())
      .map(res => res.json());
  }
}
