export interface unidadCompraDto {
    id_unidad_compra: number;
    fk_suscriptor: number;
    nombre_unidad_compra: string;
    estatus: number;
    fecha_alta: Date;
    fecha_baja: Date;
}

export interface agregarUnidadCompraDto {
    fk_suscriptor?: number;
    nombre_unidad_compra?: string;
}

export interface obtenUnidadCompraDto {
    fk_suscriptor?: number;
    id_unidad_compra?: number;
}

export interface actualizaunidadCompraDto{
    id_unidad_compra?: number;
    fk_suscriptor?: number;
    nombre_unidad_compra?: string;
}