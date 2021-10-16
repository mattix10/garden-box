import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { TableComponent } from './table/table.component';
import { MatIconModule } from '@angular/material/icon';
import { UpperFirstLetterPipe } from './pipes/upper-first-letter.pipe';
// import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
@NgModule({
  declarations: [
    TableComponent,
    UpperFirstLetterPipe
  ],
  imports: [
    CommonModule,
    MatSliderModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule
    // MatTableModule
  ],
  exports: [
    MatSliderModule,
    TableComponent,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    UpperFirstLetterPipe,
    MatButtonModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class SharedModule { }
