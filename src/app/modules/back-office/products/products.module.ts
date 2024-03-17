import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { PrecioProveedorComponent } from './precio-proveedor/precio-proveedor.component';


const routes = [{ path: '', component: ProductListComponent }];
@NgModule({
  declarations: [
    ProductListComponent,
    PrecioProveedorComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ProductsModule { }
