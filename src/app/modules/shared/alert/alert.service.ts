import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alertSource = new Subject();
  alert$ = this.alertSource.asObservable();

  constructor() { }

  showAlert(message: String, time:number = 3000){
    this.alertSource.next({message, time});
  }
}
