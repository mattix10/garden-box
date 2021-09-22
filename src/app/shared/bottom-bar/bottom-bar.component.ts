import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.scss']
})
export class BottomBarComponent implements OnInit {

  constructor(public router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  isActiveLink(exact: boolean) {
    console.log(this.router.url)
    return this.router.isActive('panel/', exact);
}

logout() {
  this.authService.logout();
  this.router.navigateByUrl('/zaloguj')
}


}
