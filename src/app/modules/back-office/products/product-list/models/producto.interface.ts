export interface productoDto extends agregarProductoDto {
    estatus: number;
    fecha_alta: Date;
    fecha_baja: Date;
}

export interface agregarProductoDto {
    url_imagen: string;
    contenido_neto: number;
    fk_suscriptor: number;
    fk_categoria: number;
    fk_envase: number;
    fk_unidad_medida: number;
    fk_presentacion: number;
}

export interface obtenProductoDto {
    fk_suscriptor?: number;
    id_producto?: number;
}

export interface actualizaProductoDto extends agregarProductoDto {
    id_producto: number;
}