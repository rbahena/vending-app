import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { BackOfficeDashboardComponent } from './back-office-home/back-office-home.component';
import { BackOfficeRoutingModule } from './back-office-routing.module';



@NgModule({
  declarations: [
    NavbarComponent,
    BackOfficeDashboardComponent
  ],
  imports: [
    CommonModule,
    BackOfficeRoutingModule
  ]
})
export class BackOfficeModule { }
