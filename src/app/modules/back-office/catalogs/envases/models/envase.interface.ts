export interface envaseDto {
    id_envase: number;
    fk_suscriptor: number;
    nombre_envase: string;
    estatus: number;
    fecha_alta: Date;
    fecha_baja: Date;
}

export interface agregarEnvaseDto {
    fk_suscriptor: number;
    nombre_envase: string;
}

export interface obtenDetalleEnvaseDto {
    fk_suscriptor: number;
    id_envase: number;
}

export interface actualizaEnvaseDto{
    id_envase: number;
    fk_suscriptor: number;
    nombre_envase: string;
}