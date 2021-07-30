import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './table/table.component';



@NgModule({
  declarations: [
    TableComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
