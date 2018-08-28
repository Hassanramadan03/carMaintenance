import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";

@Injectable()
export class ApiUrlService {
    private serverUrl = 'http://192.168.1.177:8080/';
    private authToken;
    private header: any = {};
    constructor() {
        const currentUser = JSON.parse(localStorage.getItem("geyushiUser"));
        if (currentUser) {
            this.authToken = currentUser.authToken;
            let header = new Headers();
            header.append("Content-Type", "application/json");
            header.append("Authorization", "Bearer " + this.authToken);
            this.header = { headers: header }
        }
    }
    getHeaders() {
        return this.header;
    }
    getApiUrl() {
        return {
            updateAboutUs: this.serverUrl + `editAboutUs`,
            getAboutUs: this.serverUrl + `aboutUs`,
            getAllContactUs: this.serverUrl + `getAllContactUs`,
            findContactUsById: this.serverUrl + `findContactUsById`,
            deleteContactUs: this.serverUrl + 'deleteContactUs',
            readService: this.serverUrl + 'readService/',
            deleteService: this.serverUrl + 'deleteService/',
            findMaintainceRequesteById: this.serverUrl + 'findMaintainceRequesteById/',
            findAllMaintainceRequeste: this.serverUrl + 'findAllMaintainceRequeste',
            deleteImageBrand: this.serverUrl + 'delete-image-brand',
            deleteServiceType: this.serverUrl + 'deleteServiceType',
            updateServiceType: this.serverUrl + 'updateServiceType',
            findAllServiceAdmin: this.serverUrl + 'findAllServiceAdmin',
            addServiceType: this.serverUrl + 'addServiceType',

        }
    }
}
