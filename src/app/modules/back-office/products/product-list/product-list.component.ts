import { Component } from '@angular/core';
import { actualizaProductoDto, agregarProductoDto, obtenProductoDto, productoDto } from './models/producto.interface';
import { ProductListService } from './product-list.service';
import { AlertService } from 'src/app/modules/shared/alert/alert.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
const SUSCRIPTOR_LOCAL_STORAGE_KEY_VENDING = 'suscriptorData';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  agregarProductoDto: agregarProductoDto = {};
  obtenerProductoDto: obtenProductoDto = {};
  actualizaProductoDto: actualizaProductoDto = {};
  tituloProductoInterface: String = 'Productos';
  botonAcciones: String = 'Agregar';
  activarFormularioProducto: boolean = false;
  id_suscriptor: number | undefined;
  productos: productoDto[] = [];

  constructor(private productoService: ProductListService, private alertService: AlertService) { }
  ngOnInit(): void {
    this.obtenerProductos();
  }

  productoFormulario = new FormGroup({
    id_producto: new FormControl(),
    nombre_producto: new FormControl('', [Validators.required]),
    codigo_producto: new FormControl('', [Validators.required]),
    url_imagen: new FormControl('', [Validators.required]),
    contenido_neto: new FormControl(0, [Validators.required]),
    fk_suscriptor: new FormControl(0, [Validators.required]),
    fk_categoria: new FormControl(0, [Validators.required]),
    fk_envase: new FormControl(0, [Validators.required]),
    fk_unidad_medida: new FormControl(0, [Validators.required]),
    fk_presentacion: new FormControl(0, [Validators.required]),
  })

  async obtenerProductos() {
    this.id_suscriptor = this.recuperaIdSuscriptorLocalStorage();
    this.productoService.obtenerProductos(this.id_suscriptor).subscribe({
      next: response => {
        this.productos = response;
      },
      error: (error: HttpErrorResponse) => {
        this.alertService.showAlert(error.error.message, 'error');
      }
    });
  }

  crearActualizarProducto() {
    if (this.productoFormulario.invalid) return;
    if (this.productoFormulario.value.id_producto == null) {
      this.agregarProductoDto = {
        fk_suscriptor: this.recuperaIdSuscriptorLocalStorage(),
        nombre_producto: this.productoFormulario.value.nombre_producto!,
        codigo_producto: this.productoFormulario.value.codigo_producto!,
        url_imagen: this.productoFormulario.value.url_imagen!,
        contenido_neto: this.productoFormulario.value.contenido_neto!,
        fk_categoria: this.productoFormulario.value.fk_categoria!,
        fk_envase: this.productoFormulario.value.fk_envase!,
        fk_unidad_medida: this.productoFormulario.value.fk_unidad_medida!,
        fk_presentacion: this.productoFormulario.value.fk_presentacion!,
      }
      this.productoService.crearProducto(this.agregarProductoDto).subscribe({
        next: response => {
          this.obtenerProductos();
          this.activarFormularioProducto = false;
          this.tituloProductoInterface = 'Productos';
          this.productoFormulario.reset();
          this.alertService.showAlert('El registro de agregó con exito');
        },
        error: (error: HttpErrorResponse) => { this.alertService.showAlert(error.error.message, 'error'); }
      })
    }
    else {
      this.actualizaProductoDto = {
        id_producto: this.productoFormulario.value.id_producto,
        fk_suscriptor: this.recuperaIdSuscriptorLocalStorage(),
        nombre_producto: this.productoFormulario.value.nombre_producto!,
        codigo_producto: this.productoFormulario.value.codigo_producto!,
        url_imagen: this.productoFormulario.value.url_imagen!,
        contenido_neto: this.productoFormulario.value.contenido_neto!,
        fk_categoria: this.productoFormulario.value.fk_categoria!,
        fk_envase: this.productoFormulario.value.fk_envase!,
        fk_unidad_medida: this.productoFormulario.value.fk_unidad_medida!,
        fk_presentacion: this.productoFormulario.value.fk_presentacion!,
      }
      this.actualizaProducto(this.actualizaProductoDto);
    }
  }

  actualizaProducto(actualizaProductoDto: actualizaProductoDto) {
    this.productoService.actualizaProducto(actualizaProductoDto).subscribe({
      next: response => {
        this.obtenerProductos();
        this.alertService.showAlert('El registro se actualizó de manera correcta.');
        this.activarFormularioProducto = false;
        this.productoFormulario.reset();
        this.tituloProductoInterface = 'Actualizar datos del producto';
      },
      error: (error: HttpErrorResponse) => {
        this.alertService.showAlert(error.error.message, 'error');
      }
    })
  }

  obtenerDetalleProducto(id_producto: number) {
    this.obtenerProductoDto = {
      fk_suscriptor: this.recuperaIdSuscriptorLocalStorage(),
      id_producto: id_producto
    }
    this.productoService.obtenerProducto(this.obtenerProductoDto).subscribe({
      next: response => {
        this.activarFormularioProducto = true;
        this.tituloProductoInterface = 'Actualizar producto';
        this.productoFormulario.setValue({
          id_producto: response.id_producto,
          fk_suscriptor: response.fk_suscriptor!,
          nombre_producto: response.nombre_producto!,
          codigo_producto: response.codigo_producto!,
          url_imagen: response.url_imagen!,
          contenido_neto: response.contenido_neto!,
          fk_categoria: response.fk_categoria!,
          fk_envase: response.fk_envase!,
          fk_unidad_medida: response.fk_unidad_medida!,
          fk_presentacion: response.fk_presentacion!,
        })
        this.botonAcciones = 'Actualizar';
      },
      error: (error: HttpErrorResponse) => {
        this.alertService.showAlert(error.error.message, 'error');
      }
    });
  }

  eliminaProducto(id_producto: number) {
    this.actualizaProductoDto = {
      fk_suscriptor: this.recuperaIdSuscriptorLocalStorage(),
      id_producto: id_producto
    }
    this.productoService.eliminaProducto(this.actualizaProductoDto).subscribe({
      next: () => {
        this.obtenerProductos();
        this.alertService.showAlert('El registro se actualizó de manera exitosa..');
      },
      error: (error: HttpErrorResponse) => {
        this.alertService.showAlert(error.error.message, 'error');
      }
    })
  }

  private recuperaIdSuscriptorLocalStorage(): number {
    const idSuscr = localStorage.getItem(SUSCRIPTOR_LOCAL_STORAGE_KEY_VENDING);
    return Number(idSuscr);
  }
}
