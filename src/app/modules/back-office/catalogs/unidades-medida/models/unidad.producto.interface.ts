export interface unidadMedidProductoDto {
    id_unidad: number;
    fk_suscriptor: number;
    nombre_unidad: string;
    siglas_unidad: string;
    estatus: number;
    fecha_alta: Date;
    fecha_baja: Date;
}

export interface agregarUnidadMedidProductoDto {
    fk_suscriptor?: number;
    nombre_unidad?: string;
    siglas_unidad?: string;
}

export interface obtenUnidadMedidProductoDto {
    fk_suscriptor?: number;
    id_unidad?: number;
}

export interface actualizaunidadMedidProductoDto{
    id_unidad?: number;
    fk_suscriptor?: number;
    nombre_envase?: string;
    siglas_unidad?: string;
}