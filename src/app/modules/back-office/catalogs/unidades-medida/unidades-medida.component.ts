import { Component } from '@angular/core';
import { actualizaunidadMedidProductoDto, agregarUnidadMedidProductoDto, obtenUnidadMedidProductoDto, unidadMedidProductoDto } from './models/unidad.producto.interface';
import { UnidadesMedidaService } from './unidades-medida.service';
import { AlertService } from 'src/app/modules/shared/alert/alert.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
const SUSCRIPTOR_LOCAL_STORAGE_KEY_VENDING = 'suscriptorData';

@Component({
  selector: 'app-unidades-medida',
  templateUrl: './unidades-medida.component.html',
  styleUrls: ['./unidades-medida.component.css']
})
export class UnidadesMedidaComponent {
  agregarUnidadDto: agregarUnidadMedidProductoDto = {};
  obtenerUnidadDto: obtenUnidadMedidProductoDto = {};
  actualizaUnidadDto: actualizaunidadMedidProductoDto = {};
  titleUnidadInterface: String = 'Unidades de medida para productos';
  valorBoton: String = 'Agregar';
  activarFormularioUnidadMedida: boolean = false;
  id_suscriptor: number | undefined;
  unidadesMedida: unidadMedidProductoDto[] = [];

  constructor(private unidadService: UnidadesMedidaService, private alertService: AlertService) { }
  ngOnInit(): void{
    this.obtenerUnidades();
  }

  unidadMedidaFormulario = new FormGroup({
    nombre_unidad: new FormControl('', [Validators.required, Validators.minLength(3)]),
    siglas_unidad: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    id_unidad_medida: new FormControl()
  });

  async obtenerUnidades() {
    this.id_suscriptor = this.recuperaIdSuscriptorLocalStorage();
    this.unidadService.obtenerUnidades(this.id_suscriptor).subscribe({
      next: response => {
        this.unidadesMedida = response;
      },
      error: (error: HttpErrorResponse) => {
        this.alertService.showAlert(error.error.message, 'error');
      }
    });
  }

  crearActualizarUnidadMedida() {
    if (this.unidadMedidaFormulario.invalid) return;
    if (this.unidadMedidaFormulario.value.id_unidad_medida == null) {
      this.agregarUnidadDto = {
        fk_suscriptor: this.recuperaIdSuscriptorLocalStorage(),
        nombre_unidad: this.unidadMedidaFormulario.value.nombre_unidad!,
        siglas_unidad: this.unidadMedidaFormulario.value.siglas_unidad!
      }
      this.unidadService.crearUnidad(this.agregarUnidadDto).subscribe({
        next: response => {
          this.obtenerUnidades();
          this.activarFormularioUnidadMedida = false;
          this.titleUnidadInterface = 'Unidades de medida para productos';
          this.unidadMedidaFormulario.reset();
          this.alertService.showAlert('El envase se agrego con exito');
        },
        error: (error: HttpErrorResponse) => { this.alertService.showAlert(error.error.message, 'error'); }
      })
    }
    else {
      this.actualizaUnidadDto = {
        fk_suscriptor: this.recuperaIdSuscriptorLocalStorage(),
        id_unidad: this.unidadMedidaFormulario.value.id_unidad_medida,
        nombre_envase: this.unidadMedidaFormulario.value.nombre_unidad!,
        siglas_unidad: this.unidadMedidaFormulario.value.siglas_unidad!,
      }
      this.actualizaUnidadMedida(this.actualizaUnidadDto);
    }
  }

  actualizaUnidadMedida(actualizaEnvaseDto: actualizaunidadMedidProductoDto) {
    this.unidadService.actualizaUnidadMedida(actualizaEnvaseDto).subscribe({
      next: response => {
        this.obtenerUnidades();
        this.alertService.showAlert('El registro se actualizo de manera correcta.');
        this.activarFormularioUnidadMedida = false;
        this.unidadMedidaFormulario.reset();
        this.titleUnidadInterface = '';
      },
      error: (error: HttpErrorResponse) => {
        this.alertService.showAlert(error.error.message, 'error');
      }
    })
  }

  obtenerDetalleUnidadMedida(id_unidad: number) {
    this.obtenerUnidadDto = {
      fk_suscriptor: this.recuperaIdSuscriptorLocalStorage(),
      id_unidad: id_unidad
    }
    this.unidadService.obtenerUnidad(this.obtenerUnidadDto).subscribe({
      next: response => {
        this.activarFormularioUnidadMedida = true;
        this.titleUnidadInterface = 'Actualizar datos los datos';
        this.unidadMedidaFormulario.setValue({ nombre_unidad: response.nombre_unidad, id_unidad_medida: response.id_unidad, siglas_unidad:response.siglas_unidad })
        this.valorBoton = 'Actualizar';
      },
      error: (error: HttpErrorResponse) => {
        this.alertService.showAlert(error.error.message, 'error');
      }
    });
  }

  eliminaUnidadMedida(id_unidad: number){
    this.actualizaUnidadDto = {
      fk_suscriptor:this.recuperaIdSuscriptorLocalStorage(),
      id_unidad:id_unidad
    }
    this.unidadService.eliminaUnidadMedida(this.actualizaUnidadDto).subscribe({
      next: ()=> {
        this.obtenerUnidades();
        this.alertService.showAlert('La unidad de medida se actualizo de manera correcta.');
      },
      error: (error: HttpErrorResponse) => {
        this.alertService.showAlert(error.error.message, 'error');
      }
    })
  }

  mostrarFormularioUnidad() {
    this.unidadMedidaFormulario.reset();
    this.activarFormularioUnidadMedida = true;
    this.titleUnidadInterface = "Agregar nueva unidad de medida"
    this.valorBoton = 'Agregar'
  }

  ocultarFormularioUnidad() {
    this.activarFormularioUnidadMedida = false;
    this.titleUnidadInterface = "Unidades de medida"
    this.unidadMedidaFormulario.reset();
  }

  private recuperaIdSuscriptorLocalStorage(): number {
    const idSuscr = localStorage.getItem(SUSCRIPTOR_LOCAL_STORAGE_KEY_VENDING);
    return Number(idSuscr);
  }

}
