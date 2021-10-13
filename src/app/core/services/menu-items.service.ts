import { Injectable } from '@angular/core';
import { MenuItem } from './../interfaces/MenuItem';

const MENU_ITEMS: MenuItem[] = [
  {
    iconName: 'home',
    title: 'Strona główna',
    link: 'panel',
    category: ''
  },
  {
    iconName: 'thermostat',
    title: 'Temperatura',
    name: 'temperature',
    link: 'temperatura',
    unit: '°C',
    minSliderValue: 25,
    maxSliderValue: 30,
    category: 'parameters',
    color:'#D5FDCB',
    backgroundColor: '#38AA73'
  },
  {
    iconName: 'air',
    title: 'Powietrze',
    name: 'air',
    link: 'powietrze',
    unit: 'µg/m3',
    category: 'parameters',
    color:'#136B41',
    backgroundColor: '#C8F6BC'
  },
  {
    iconName: 'emoji_objects',
    title: 'Oświetlenie',
    name: 'light',
    link: 'oświetlenie',
    unit: '%',
    minSliderValue: 0,
    maxSliderValue: 100,
    category: 'parameters',
    color: '#A9DFFE',
    backgroundColor: '#0D77B4'
  },
  {
    iconName: 'water_drop',
    title: 'Wilgotność',
    name: 'humidity',
    link: 'wilgotność',
    unit: 'g/m3',
    minSliderValue: 0,
    maxSliderValue: 100,
    category: 'parameters',
    color: '#0D77B4',
    backgroundColor: '#A9DFFE'
  },
  {
    iconName: 'inventory',
    title: 'Zbiornik',
    name: 'container',
    link: 'zbiornik',
    unit: '%',
    category: 'devices'
  },
  {
    iconName: 'bar_chart',
    title: 'Statystyki',
    link: 'statystyki',
    category: 'others'
  },
  {
    iconName: 'person',
    title: 'Moje konto',
    link: 'moje-konto',
    category: 'others'
  },
  {
    iconName: 'settings',
    title: 'Ustawienia',
    link: 'ustawienia',
    category: 'others'
  }
]

@Injectable({
  providedIn: 'root'
})

export class MenuItemsService {

  constructor() { }

  getMenuItems() {
    return MENU_ITEMS;
  }
}
