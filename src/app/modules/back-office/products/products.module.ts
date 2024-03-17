import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ChecarestatusPipe } from '../catalogs/pipes/checarestatus.pipe';


const routes = [{ path: '', component: ProductListComponent }];
@NgModule({
  declarations: [
    ChecarestatusPipe,
    ProductListComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class ProductsModule { }
