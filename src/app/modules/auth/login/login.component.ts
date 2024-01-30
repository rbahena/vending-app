import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { loginInterface } from '../models/login.interface';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.initForm();
  }

  formLogin!: FormGroup;

  login() {
    this.authService.login(this.formLogin.value);
  }

  initForm(): void {
    this.formLogin = new FormGroup({
      correo_electronico: new FormControl(''),
      contrasena: new FormControl(''),
    });
  }
}
