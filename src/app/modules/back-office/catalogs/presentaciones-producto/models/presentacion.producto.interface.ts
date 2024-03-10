export interface presentacionProductoDto {
    id_presentacion: number;
    fk_suscriptor: number;
    nombre_presentacion: string;
    estatus: number;
    fecha_alta: Date;
    fecha_baja: Date;
}

export interface agregarPresentacionProductoDto {
    fk_suscriptor?: number;
    nombre_presentacion?: string;
}

export interface obtenPresentacionProductoDto {
    fk_suscriptor?: number;
    id_presentacion?: number;
}

export interface actualizaPresentacionProductoDto{
    id_presentacion?: number;
    fk_suscriptor?: number;
    nombre_presentacion?: string;
}