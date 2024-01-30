import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'login',
    redirectTo: 'auth/login',
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/back-office/back-office.module').then(
        (module) => module.BackOfficeModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
