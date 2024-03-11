import { Component } from '@angular/core';
import { actualizaProductoDto, agregarProductoDto, obtenProductoDto, productoDto } from './models/producto.interface';
import { ProductListService } from './product-list.service';
import { AlertService } from 'src/app/modules/shared/alert/alert.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { category } from '../../catalogs/categories/models/category.interface';
import { CategoriesService } from '../../catalogs/categories/categories.service';
import { PresentacionesProductoService } from '../../catalogs/presentaciones-producto/presentaciones-producto.service';
import { presentacionProductoDto } from '../../catalogs/presentaciones-producto/models/presentacion.producto.interface';
import { unidadMedidProductoDto } from '../../catalogs/unidades-medida/models/unidad.producto.interface';
import { UnidadesMedidaService } from '../../catalogs/unidades-medida/unidades-medida.service';
import { envaseDto } from '../../catalogs/envases/models/envase.interface';
import { EnvasesService } from '../../catalogs/envases/envases.service';
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
  categorias: category[] = [];
  presentaciones: presentacionProductoDto[] = [];
  unidadesMedida: unidadMedidProductoDto[] = [];
  envases: envaseDto[] = [];

  constructor(private productoService: ProductListService,
    private categoriesService: CategoriesService,
    private presentacionesService: PresentacionesProductoService,
    private unidadService: UnidadesMedidaService,
    private envaseService: EnvasesService,
    private alertService: AlertService) { }
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
    console.log(this.productoFormulario.value.fk_categoria)
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

    this.obtenerCategorias();
    this.obtenerEnvases();
    this.obtenerPresentaciones();
    this.obtenerUnidades();
    this.obtenerProductoDto = {
      fk_suscriptor: this.recuperaIdSuscriptorLocalStorage(),
      id_producto: id_producto
    }
    this.productoService.obtenerProducto(this.obtenerProductoDto).subscribe({
      next: response => {
        console.log("response: ", response);
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


  obtenerCategorias(): void {
    let id_suscriptor: number = this.recuperaIdSuscriptorLocalStorage();
    this.categoriesService.getAllCategories(id_suscriptor).subscribe(
      (response => {
        this.categorias = response
      }),
      (error => { })
    );
  }

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

  async obtenerEnvases() {
    this.id_suscriptor = this.recuperaIdSuscriptorLocalStorage();
    this.envaseService.obtenerEnvases(this.id_suscriptor).subscribe({
      next: response => {
        this.envases = response;
        console.log("this.envases: ", this.envases);
      },
      error: (error: HttpErrorResponse) => {
        this.alertService.showAlert(error.error.message, 'error');
      }
    });
  }

  mostrarFormularioProducto() {
    this.obtenerCategorias();
    this.obtenerEnvases();
    this.obtenerPresentaciones();
    this.obtenerUnidades();
    this.productoFormulario.reset();
    this.activarFormularioProducto = true;
    this.tituloProductoInterface = "Agregar nuevo producto."
    this.botonAcciones = 'Agregar'

  }

  ocultarFormularioProducto() {
    this.activarFormularioProducto = false;
    this.tituloProductoInterface = "Productos"
    this.productoFormulario.reset();
  }

  private recuperaIdSuscriptorLocalStorage(): number {
    const idSuscr = localStorage.getItem(SUSCRIPTOR_LOCAL_STORAGE_KEY_VENDING);
    return Number(idSuscr);
  }
}
