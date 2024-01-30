import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { registerInterface } from '../models/register.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private authService: AuthService){}

  formRegister = new FormGroup({
    correo_electronico: new FormControl('', {
      validators: [Validators.required],
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
    this.authService.register(this.formRegister.value as registerInterface);
  }
}
