import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { CategoriesModule } from '../categories/categories.module';
import { CardComponent } from './card/card.component';
import { CatsComponent } from './cats.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CatsComponent
      }
    ]),
    CategoriesModule,
    MatProgressSpinnerModule
  ],
  declarations: [CatsComponent, CardComponent]
})
export class CatsModule { }
