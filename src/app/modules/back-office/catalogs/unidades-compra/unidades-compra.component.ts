import { Component } from '@angular/core';
import { actualizaunidadCompraDto, agregarUnidadCompraDto, obtenUnidadCompraDto, unidadCompraDto } from './models/unidad.compra.interface';
import { UnidadesCompraService } from './unidades-compra.service';
import { AlertService } from 'src/app/modules/shared/components/alert/alert.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
const SUSCRIPTOR_LOCAL_STORAGE_KEY_VENDING = 'suscriptorData';

@Component({
  selector: 'app-unidades-compra',
  templateUrl: './unidades-compra.component.html',
  styleUrls: ['./unidades-compra.component.css']
})
export class UnidadesCompraComponent {
  agregarUnidadCompraDto: agregarUnidadCompraDto = {};
  obtenerUnidadCompraDto: obtenUnidadCompraDto = {};
  actualizaUnidadCompraDto: actualizaunidadCompraDto = {};
  tituloInterface: String = 'Unidades de compra';
  valorBoton: String = 'Agregar';
  activarFormularioUnidadCompra: boolean = false;
  id_suscriptor: number | undefined;
  unidadesCompra: unidadCompraDto[] = [];

  constructor(private unidadCompraService: UnidadesCompraService, private alertService: AlertService) { }
  ngOnInit(): void { }

  unidadMedidaCompraFormulario = new FormGroup({
    nombre_unidad_compra: new FormControl('', [Validators.required]),
    id_unidad_compra: new FormControl()
  });

  async obtenerUnidades() {
    this.id_suscriptor = this.recuperaIdSuscriptorLocalStorage();
    this.unidadCompraService.obtenerUnidadesCompra(this.id_suscriptor).subscribe({
      next: response => {
        this.unidadesCompra = response;
      },
      error: (error: HttpErrorResponse) => {
        this.alertService.showAlert(error.error.message, 'error');
      }
    });
  }

  crearActualizarUnidadMedida() {
    if (this.unidadMedidaCompraFormulario.invalid) return;
    if (this.unidadMedidaCompraFormulario.value.id_unidad_compra == null) {
      this.agregarUnidadCompraDto = {
        fk_suscriptor: this.recuperaIdSuscriptorLocalStorage(),
        nombre_unidad: this.unidadMedidaCompraFormulario.value.nombre_unidad_compra!,
      }
      this.unidadCompraService.crearUnidadCompra(this.agregarUnidadCompraDto).subscribe({
        next: response => {
          this.obtenerUnidades();
          this.activarFormularioUnidadCompra = false;
          this.tituloInterface = 'Unidades de Compra';
          this.unidadMedidaCompraFormulario.reset();
          this.alertService.showAlert('El registro de agregó con exito');
        },
        error: (error: HttpErrorResponse) => { this.alertService.showAlert(error.error.message, 'error'); }
      })
    }
    else {
      this.actualizaUnidadCompraDto = {
        fk_suscriptor: this.recuperaIdSuscriptorLocalStorage(),
        id_unidad: this.unidadMedidaCompraFormulario.value.id_unidad_compra,
        nombre_unidad: this.unidadMedidaCompraFormulario.value.nombre_unidad_compra!
      }
      this.actualizaUnidadMedida(this.actualizaUnidadCompraDto);
    }
  }

  actualizaUnidadMedida(actualizaUnidad: actualizaunidadCompraDto) {
    this.unidadCompraService.actualizaUnidadCompra(actualizaUnidad).subscribe({
      next: response => {
        this.obtenerUnidades();
        this.alertService.showAlert('El registro se actualizó de manera correcta.');
        this.activarFormularioUnidadCompra = false;
        this.unidadMedidaCompraFormulario.reset();
        this.tituloInterface = '';
      },
      error: (error: HttpErrorResponse) => {
        this.alertService.showAlert(error.error.message, 'error');
      }
    })
  }

  obtenerDetalleUnidadMedida(id_unidad: number) {
    this.obtenerUnidadCompraDto = {
      fk_suscriptor: this.recuperaIdSuscriptorLocalStorage(),
      id_unidad: id_unidad
    }
    this.unidadCompraService.obtenerUnidadCompra(this.obtenerUnidadCompraDto).subscribe({
      next: response => {
        this.activarFormularioUnidadCompra = true;
        this.tituloInterface = 'Actualizar registro';
        this.unidadMedidaCompraFormulario.setValue({ nombre_unidad_compra: response.nombre_unidad_compra, id_unidad_compra: response.id_unidad_compra})
        this.valorBoton = 'Actualizar';
      },
      error: (error: HttpErrorResponse) => {
        this.alertService.showAlert(error.error.message, 'error');
      }
    });
  }

  eliminaUnidadMedida(id_unidad: number){
    this.actualizaUnidadCompraDto = {
      fk_suscriptor:this.recuperaIdSuscriptorLocalStorage(),
      id_unidad:id_unidad
    }
    this.unidadCompraService.eliminaUnidadMedida(this.actualizaUnidadCompraDto).subscribe({
      next: ()=> {
        this.obtenerUnidades();
        this.alertService.showAlert('El registro se actualizó de manera exitosa..');
      },
      error: (error: HttpErrorResponse) => {
        this.alertService.showAlert(error.error.message, 'error');
      }
    })
  }

  mostrarFormularioUnidad() {
    this.unidadMedidaCompraFormulario.reset();
    this.activarFormularioUnidadCompra = true;
    this.tituloInterface = "Agregar nuevo registro."
    this.valorBoton = 'Agregar'
  }

  ocultarFormularioUnidad() {
    this.activarFormularioUnidadCompra = false;
    this.tituloInterface = "Unidades de medida"
    this.unidadMedidaCompraFormulario.reset();
  }

  private recuperaIdSuscriptorLocalStorage(): number {
    const idSuscr = localStorage.getItem(SUSCRIPTOR_LOCAL_STORAGE_KEY_VENDING);
    return Number(idSuscr);
  }

}
