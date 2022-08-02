import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderModule } from '../header/header.module';
import { LayoutComponent } from './layout.component';

@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    RouterModule,
  ],
  declarations: [LayoutComponent]
})
export class LayoutModule { }
