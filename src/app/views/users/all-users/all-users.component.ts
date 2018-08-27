import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../../../service/user.service';
import { User } from '../../../model/user';
import { Image } from '../../../model/image';
import { GeneralResponse } from '../../../model/GeneralResponse';
import { Pagenation } from '../../../model/pagination';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {

  user: User;
  userList: User[];
  response: GeneralResponse;
  pagenation: Pagenation;
  userForm: FormGroup;
  editMode = false;
  userId: number;
  private sub: any;
  page: number = 1;
  totalCount: number;
  totalPages: number;

  constructor(private fb: FormBuilder, private userService: UserService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.pagenation = {
      "language": 1,
      "page": 1,
      "noOfRows": 10
    }
    this.onLoadUsers(this.pagenation);
  }

  onLoadUsers(pagenation) {
    console.log(pagenation);
    this.userService.getAllUsers(pagenation).subscribe(data => {
      this.response = data;
      console.log(this.response);
      if (this.response.statusCode === "OK") {
        this.userList = this.response.result;
        this.claculatePagination(this.response.totalCount);
      }
      console.log(data);
    });
  }


  claculatePagination(totalNumber: number) {
    this.totalCount = totalNumber;
    if (this.totalCount >= 1 && this.totalCount < 10) {
      this.totalPages = 1;
    } else if (this.totalCount % 10 !== 0) {
      this.totalPages = (this.totalCount / 10) + 1;
    } else {
      this.totalPages = this.totalCount / 10;
    }
  }

  pageChanged(event: any) {
    this.page = event;
    this.pagenation = {
      language: 1,
      page: this.page,
      noOfRows: 10
    }
    this.onLoadUsers(this.pagenation);
  }



  editForm(userId: number) {
    this.router.navigate(['../edit-customer', userId], { relativeTo: this.route });
  }


  onDeleteAdmin(userId: number) {

    this.userService.deleteUser(userId).subscribe(data => {
      this.onLoadUsers(this.pagenation);
    })

  }

  onAddNewCustomer() {
    this.router.navigate(['users/add-customer']);
  }

}
