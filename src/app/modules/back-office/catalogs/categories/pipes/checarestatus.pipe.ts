import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checarestatus'
})
export class ChecarestatusPipe implements PipeTransform {

  transform(id_estatus: number): string {
    return id_estatus == 1 ? 'Activo' : 'Inactivo';
  }
}
