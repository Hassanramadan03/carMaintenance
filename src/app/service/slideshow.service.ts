import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";

import { AllBlogs } from "../model/all-blogs";
import { GlobalTokenService } from "./global-token.service";
import { Slideshow } from "../model/slideshow";
//import {Image} from '../model/image';

@Injectable()
export class SlideshowService {
    total: number;
    checkOut: String;
    slideshow: Slideshow;

    constructor(private http: Http, private tokenService: GlobalTokenService) { }
    addSlideshow(slideshow) {
        let header = new Headers();
        header.append("Authorization", "Bearer " + this.tokenService.getToken());
        return this.http
            .post("http://41.187.117.153:8080/addSlideShow", slideshow, { headers: header })
            .map(res => res.json());
    }

    getAllSlideshows(allSlideshows) {
        let header = new Headers();
        header.append("Content-Type", "application/json");

        return this.http
            .post("http://41.187.117.153:8080/find-all-car", allSlideshows, { headers: header })
            .map(res => res.json());
    }
    findSlideshowById(slideshowId) {
        let header = new Headers();
        header.append("Authorization", "");
        return this.http
            .post("http://41.187.117.153:8080/find-by-car-id/" + slideshowId + "/1", {
                headers: header
            })
            .map(res => res.json());
    }

    updateSlideshow(slideshow) {
        let header = new Headers();
        header.append("Authorization", "Bearer " + this.tokenService.getToken());
        console.log(JSON.stringify(slideshow));

        return this.http
            .post("http://41.187.117.153:8080/editSlideShow", slideshow, { headers: header })
            .map(res => res.json());
    }

    deleteSlideshow(id) {
        let header = new Headers();
        console.log(JSON.stringify(id));
        header.append("Content-Type", "application/json");
        header.append("Authorization", "Bearer " + this.tokenService.getToken());
        return this.http
            .post("http://41.187.117.153:8080/deleteSlideShow/" + id, { headers: header })
            .map(res => res.json());
    }
}