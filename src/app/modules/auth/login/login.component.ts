import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { loginInterface } from '../models/login.interface';
import { AuthService } from '../auth.service';
import { EMPTY, Subject, catchError, finalize } from 'rxjs';
import { HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import { AlertService } from '../../shared/alert/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private alertService: AlertService) {}
  private unsubscribe$ = new Subject<void>();
  ngOnInit(): void {}

  formLogin = new FormGroup({
    correo_electronico: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    contrasena: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  login() {
    this.authService
      .login(this.formLogin.value as loginInterface)
      .pipe(
        finalize(() => {
          console.log('Finalize');
        }),
        catchError((error: HttpErrorResponse) => {
          console.log('Catch error');
          if (error.status === 401) {
            this.alertService.showAlert(
              'No tienes permisos para acceder a esta página.', "Error"
            );
            return EMPTY;
          }
          this.alertService.showAlert(error.message, "Error");
          throw error;
        }),
      )
      .subscribe();
      this.alertService.showAlert('Inicio de sesión exitoso.');
  }

  ngOnDestroy(): void {}
}
