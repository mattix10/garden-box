import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-info',
  templateUrl: './main-info.component.html',
  styleUrls: ['./main-info.component.scss']
})
export class MainInfoComponent implements OnInit {

  date: string = new Date().toLocaleDateString('PL-pl');
  time: string = new Date().toLocaleTimeString('Pl-pl');
  constructor() { }

  ngOnInit(): void {
    setInterval(()=> {
      this.time = new Date().toLocaleTimeString('PL-pl');
    }, 1000)
  }

}
