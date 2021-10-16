import { Component, OnInit } from '@angular/core';
import { MyAccountService } from 'src/app/core/services/my-account.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  constructor(private myAccountService: MyAccountService) { }

  ngOnInit(): void {
  }

}
