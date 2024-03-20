export interface precioProveedorDto {
    id_rel_precio_producto: number;
    fk_suscriptor: number;
    fk_producto: number;
    fk_proveedor: number;
    fk_unidad_compra: number;
    piezas_unidad_compra: string;
    costo_unidad_compra: string;
    costo_pieza: number;
    fecha_ultima_actualizacion: Date;
    estatus: number;
    fecha_alta: Date;
    fecha_baja: Date;
}

export interface agregarPrecioProveedorDto {
    fk_suscriptor?: number;
    fk_producto?: number;
    fk_proveedor?: number;
    fk_unidad_compra?: number;
    piezas_unidad_compra?: string;
    costo_unidad_compra?: string;
    costo_pieza?: number;
    fecha_ultima_actualizacion?: Date;
}

export interface obtenPrecioProveedorDto {
    fk_suscriptor?: number;
    id_rel_precio_producto?: number;
}

export interface actualizaPrecioProveedorDto {
    id_rel_precio_producto?: number;
    fk_suscriptor?: number;
    fk_producto?: number;
    fk_proveedor?: number;
    fk_unidad_compra?: number;
    piezas_unidad_compra?: string;
    costo_unidad_compra?: string;
    costo_pieza?: number;
    fecha_ultima_actualizacion?: Date;
}