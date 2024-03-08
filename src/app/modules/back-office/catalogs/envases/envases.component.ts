import { Component } from '@angular/core';
import { EnvasesService } from './envases.service';
import { AlertService } from 'src/app/modules/shared/alert/alert.service';
import { actualizaEnvaseDto, agregarEnvaseDto, envaseDto, obtenDetalleEnvaseDto } from './models/envase.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
const SUSCRIPTOR_LOCAL_STORAGE_KEY_VENDING = 'suscriptorData';

@Component({
  selector: 'app-envases',
  templateUrl: './envases.component.html',
  styleUrls: ['./envases.component.css']
})
export class EnvasesComponent {
  agregarEnvaseDto: agregarEnvaseDto = {};
  obtenerEnvaseDto: obtenDetalleEnvaseDto = {};
  actualizaEnvaseDto: actualizaEnvaseDto = {};
  titleEnvasesInterface: String = 'Lista de Envases';
  valorBoton: String = 'Agregar';
  activarFormularioEnvase: boolean = false;
  id_suscriptor: number | undefined;
  envases: envaseDto[] = [];

  constructor(private envaseService: EnvasesService, private alertService: AlertService) { }
  ngOnInit(): void {
    this.obtenerEnvases();
  }

  envaseFormulario = new FormGroup({
    nombre_envase: new FormControl('', [Validators.required, Validators.minLength(3)]),
    id_envase: new FormControl()
  });

  async obtenerEnvases() {
    console.log("Obtener");
    this.id_suscriptor = this.recuperaIdSuscriptorLocalStorage();
    (await this.envaseService.obtenerEnvases(this.id_suscriptor)).subscribe({
      next: response => {
        this.envases = response;
        this.alertService.showAlert('Los envases se recuperaron de manera exitosa.');
        console.log("this.envases: ", this.envases);
      },
      error: (error: HttpErrorResponse) => {
        this.alertService.showAlert(error.error.message, 'error');
      }
    });
  }

  crearActualizarEnvase() {
    if (this.envaseFormulario.invalid) return;
    if (this.envaseFormulario.value.id_envase == null) {
      console.log('Valor de formulario: ', this.envaseFormulario.value);
      this.agregarEnvaseDto = {
        fk_suscriptor: this.recuperaIdSuscriptorLocalStorage(),
        nombre_envase: this.envaseFormulario.value.nombre_envase!
      }
      this.envaseService.crearEnvase(this.agregarEnvaseDto).subscribe({
        next: response => {
          this.obtenerEnvases();
          this.activarFormularioEnvase = false;
          this.titleEnvasesInterface = 'Lista de envases';
          this.envaseFormulario.reset();
          this.alertService.showAlert('El envase se agrego con exito');
        },
        error: (error: HttpErrorResponse) => { this.alertService.showAlert(error.error.message, 'error'); }
      })
    }
    else {
      this.actualizaEnvaseDto = {
        fk_suscriptor: this.recuperaIdSuscriptorLocalStorage(),
        id_envase: this.envaseFormulario.value.id_envase,
        nombre_envase: this.envaseFormulario.value.nombre_envase!
      }
      this.actualizaEnvase(this.actualizaEnvaseDto);
    }
  }

  actualizaEnvase(actualizaEnvaseDto: actualizaEnvaseDto) {
    this.envaseService.actualizaEnvase(actualizaEnvaseDto).subscribe({
      next: response => {
        this.obtenerEnvases();
        this.alertService.showAlert('El envase se actualizo de manera correcta.');
        this.activarFormularioEnvase = false;
        this.envaseFormulario.reset();
        this.titleEnvasesInterface = 'Lista de envases';
      },
      error: (error: HttpErrorResponse) => {
        this.alertService.showAlert(error.error.message, 'error');
      }
    })
  }

  obtenerDetalleEnvase(id_envase: number) {
    this.obtenerEnvaseDto = {
      fk_suscriptor: this.recuperaIdSuscriptorLocalStorage(),
      id_envase: id_envase
    }
    this.envaseService.obtenerEnvase(this.obtenerEnvaseDto).subscribe({
      next: response => {
        this.activarFormularioEnvase = true;
        this.titleEnvasesInterface = 'Actualiza nombre envase';
        this.envaseFormulario.setValue({ nombre_envase: response.nombre_envase, id_envase: response.id_envase })
        this.valorBoton = 'Actualizar';
      },
      error: (error: HttpErrorResponse) => {
        this.alertService.showAlert(error.error.message, 'error');
      }
    });

  }


  mostrarFormularioEnvase() {
    this.activarFormularioEnvase = true;
    this.titleEnvasesInterface = "Agregar nuevo envase"
    this.valorBoton = 'Agregar'
  }

  ocultarFormularioEnvase() {
    this.activarFormularioEnvase = false;
    this.titleEnvasesInterface = "Lista de envases"
  }

  private recuperaIdSuscriptorLocalStorage(): number {
    const idSuscr = localStorage.getItem(SUSCRIPTOR_LOCAL_STORAGE_KEY_VENDING);
    return Number(idSuscr);
  }
}
