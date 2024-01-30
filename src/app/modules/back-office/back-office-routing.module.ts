import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BackOfficeHomeComponent } from './back-office-home/back-office-home.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path:'',
    component: BackOfficeHomeComponent,
    children: [
      {
        path:'',
        component: HomeComponent
      }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class BackOfficeRoutingModule { }
