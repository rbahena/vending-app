import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './components/alert/alert.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ChecarestatusPipe } from './pipes/checarestatus.pipe';



@NgModule({
  declarations: [
    AlertComponent,
    SpinnerComponent,
    ChecarestatusPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    AlertComponent,
    SpinnerComponent,
    ChecarestatusPipe
  ]
})
export class SharedModule { }
