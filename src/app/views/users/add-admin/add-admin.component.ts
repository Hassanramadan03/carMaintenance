import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../../../service/user.service';
import { User } from '../../../model/user';
import { Image } from '../../../model/image';
import { GeneralResponse } from '../../../model/GeneralResponse';
import { Pagenation } from '../../../model/pagination';






@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent implements OnInit {

  admin: User;
  adminList: User[];
  response: GeneralResponse;
  pagenation: Pagenation;
  adminForm: FormGroup;
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

    this.adminForm = this.fb.group({
      userId: [''],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      mobile: ['', [Validators.required]]
    });
  }


  findUserById(userId: number) {

    this.userService.findByUserId(userId).subscribe(data => {
      this.response = data;
      if (this.response.statusCode === "OK") {
        this.admin = this.response.result;
        this.adminForm.setValue({

          userId: this.admin.userId,
          firstName: this.admin.firstName,
          lastName: this.admin.lastName,
          email: this.admin.email,
          password: this.admin.password,
          mobile: this.admin.mobile
        });
        this.editMode = true;
      }
    });
  }





  /**onAddNewBrand(){
    console.log("I'm in function");
    this.carBrand = this.brandForm.value;
   this.carBrand.brandImage = this.base64textString;
  
  }
  */







  onAddAdmin() {
    this.admin = this.adminForm.value;
    if (this.admin.email !== null && this.admin.mobile !== null) {
      this.admin.userLanguage = "en";
      this.userService.addAdmin(this.admin).subscribe(data => {
        this.router.navigate(['users/all-admins']);
      });
      this.resetForm();
    }
  }



  resetForm(): void {
    this.adminForm.setValue({

      userId: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      mobile: ''
    });

    // this.brandIamage='';
    // this.imageEdit = null;
    this.editMode = false;
  }


  onUpdateAdmin() {
    this.admin = this.adminForm.value;
    if (this.admin.email !== null && this.admin.mobile !== null) {
      this.userService.updateUser(this.admin).subscribe(data => {
        this.router.navigate(['users/all-admins']);
      });
      this.resetForm();
    }
  }




  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
