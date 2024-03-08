import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogsRoutingModule } from './catalogs-routing.module';
import { Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { ChecarestatusPipe } from './categories/pipes/checarestatus.pipe';
import { ModalsComponent } from '../../shared/modals/modals.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EnvasesComponent } from './envases/envases.component';


@NgModule({
  declarations: [
    ChecarestatusPipe,
    CategoriesComponent,
    ModalsComponent,
    EnvasesComponent
  ],
  imports: [
    CommonModule,
    CatalogsRoutingModule,
    ReactiveFormsModule,
  ]
})
export class CatalogsModule { }
