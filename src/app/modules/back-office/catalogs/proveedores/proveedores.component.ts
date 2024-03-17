import { Component } from '@angular/core';
import { actualizaProveedorDto, agregarProveedorDto, obtenDetalleProveedorDto, proveedorDto } from './models/proveedores.interface';
import { ProveedoresService } from './proveedores.service';
import { AlertService } from 'src/app/modules/shared/components/alert/alert.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
const SUSCRIPTOR_LOCAL_STORAGE_KEY_VENDING = 'suscriptorData';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent {
  agregarProveedorDto: agregarProveedorDto = {};
  obtenerProveedorDto: obtenDetalleProveedorDto = {};
  actualizaProveedorDto: actualizaProveedorDto = {};
  titleProveedorInterface: String = 'Proveedores';
  valorBoton: String = 'Agregar';
  activarFormularioProveedor: boolean = false;
  id_suscriptor: number | undefined;
  proveedores: proveedorDto[] = [];

  constructor(private proveedorService: ProveedoresService, private alertService: AlertService) { }
  ngOnInit(): void { 
    this.obtenerProveedores();
  }

  proveedorFormulario = new FormGroup({
    nombre_proveedor: new FormControl('', [Validators.required, ]),
    url_imagen:new FormControl(),
    id_proveedor:new FormControl()
  })

  async obtenerProveedores() {
    this.id_suscriptor = this.recuperaIdSuscriptorLocalStorage();
    this.proveedorService.obtenerProveedores(this.id_suscriptor).subscribe({
      next: response => {
        this.proveedores = response;
      },
      error: (error: HttpErrorResponse) => {
        this.alertService.showAlert(error.error.message, 'error');
      }
    });
  }

  crearActualizarProveedor() {
    if (this.proveedorFormulario.invalid) return;
    if (this.proveedorFormulario.value.id_proveedor == null) {
      this.agregarProveedorDto = {
        fk_suscriptor: this.recuperaIdSuscriptorLocalStorage(),
        nombre_proveedor: this.proveedorFormulario.value.nombre_proveedor!,
        url_imagen: this.proveedorFormulario.value.url_imagen!
      }
      this.proveedorService.crearProveedor(this.agregarProveedorDto).subscribe({
        next: response => {
          this.obtenerProveedores();
          this.activarFormularioProveedor = false;
          this.titleProveedorInterface = 'Proveedores';
          this.proveedorFormulario.reset();
          this.alertService.showAlert('El proveedor se agrego con exito');
        },
        error: (error: HttpErrorResponse) => { this.alertService.showAlert(error.error.message, 'error'); }
      })
    }
    else {
      this.actualizaProveedorDto = {
        fk_suscriptor: this.recuperaIdSuscriptorLocalStorage(),
        id_proveedor: this.proveedorFormulario.value.id_proveedor,
        nombre_proveedor: this.proveedorFormulario.value.nombre_proveedor!,
        url_imagen:this.proveedorFormulario.value.url_imagen

      }
      this.actualizaProveedor(this.actualizaProveedorDto);
    }
  }

  actualizaProveedor(actualizaProveedorDto: actualizaProveedorDto) {
    this.proveedorService.actualizaProveedor(actualizaProveedorDto).subscribe({
      next: response => {
        this.obtenerProveedores();
        this.alertService.showAlert('El proveedor se actualizo de manera correcta.');
        this.activarFormularioProveedor = false;
        this.proveedorFormulario.reset();
        this.titleProveedorInterface = 'Proveedores';
      },
      error: (error: HttpErrorResponse) => {
        this.alertService.showAlert(error.error.message, 'error');
      }
    })
  }

  obtenerDetalleProveedor(id_proveedor: number) {
    this.obtenerProveedorDto = {
      fk_suscriptor: this.recuperaIdSuscriptorLocalStorage(),
      id_proveedor: id_proveedor
    }
    this.proveedorService.obtenerProveedor(this.obtenerProveedorDto).subscribe({
      next: response => {
        this.activarFormularioProveedor = true;
        this.titleProveedorInterface = 'Actualiza datos del proveedor';
        this.proveedorFormulario.setValue({ nombre_proveedor: response.nombre_proveedor, id_proveedor: response.id_proveedor, url_imagen:response.url_imagen })
        this.valorBoton = 'Actualizar';
      },
      error: (error: HttpErrorResponse) => {
        this.alertService.showAlert(error.error.message, 'error');
      }
    });

  }

  eliminProveedor(id_proveedor: number){
    this.actualizaProveedorDto = {
      fk_suscriptor:this.recuperaIdSuscriptorLocalStorage(),
      id_proveedor:id_proveedor
    }
    this.proveedorService.eliminaProveedor(this.actualizaProveedorDto).subscribe({
      next: ()=> {
        this.obtenerProveedores();
        this.alertService.showAlert('El proveedor se eliminó de forma existosa.');
      },
      error: (error: HttpErrorResponse) => {
        this.alertService.showAlert(error.error.message, 'error');
      }
    })
  }

  mostrarFormularioProveedor() {
    this.proveedorFormulario.reset();
    this.activarFormularioProveedor = true;
    this.titleProveedorInterface = "Agregar nuevo proveedor"
    this.valorBoton = 'Agregar'
  }

  ocultarFormularioProveedor() {
    this.activarFormularioProveedor = false;
    this.titleProveedorInterface = "Proveedores"
    this.proveedorFormulario.reset();
  }

  private recuperaIdSuscriptorLocalStorage(): number {
    const idSuscr = localStorage.getItem(SUSCRIPTOR_LOCAL_STORAGE_KEY_VENDING);
    return Number(idSuscr);
  }
}
