import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Faqs } from '../model/faq';
//import {Image} from '../model/image';
import { Pagenation } from '../model/pagination';
import { GlobalTokenService } from './global-token.service';

@Injectable()
export class FaqService {

    total: number;
    checkOut: String;
    faqs: Faqs;
    // allNews:AllNews
    pagenation: Pagenation;
    constructor(private http: Http, private tokenService: GlobalTokenService) { }



    addFaq(faqs) {
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append("Authorization", "Bearer " + this.tokenService.getToken());
        console.log("I'm hereeeeeeeeeeeeeeeeeeeeee")
        return this.http.post('http://41.187.117.153:8080/addFaq', faqs, { headers: header })
            .map(res => res.json());
    }

    getAllFaqs(pagenation) {
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append("Authorization", "Bearer " + this.tokenService.getToken());

        return this.http.post('http://41.187.117.153:8080/getAllFaqs', pagenation, { headers: header })
            .map(res => res.json());
    }

    findFaqById(faqId: number) {
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append("Authorization", "Bearer " + this.tokenService.getToken());
        return this.http.get('http://41.187.117.153:8080/findFaqById/' + faqId, { headers: header })
            .map(res => res.json());
    }

    updateFaq(faq) {
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append("Authorization", "Bearer " + this.tokenService.getToken());

        return this.http.post('http://41.187.117.153:8080/updateFaq', faq, { headers: header })
            .map(res => res.json());
    }

    deleteFaq(faq) {
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append("Authorization", "Bearer " + this.tokenService.getToken());

        return this.http.post('http://41.187.117.153:8080/deleteFaq', faq, { headers: header })
            .map(res => res.json());
    }


}