import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

const TILES = [
  {
    iconUrl: '../../../assets/icons/temperatura.svg',
    title: 'Temperatura',
    link: 'temperatura'
  },
  {
    iconUrl: '../../../assets/icons/oswietlenie.svg',
    title: 'Oświetlenie',
    link: 'oświetlenie'
  },
  {
    iconUrl: '../../../assets/icons/wilgotnosc.svg',
    title: 'Wilgotność',
    link: 'wilgotność'
  },
  {
    iconUrl: '../../../assets/icons/statystyki.svg',
    title: 'Statystyki',
    link: 'statystyki'
  },
  {
    iconUrl: '../../../assets/icons/powietrze.svg',
    title: 'Powietrze',
    link: 'powietrze'
  },
  {
    iconUrl: '../../../assets/icons/ustawienia.svg',
    title: 'Ustawienia',
    link: 'ustawienia'
  }
]

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  tiles: any[] = [];

  constructor(public router: Router) { 
  }

  ngOnInit(): void {
    this.tiles = TILES;
  }

}
