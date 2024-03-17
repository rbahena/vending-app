export interface proveedorDto {
    id_proveedor: number;
    fk_suscriptor: number;
    nombre_proveedor: string;
    url_imagen: string;
    estatus: number;
    fecha_alta: Date;
    fecha_baja: Date;
}

export interface agregarProveedorDto {
    fk_suscriptor?: number;
    nombre_proveedor?: string;
}

export interface obtenDetalleProveedorDto {
    fk_suscriptor?: number;
    id_proveedor?: number;
}

export interface actualizaProveedorDto{
    id_proveedor?: number;
    fk_suscriptor?: number;
    nombre_proveedor?: string;
}