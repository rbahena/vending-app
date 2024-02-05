export interface loginInterface {
    correo_electronico:string;
    contrasena:string;
}

export interface userLogged {
    access_token:string;
    user: {
        id_usuario:number;
        correo_electronico:string;
        telefono:string;
        estatus_suscriptor:number;
        estatus:number;
        correo_confirmado:number;
    }
    
}