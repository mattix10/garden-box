import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { TableComponent } from './table/table.component';
import {MatIconModule} from '@angular/material/icon';
// import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    TableComponent
  ],
  imports: [
    CommonModule,
    MatSliderModule,
    MatIconModule
    // MatTableModule
  ],
  exports: [
    MatSliderModule,
    TableComponent,
    MatIconModule
  ]
})
export class SharedModule { }
