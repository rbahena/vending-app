import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BackOfficeDashboardComponent } from './back-office-home/back-office-home.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path:'',
    component: BackOfficeDashboardComponent,
    children: [
      {
        path:'dashboard',
        component: DashboardComponent
      },
      {
        path:'products',
        loadChildren:()=> import('./products/products.module').then((modules) => modules.ProductsModule)
      },
      {
        path:'',
        component:DashboardComponent
      },
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class BackOfficeRoutingModule { }
