import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { EnvasesComponent } from './envases/envases.component';
import { UnidadesMedidaComponent } from './unidades-medida/unidades-medida.component';

const routes: Routes = [
  {
    path: 'categories',
    component: CategoriesComponent,
  },
  {
    path: 'envases',
    component: EnvasesComponent,
  },
  {
    path: 'unidades-medida',
    component: UnidadesMedidaComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogsRoutingModule { }
