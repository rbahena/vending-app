import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogsRoutingModule } from './catalogs-routing.module';
import { Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { ChecarestatusPipe } from './categories/pipes/checarestatus.pipe';


@NgModule({
  declarations: [
    ChecarestatusPipe,
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    CatalogsRoutingModule,
  ]
})
export class CatalogsModule { }
