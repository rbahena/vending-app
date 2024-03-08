import { Component } from '@angular/core';
import { EnvasesService } from './envases.service';
import { AlertService } from 'src/app/modules/shared/alert/alert.service';
import { envaseDto } from './models/envase.interface';
const SUSCRIPTOR_LOCAL_STORAGE_KEY_VENDING = 'suscriptorData';

@Component({
  selector: 'app-envases',
  templateUrl: './envases.component.html',
  styleUrls: ['./envases.component.css']
})
export class EnvasesComponent {
  titleEnvasesInterface:String = 'Lista de Envases';
  id_suscriptor: number | undefined;
  envases: envaseDto[] = [];

  constructor(private envaseService: EnvasesService, private alertService: AlertService) {
    console.log("Constrcutor");
   }
  ngOnInit(): void { this.obtenerEnvases(); }

  async obtenerEnvases() {
    console.log("Obtener");
    this.id_suscriptor = this.recuperaIdSuscriptorLocalStorage();
    (await this.envaseService.obtenerEnvases(this.id_suscriptor)).subscribe({
      next: response => {
        this.envases = response;
        this.alertService.showAlert('Los envases se recuperaron de manera exitosa.');
        console.log("this.envases: ", this.envases);
      },
      error: error => {
        this.alertService.showAlert('No fue posible recuperar los envases, favor de intentar nuevamente.');
      }
    });
  }

  private recuperaIdSuscriptorLocalStorage(): number {
    const idSuscr = localStorage.getItem(SUSCRIPTOR_LOCAL_STORAGE_KEY_VENDING);
    return Number(idSuscr);
  }
}
