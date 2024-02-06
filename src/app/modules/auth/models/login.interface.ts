export interface loginInterface {
    correo_electronico:string;
    contrasena:string;
}

export interface UserWithToken extends User {
    token: string;  
}

export interface User {
    id:number;
    correo:string;
    nombre:string;
}
  