import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogsRoutingModule } from './catalogs-routing.module';
import { CategoriesComponent } from './categories/categories.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EnvasesComponent } from './envases/envases.component';
import { UnidadesMedidaComponent } from './unidades-medida/unidades-medida.component';
import { PresentacionesProductoComponent } from './presentaciones-producto/presentaciones-producto.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    CategoriesComponent,
    EnvasesComponent,
    UnidadesMedidaComponent,
    PresentacionesProductoComponent,
    ProveedoresComponent
  ],
  imports: [
    CommonModule,
    CatalogsRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CatalogsModule { }
