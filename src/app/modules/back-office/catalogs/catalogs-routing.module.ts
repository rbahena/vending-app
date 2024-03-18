import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { EnvasesComponent } from './envases/envases.component';
import { UnidadesMedidaComponent } from './unidades-medida/unidades-medida.component';
import { PresentacionesProductoComponent } from './presentaciones-producto/presentaciones-producto.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { UnidadesCompraComponent } from './unidades-compra/unidades-compra.component';

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
  },
  {
    path: 'presentaciones-producto',
    component: PresentacionesProductoComponent,
  },
  {
    path: 'proveedores',
    component: ProveedoresComponent,
  },
  {
    path: 'unidades-compra',
    component: UnidadesCompraComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogsRoutingModule { }
