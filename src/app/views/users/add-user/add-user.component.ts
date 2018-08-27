import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../../../service/user.service';
import { User } from '../../../model/user';
import { Image } from '../../../model/image';
import { GeneralResponse } from '../../../model/GeneralResponse';
import { Pagenation } from '../../../model/pagination';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  user: User;
  userList: User[];
  response: GeneralResponse;
  pagenation: Pagenation;
  userForm: FormGroup;
  editMode = false;
  userId: number;
  private sub: any;

  constructor(private fb: FormBuilder, private userService: UserService, private route: ActivatedRoute,
    private router: Router) { }


  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      if (params['id']) {
        this.userId = +params['id']; // (+) converts string 'id' to a number
        // In a real app: dispatch action to load the details here.
        this.findUserById(this.userId);

      }
    });

    this.userForm = this.fb.group({
      userId: [''],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      userLanguage: ['', [Validators.required]]
    });
  }


  findUserById(userId: number) {

    this.userService.findByUserId(userId).subscribe(data => {
      this.response = data;
      if (this.response.statusCode === "OK") {
        this.user = this.response.result;
        this.userForm.setValue({

          userId: this.user.userId,
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          email: this.user.email,
          password: this.user.password,
          mobile: this.user.mobile,
          userLanguage: this.user.userLanguage
        });
        this.editMode = true;
      }
    });
  }

  onAddUser() {
    this.user = this.userForm.value;
    this.userService.addUser(this.user).subscribe(data => {
      this.router.navigate(['users/all-customers']);
    });
    this.resetForm();

  }



  resetForm(): void {
    this.userForm.setValue({

      userId: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      mobile: '',
      userLanguage: ''
    });

    // this.brandIamage='';
    // this.imageEdit = null;
    this.editMode = false;
  }



  onUpdateUser() {
    console.log("I'm in Update");
    this.user = this.userForm.value;
    console.log(this.user.userLanguage);
    this.userService.updateUser(this.user).subscribe(data => {
      console.log(data);
      this.router.navigate(['users/all-customers']);
    });
    this.resetForm();

  }



  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
