import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogsRoutingModule } from './catalogs-routing.module';
import { Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CatalogsRoutingModule
  ]
})
export class CatalogsModule { }
