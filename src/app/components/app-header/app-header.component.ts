import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../service/authentication.service";

@Component({
  selector: "app-header",
  templateUrl: "./app-header.component.html"
})
export class AppHeaderComponent implements OnInit {
  constructor(private authService: AuthenticationService) {}
  myAcount = null;

  ngOnInit() {
    this.myAcount = this.authService.myAccount;
    if (!this.myAcount) {
      this.myAcount = JSON.parse(localStorage.getItem("myAccount"));
    }
    //JSON.parse(localStorage.getItem("myAccount"));
    console.log("header work");
    console.log(this.myAcount);
    console.log(this.myAcount);
  }
}
