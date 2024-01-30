import { Component } from '@angular/core';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  message:String = '';
  showAlertComponent:boolean = false;


  constructor(private alertService: AlertService){}
  ngOnInit(){
    this.alertService.alert$.subscribe((res:any)=> {
      this.showAlertComponent = true;
      this.message = res.message;
      setTimeout(() => {
        this.showAlertComponent = false;
      }, res.time);
    });
  }
}
