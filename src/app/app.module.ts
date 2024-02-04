import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth/auth.module';
import { SpinnerComponent } from './modules/shared/spinner/spinner.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from './core/interceptors/loader.interceptor';
import { AlertComponent } from './modules/shared/alert/alert.component';
import { LandPageComponent } from './modules/home/land-page/land-page.component';
import { NavbarComponent } from './modules/home/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    AlertComponent,
    LandPageComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
