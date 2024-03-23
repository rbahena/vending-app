import { category } from "../../../catalogs/categories/models/category.interface";
import { envaseDto } from "../../../catalogs/envases/models/envase.interface";
import { presentacionProductoDto } from "../../../catalogs/presentaciones-producto/models/presentacion.producto.interface";
import { unidadMedidProductoDto } from "../../../catalogs/unidades-medida/models/unidad.producto.interface";

export interface productoDto extends agregarProductoDto {
    id_producto:number;
    estatus: number;
    fecha_alta: Date;
    fecha_baja: Date;
}

export interface agregarProductoDto {
    nombre_producto?: string;
    codigo_producto?: string;
    url_imagen?: string;
    contenido_neto?: number;
    fk_suscriptor?: number;
    fk_categoria?: number;
    fk_envase?: number;
    fk_unidad_medida?: number;
    fk_presentacion?: number;
    presentaciones?:presentacionProductoDto;
    envases?:envaseDto;
    unidadesMedida?:unidadMedidProductoDto;
    categorias?:category;

}

export interface obtenProductoDto {
    fk_suscriptor?: number;
    id_producto?: number;
}

export interface actualizaProductoDto extends agregarProductoDto {
    id_producto?: number;
}