import { Component } from '@angular/core';
import { actualizaPrecioProveedorDto, agregarPrecioProveedorDto, obtenPrecioProveedorDto, precioProveedorDto } from './models/precio-proveedor.interface';
import { PrecioProductoService } from '../services/precio-producto.service';
import { AlertService } from 'src/app/modules/shared/components/alert/alert.service';
import { group } from '@angular/animations';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductListService } from '../services/product.service';
const SUSCRIPTOR_LOCAL_STORAGE_KEY_VENDING = 'suscriptorData';

@Component({
  selector: 'app-precio-proveedor',
  templateUrl: './precio-proveedor.component.html',
  styleUrls: ['./precio-proveedor.component.css']
})
export class PrecioProveedorComponent {
  agregarPrecioProveedor: agregarPrecioProveedorDto = {};
  obtenerPrecioProveedor: obtenPrecioProveedorDto = {};
  actualizarPrecioProveedor: actualizaPrecioProveedorDto = {};
  tituloInterface: String = 'Precio producto';
  valorBoton: String = 'Agregar';
  activarFormularioPrecioProveedor: boolean = false;
  id_suscriptor: number | undefined;
  preciosProductos: precioProveedorDto[] = [];
  

  constructor(private precioProductoService: PrecioProductoService, private alertService: AlertService,
      private productoService: ProductListService) { }
  ngOnInit(): void {
    this.obtenerPrecios();
  }

  precioProveedorFormulario = new FormGroup({
    id_rel_precio_producto: new FormControl(),
    fk_suscriptor: new FormControl(0, [Validators.required]),
    fk_producto: new FormControl(0, [Validators.required]),
    fk_proveedor: new FormControl(0, [Validators.required]),
    fk_unidad_compra: new FormControl(0, [Validators.required]),
    piezas_unidad_compra: new FormControl(''),
    costo_unidad_compra: new FormControl(''),
    costo_pieza: new FormControl(0),
    fecha_ultima_actualizacion: new FormControl(new Date),
  });

  async obtenerPrecios() {
    this.id_suscriptor = this.recuperaIdSuscriptorLocalStorage();
    this.precioProductoService.obtenerRelacionesPrecioProducto(this.id_suscriptor).subscribe({
      next: response => {
        console.log('Precios', response);
        this.preciosProductos = response;
      },
      error: (error: HttpErrorResponse) => {
        this.alertService.showAlert(error.error.message, 'error');
      }
    });
  }

  crearActualizarPrecioProducto() {
    //if (this.productoFormulario.invalid) return;
    if (this.precioProveedorFormulario.value.id_rel_precio_producto == null) {
      this.agregarPrecioProveedor = {
        fk_suscriptor: this.precioProveedorFormulario.value.fk_suscriptor!,
        fk_producto: this.precioProveedorFormulario.value.fk_producto!,
        fk_proveedor: this.precioProveedorFormulario.value.fk_proveedor!,
        fk_unidad_compra: this.precioProveedorFormulario.value.fk_unidad_compra!,
        piezas_unidad_compra: this.precioProveedorFormulario.value.piezas_unidad_compra!,
        costo_unidad_compra: this.precioProveedorFormulario.value.costo_unidad_compra!,
        costo_pieza: this.precioProveedorFormulario.value.costo_pieza!,
        fecha_ultima_actualizacion: this.precioProveedorFormulario.value.fecha_ultima_actualizacion!,
      }

      this.precioProductoService.crearRelacionPrecioProducto(this.agregarPrecioProveedor).subscribe({
        next: response => {
          this.obtenerPrecios();
          this.activarFormularioPrecioProveedor = false;
          this.tituloInterface = 'Productos';
          this.precioProveedorFormulario.reset();
          this.alertService.showAlert('El registro de agregó con exito');
        },
        error: (error: HttpErrorResponse) => { this.alertService.showAlert(error.error.message, 'error'); }
      })
    }
    else {
      this.actualizarPrecioProveedor = {
        id_rel_precio_producto: this.precioProveedorFormulario.value.id_rel_precio_producto!,
        fk_suscriptor: this.precioProveedorFormulario.value.fk_suscriptor!,
        fk_producto: this.precioProveedorFormulario.value.fk_producto!,
        fk_proveedor: this.precioProveedorFormulario.value.fk_proveedor!,
        fk_unidad_compra: this.precioProveedorFormulario.value.fk_unidad_compra!,
        piezas_unidad_compra: this.precioProveedorFormulario.value.piezas_unidad_compra!,
        costo_unidad_compra: this.precioProveedorFormulario.value.costo_unidad_compra!,
        costo_pieza: this.precioProveedorFormulario.value.costo_pieza!,
        fecha_ultima_actualizacion: this.precioProveedorFormulario.value.fecha_ultima_actualizacion!,
      }
      this.actualizaPrecioProducto(this.actualizarPrecioProveedor);
    }
  }

  actualizaPrecioProducto(actualizaPrecioProveedorDto: actualizaPrecioProveedorDto) {
    this.precioProductoService.actualizaRelacionPrecioProducto(actualizaPrecioProveedorDto).subscribe({
      next: response => {
        this.obtenerPrecios();
        this.alertService.showAlert('El registro se actualizó de manera correcta.');
        this.activarFormularioPrecioProveedor = false;
        this.precioProveedorFormulario.reset();
        this.tituloInterface = 'Actualizar datos del producto';
      },
      error: (error: HttpErrorResponse) => {
        this.alertService.showAlert(error.error.message, 'error');
      }
    })
  }

  obtenerDetalleProducto(id_precioProducto: number) {
    this.obtenerPrecioProveedor = {
      fk_suscriptor: this.recuperaIdSuscriptorLocalStorage(),
      id_rel_precio_producto: id_precioProducto
    }
    this.precioProductoService.obtenerRelacionPrecioProducto(this.obtenerPrecioProveedor).subscribe({
      next: response => {
        this.activarFormularioPrecioProveedor = true;
        this.tituloInterface = 'Actualizar producto';
        this.precioProveedorFormulario.setValue({
          id_rel_precio_producto: this.precioProveedorFormulario.value.id_rel_precio_producto!,
          fk_suscriptor: this.precioProveedorFormulario.value.fk_suscriptor!,
          fk_producto: this.precioProveedorFormulario.value.fk_producto!,
          fk_proveedor: this.precioProveedorFormulario.value.fk_proveedor!,
          fk_unidad_compra: this.precioProveedorFormulario.value.fk_unidad_compra!,
          piezas_unidad_compra: this.precioProveedorFormulario.value.piezas_unidad_compra!,
          costo_unidad_compra: this.precioProveedorFormulario.value.costo_unidad_compra!,
          costo_pieza: this.precioProveedorFormulario.value.costo_pieza!,
          fecha_ultima_actualizacion: this.precioProveedorFormulario.value.fecha_ultima_actualizacion!,
        })
        this.valorBoton = 'Actualizar';
      },
      error: (error: HttpErrorResponse) => {
        this.alertService.showAlert(error.error.message, 'error');
      }
    });
  }

  eliminaPrecioProducto(id_precioProducto: number) {
    this.actualizarPrecioProveedor = {
      fk_suscriptor: this.recuperaIdSuscriptorLocalStorage(),
      id_rel_precio_producto: id_precioProducto
    }
    this.precioProductoService.eliminaRelacionPrecioProducto(this.actualizarPrecioProveedor).subscribe({
      next: () => {
        this.obtenerPrecios();
        this.alertService.showAlert('El registro se actualizó de manera exitosa..');
      },
      error: (error: HttpErrorResponse) => {
        this.alertService.showAlert(error.error.message, 'error');
      }
    })
  }

  mostrarFormularioPrecioProducto() {
    this.precioProveedorFormulario.reset();
    this.activarFormularioPrecioProveedor = true;
    this.tituloInterface = "Agregar nuevo producto."
    this.valorBoton = 'Agregar'

  }

  ocultarFormularioPrecioProducto() {
    this.activarFormularioPrecioProveedor = false;
    this.tituloInterface = "Productos"
    this.precioProveedorFormulario.reset();
  }

  private recuperaIdSuscriptorLocalStorage(): number {
    const idSuscr = localStorage.getItem(SUSCRIPTOR_LOCAL_STORAGE_KEY_VENDING);
    return Number(idSuscr);
  }

}
