import { Component, OnInit, TemplateRef } from "@angular/core";
import { User } from "../model/user";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BsModalService } from "ngx-bootstrap/modal";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { UserRoutingModule } from "../views/users/user-routing.module";
import { UserService } from "../service/user.service";
import { GeneralResponse } from "../model/GeneralResponse";

@Component({
  selector: "app-user-settings",
  templateUrl: "./user-settings.component.html",
  styleUrls: ["./user-settings.component.scss"]
})
export class UserSettingsComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService,
    private userService: UserService
  ) {}

  myAcount = null;

  user: User;
  modalRef: BsModalRef;
  firstName: String;
  lastName: String;
  email: String;
  password: String;
  repassword: String;
  isFirstName: Boolean = true;
  isLastName: Boolean = true;
  isEmail: Boolean = true;
  isPasswordMatched: Boolean;
  profileImageRequest = new FormData();
  private profilePic: File = null;
  wrongPassword: Boolean = false;
  oldPassword: String;
  passwordObj: any;
  wrongOldPassword: Boolean = false;
  response: GeneralResponse;

  ngOnInit() {
    this.myAcount = JSON.parse(localStorage.getItem("myAccount"));
    console.log(this.myAcount);
    if (this.myAcount) {
      this.user = this.myAcount;
    }

    if (this.user) {
      this.firstName = this.user.firstName;
      this.lastName = this.user.lastName;
      this.email = this.user.email;
    }
  }

  openModalFirstName(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: "modal-sm" });
  }

  openModalLastName(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: "modal-sm" });
  }

  openModalEmail(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: "modal-sm" });
  }

  openModalPassword(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: "modal-sm" });
  }

  //models

  confirmFirstName(): void {
    this.onChangeFirstName(this.firstName);
    //this.modalRef.hide();
  }

  confirmLastName() {
    this.onChangeLastName(this.lastName);
    //this.modalRef.hide();
  }

  confirmEmail() {
    this.onChangeEmail(this.email);
    //this.modalRef.hide();
  }

  confirmPassword() {
    if (this.password !== this.repassword) {
      this.wrongPassword = true;
    } else {
      this.onChangePassword(this.password, this.oldPassword);
    }
  }

  decline(): void {
    this.modalRef.hide();
    this.firstName = this.user.firstName;
    this.lastName = this.user.lastName;
    this.email = this.user.email;
    this.password = "";
    this.repassword = "";
    this.oldPassword = "";
  }

  onChangeFirstName(firstName: String) {
    if (firstName.trim() === "" || firstName.length < 2) {
      this.isFirstName = false;
    } else {
      this.isFirstName = true;
      this.user.firstName = firstName;
      this.userService.updateUser(this.user).subscribe(data => {
        localStorage.removeItem("myAccount");
        localStorage.setItem("myAccount", JSON.stringify(this.user));
        this.modalRef.hide();
      });
      console.log(this.user.userId);
    }
  }
  onChangeLastName(lastName: String) {
    if (lastName.trim() === "" || lastName.length < 2) {
      this.isLastName = false;
    } else {
      this.isLastName = true;
      this.user.lastName = lastName;
      this.userService.updateUser(this.user).subscribe(data => {
        localStorage.removeItem("myAccount");
        localStorage.setItem("myAccount", JSON.stringify(this.user));
        this.modalRef.hide();
      });
    }
  }
  onChangeEmail(email: String) {
    if (email.trim() === "" || email.length < 2) {
      this.isEmail = false;
    } else {
      this.isEmail = true;
      this.user.email = email;
      this.userService.updateUser(this.user).subscribe(data => {
        this.modalRef.hide();
      });
    }
  }
  onChangePassword(password: String, oldPassword: String) {
    console.log(password);
    console.log(oldPassword);
    if (this.oldPassword.trim() !== "" && this.password.trim() !== "") {
      this.passwordObj = {
        oldPassword: this.oldPassword,
        newPassword: this.password
      };
      this.userService.changePassword(this.passwordObj).subscribe(data => {
        this.response = data;
        if (this.response.statusCode !== "OK") {
          this.wrongOldPassword = true;
        } else {
          this.wrongOldPassword = false;
          this.modalRef.hide();
          this.password = "";
          this.repassword = "";
          this.oldPassword = "";
        }
      });
    }
  }

  addProfileImage() {}

  handleFileSelectProfile(evt) {
    this.profilePic = <File>evt.target.files[0];

    if (this.profilePic) {
      this.profileImageRequest.append("profilePic", this.profilePic);
      this.userService
        .changeUserImage(this.profileImageRequest)
        .subscribe(data => {
          this.user = data;
          localStorage.removeItem("myAccount");
          localStorage.setItem("myAccount", JSON.stringify(this.user));
          this.profileImageRequest = new FormData();
        });
    }
  }
}
