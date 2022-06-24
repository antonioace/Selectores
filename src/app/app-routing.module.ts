import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { SelectorPageComponent } from './paises/pages/selector-page/selector-page.component';

const rutas: Routes = [
  {
    path: 'paises',
    loadChildren: () =>
      import('./paises/paises.module').then((m) => m.PaisesModule),
  },
  {
    path: '**',
    redirectTo: 'paises',
  },
];
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(rutas)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
