import { Component } from '@angular/core';
import { EnvasesService } from './envases.service';
import { AlertService } from 'src/app/modules/shared/alert/alert.service';
import { envaseDto } from './models/envase.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
const SUSCRIPTOR_LOCAL_STORAGE_KEY_VENDING = 'suscriptorData';

@Component({
  selector: 'app-envases',
  templateUrl: './envases.component.html',
  styleUrls: ['./envases.component.css']
})
export class EnvasesComponent {
  titleEnvasesInterface: String = 'Lista de Envases';
  id_suscriptor: number | undefined;
  envases: envaseDto[] = [];
  envaseForm!: FormGroup;
  activarFormularioEnvase: boolean = false;

  constructor(private envaseService: EnvasesService, private alertService: AlertService, private readonly envaseFormulario: FormBuilder) { }
  ngOnInit(): void {
    this.obtenerEnvases();
    this.envaseForm = this.inicializaFormulario();
  }

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

  crearActualizarEnvase() {
    console.log("Agregar envase");
  }


  
  mostrarFormularioEnvase() {
    this.activarFormularioEnvase = true;
    this.titleEnvasesInterface = "Agregar nuevo envase"
  }
  ocultarFormularioEnvase() { 
    this.activarFormularioEnvase = false;
    this.titleEnvasesInterface = "Lista de envases"
  }

  private recuperaIdSuscriptorLocalStorage(): number {
    const idSuscr = localStorage.getItem(SUSCRIPTOR_LOCAL_STORAGE_KEY_VENDING);
    return Number(idSuscr);
  }

  private inicializaFormulario(): FormGroup {
    return this.envaseFormulario.group({
      nombre_envase: [Validators.required, Validators.minLength(3)],
      id_categoria: new FormControl()
    });
  }
}
