import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../service/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private autService:AuthenticationService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    
    this.autService.logout();
    


  }

}
