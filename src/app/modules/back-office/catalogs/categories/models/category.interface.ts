export interface category {
    id_categoria: number;
    fk_suscriptor: number;
    nombre_categoria: string;
    estatus: number;
    fecha_alta: Date;
    fecha_baja: Date;
}