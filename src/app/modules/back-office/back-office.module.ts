import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { BackOfficeDashboardComponent } from './back-office-home/back-office-home.component';
import { BackOfficeRoutingModule } from './back-office-routing.module';
import { UserDetailComponent } from './navbar/user-detail/user-detail.component';



@NgModule({
  declarations: [
    NavbarComponent,
    BackOfficeDashboardComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    BackOfficeRoutingModule
  ]
})
export class BackOfficeModule { }
