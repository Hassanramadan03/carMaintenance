import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { User } from "../model/user";
import { Image } from "../model/image";
import { Pagenation } from "../model/pagination";
import { GlobalTokenService } from "./global-token.service";

@Injectable()
export class UserService {
  total: number;
  checkOut: String;
  user: User;
  pagenation: Pagenation;
  constructor(private http: Http, private tokenService: GlobalTokenService) { }

  addAdmin(user) {
    let header = new Headers();
    console.log(JSON.stringify(user));
    header.append("Content-Type", "application/json");
    header.append("Authorization", "Bearer " + this.tokenService.getToken());
    return this.http
      .post("http://41.187.117.153:8080/add-admin", user, { headers: header })
      .map(res => res.json());
  }

  addUser(user) {
    let header = new Headers();
    console.log(JSON.stringify(user));
    header.append("Content-Type", "application/json");
    header.append("Authorization", "Bearer " + this.tokenService.getToken());
    return this.http
      .post("http://41.187.117.153:8080/registerUser", user, { headers: header })
      .map(res => res.json());
  }
  getAllAdmins(pagenation: Pagenation) {
    let header = new Headers();
    header.append("Content-Type", "application/json");
    header.append("Authorization", "Bearer " + this.tokenService.getToken());

    return this.http
      .post("http://41.187.117.153:8080/get-all-admins", pagenation, {
        headers: header
      })
      .map(res => res.json());
  }

  getAllUsers(pagenation: Pagenation) {
    let header = new Headers();
    header.append("Content-Type", "application/json");
    header.append("Authorization", "Bearer " + this.tokenService.getToken());

    return this.http
      .post("http://41.187.117.153:8080/get-all-users", pagenation, {
        headers: header
      })
      .map(res => res.json());
  }

  findByUserId(userId: number) {
    let header = new Headers();
    header.append("Content-Type", "application/json");
    header.append("Authorization", "Bearer " + this.tokenService.getToken());

    return this.http
      .get("http://41.187.117.153:8080/findUserById/" + userId, { headers: header })
      .map(res => res.json());
  }

  updateUser(user: User) {
    let header = new Headers();
    console.log(JSON.stringify(user));
    header.append("Content-Type", "application/json");
    header.append("Authorization", "Bearer " + this.tokenService.getToken());
    console.log("I wiil Send Request");
    return this.http
      .post("http://41.187.117.153:8080/updateUser", user, { headers: header })
      .map(res => res.json());
  }

  changePassword(arg0: any) {
    let header = new Headers();
    header.append("Content-Type", "application/json");
    header.append("Authorization", "Bearer " + this.tokenService.getToken());
    return this.http
      .post("http://41.187.117.153:8080/changePassword", arg0, { headers: header })
      .map(res => res.json());
  }

  deleteUser(id) {
    let header = new Headers();
    header.append("Content-Type", "application/json");
    header.append("Authorization", "Bearer " + this.tokenService.getToken());
    return this.http
      .get("http://41.187.117.153:8080/deleteUser/" + id, { headers: header })
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

  changeUserImage(profilePic) {
    let header = new Headers();
    header.append("Authorization", "Bearer " + this.tokenService.getToken());

    return this.http
      .post("http://41.187.117.153:8080/changeProfilePicture", profilePic, {
        headers: header
      })
      .map(res => res.json());
  }
}
