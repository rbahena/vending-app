import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


const routes = [{ path: '', component: ProductListComponent }];
@NgModule({
  declarations: [
    ProductListComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class ProductsModule { }
