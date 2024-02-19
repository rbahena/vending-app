export interface createSuscriptor {
    fk_usuario: Number;
    nombre: String;
    primer_apellido: String;
    segundo_apellido: String;
    nombre_operacion: String;
}

export interface SuscriptorDetail extends createSuscriptor {
    id_suscriptor:Number;
    status: Number;
    fecha_alta:Date;
    fecha_baja:Date;
}