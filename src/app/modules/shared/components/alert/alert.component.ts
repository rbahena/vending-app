import { Component } from '@angular/core';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent {
  message: String = '';
  infoAlert: boolean = false;
  showAlertComponent: boolean = false;

  constructor(private alertService: AlertService) {}
  ngOnInit() {
    this.alertService.alert$.subscribe((res: any) => {
      this.showAlertComponent = true;
      this.message = res.message;
      console.log("Res.type: ",res.type);
      this.infoAlert = res.type == 'Info' ? true : false;
      setTimeout(() => {
        this.showAlertComponent = false;
      }, res.time);
    });
  }
}
