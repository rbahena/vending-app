import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogsRoutingModule } from './catalogs-routing.module';
import { Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { ChecarestatusPipe } from './pipes/checarestatus.pipe';
import { ModalsComponent } from '../../shared/modals/modals.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EnvasesComponent } from './envases/envases.component';
import { UnidadesMedidaComponent } from './unidades-medida/unidades-medida.component';
import { PresentacionesProductoComponent } from './presentaciones-producto/presentaciones-producto.component';


@NgModule({
  declarations: [
    ChecarestatusPipe,
    CategoriesComponent,
    ModalsComponent,
    EnvasesComponent,
    UnidadesMedidaComponent,
    PresentacionesProductoComponent
  ],
  imports: [
    CommonModule,
    CatalogsRoutingModule,
    ReactiveFormsModule,
  ]
})
export class CatalogsModule { }
