import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { MyAccountService } from 'src/app/core/services/my-account.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  constructor(private myAccountService: MyAccountService, private authService: AuthService) { }

  email: any;
  ngOnInit(): void {

  const decoded: any = jwt_decode(localStorage.token);
  this.email = decoded?.subject;
    console.log(decoded)
  }

  logout() {
    this.authService.logout();
  }

}
