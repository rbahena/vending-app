import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { registerInterface } from '../models/register.interface';
import { EMPTY, catchError, finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '../../shared/alert/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private authService: AuthService, private alertService: AlertService){}

  formRegister = new FormGroup({
    correo_electronico: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    contrasena: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    telefono: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  register() {
    this.authService.register(this.formRegister.value as registerInterface).pipe(
      finalize(() => {
        console.log('Finalize');
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error.error.message);
        this.alertService.showAlert(error.error.message, "Error");
        throw error;
      }),
    ).subscribe();
    this.alertService.showAlert("El usuario se registro de manera exitosa!!");
  }
}
