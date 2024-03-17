import { Component } from '@angular/core';
import { actualizaPresentacionProductoDto, agregarPresentacionProductoDto, obtenPresentacionProductoDto, presentacionProductoDto } from './models/presentacion.producto.interface';
import { PresentacionesProductoService } from './presentaciones-producto.service';
import { AlertService } from 'src/app/modules/shared/components/alert/alert.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
const SUSCRIPTOR_LOCAL_STORAGE_KEY_VENDING = 'suscriptorData';

@Component({
  selector: 'app-presentaciones-producto',
  templateUrl: './presentaciones-producto.component.html',
  styleUrls: ['./presentaciones-producto.component.css']
})
export class PresentacionesProductoComponent {
  agregarPresentacionDto: agregarPresentacionProductoDto = {};
  obtenerPresentacionDto: obtenPresentacionProductoDto = {};
  actualizaPresentacionDto: actualizaPresentacionProductoDto = {};
  tituloPresentacionesProducto: String = 'Presentaciones Productos';
  botonAcciones: String = 'Agregar';
  activarFormularioPresentaciones: boolean = false;
  id_suscriptor: number | undefined;
  presentaciones: presentacionProductoDto[] = [];

  constructor(private presentacionesService: PresentacionesProductoService, private alertService: AlertService) { }
  ngOnInit(): void {
    this.obtenerPresentaciones();
  }

  presentacionFormulario = new FormGroup({
    nombre_presentacion: new FormControl('', [Validators.required]),
    id_presentacion: new FormControl()
  });

  async obtenerPresentaciones() {
    this.id_suscriptor = this.recuperaIdSuscriptorLocalStorage();
    this.presentacionesService.obtenerPresentaciones(this.id_suscriptor).subscribe({
      next: response => {
        this.presentaciones = response;
      },
      error: (error: HttpErrorResponse) => {
        this.alertService.showAlert(error.error.message, 'error');
      }
    });
  }

  crearActualizarPresentacion() {
    if (this.presentacionFormulario.invalid) return;
    if (this.presentacionFormulario.value.id_presentacion == null) {
      this.agregarPresentacionDto = {
        fk_suscriptor: this.recuperaIdSuscriptorLocalStorage(),
        nombre_presentacion: this.presentacionFormulario.value.nombre_presentacion!
      }
      this.presentacionesService.crearPresentacion(this.agregarPresentacionDto).subscribe({
        next: response => {
          this.obtenerPresentaciones();
          this.activarFormularioPresentaciones = false;
          this.tituloPresentacionesProducto = 'Presentaciones Productos';
          this.presentacionFormulario.reset();
          this.alertService.showAlert('El registro de agregó con exito');
        },
        error: (error: HttpErrorResponse) => { this.alertService.showAlert(error.error.message, 'error'); }
      })
    }
    else {
      this.actualizaPresentacionDto = {
        fk_suscriptor: this.recuperaIdSuscriptorLocalStorage(),
        id_presentacion: this.presentacionFormulario.value.id_presentacion,
        nombre_presentacion: this.presentacionFormulario.value.nombre_presentacion!
      }
      this.actualizaPresentacion(this.actualizaPresentacionDto);
    }
  }

  actualizaPresentacion(actualizaPresentacionProductoDto: actualizaPresentacionProductoDto) {
    this.presentacionesService.actualizaPresentacion(actualizaPresentacionProductoDto).subscribe({
      next: response => {
        this.obtenerPresentaciones();
        this.alertService.showAlert('El registro se actualizó de manera correcta.');
        this.activarFormularioPresentaciones = false;
        this.presentacionFormulario.reset();
        this.tituloPresentacionesProducto = 'Actualizar presentación';
      },
      error: (error: HttpErrorResponse) => {
        this.alertService.showAlert(error.error.message, 'error');
      }
    })
  }

  obtenerDetallePresentacion(id_presentacion: number) {
    this.obtenerPresentacionDto = {
      fk_suscriptor: this.recuperaIdSuscriptorLocalStorage(),
      id_presentacion: id_presentacion
    }
    this.presentacionesService.obtenerPresentacion(this.obtenerPresentacionDto).subscribe({
      next: response => {
        this.activarFormularioPresentaciones = true;
        this.tituloPresentacionesProducto = 'Actualizar registro';
        this.presentacionFormulario.setValue({ nombre_presentacion: response.nombre_presentacion, id_presentacion: response.id_presentacion })
        this.botonAcciones = 'Actualizar';
      },
      error: (error: HttpErrorResponse) => {
        this.alertService.showAlert(error.error.message, 'error');
      }
    });
  }

  eliminaPresentacion(id_presentacion: number) {
    this.actualizaPresentacionDto = {
      fk_suscriptor: this.recuperaIdSuscriptorLocalStorage(),
      id_presentacion: id_presentacion
    }
    this.presentacionesService.eliminaPresentacion(this.actualizaPresentacionDto).subscribe({
      next: () => {
        this.obtenerPresentaciones();
        this.alertService.showAlert('El registro se actualizó de manera exitosa..');
      },
      error: (error: HttpErrorResponse) => {
        this.alertService.showAlert(error.error.message, 'error');
      }
    })
  }

  mostrarFormularioPresentacion() {
    this.presentacionFormulario.reset();
    this.activarFormularioPresentaciones = true;
    this.tituloPresentacionesProducto= "Agregar nuevo registro."
    this.botonAcciones = 'Agregar'
  }

  ocultarFormularioPresentacion() {
    this.activarFormularioPresentaciones = false;
    this.tituloPresentacionesProducto = "Presentaciones Producto"
    this.presentacionFormulario.reset();
  }

  private recuperaIdSuscriptorLocalStorage(): number {
    const idSuscr = localStorage.getItem(SUSCRIPTOR_LOCAL_STORAGE_KEY_VENDING);
    return Number(idSuscr);
  }

}
