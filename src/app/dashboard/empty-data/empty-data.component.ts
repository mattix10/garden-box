import { Component } from '@angular/core';

@Component({
  selector: 'app-empty-data',
  templateUrl: './empty-data.component.html',
  styleUrls: ['./empty-data.component.scss']
})
export class EmptyDataComponent {

  message: string;
  constructor() { }

  ngOnInit() {
     this.setMessage();
  }

  private setMessage() {
    this.message = 'Brak danych do wyświetlenia.';
  }

}
