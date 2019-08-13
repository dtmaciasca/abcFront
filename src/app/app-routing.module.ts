import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutenticacionComponent } from './components/autenticacion/autenticacion.component';
import { ListarEventosComponent } from './components/listar-eventos/listar-eventos.component';
import { CrearEventoComponent } from './components/crear-evento/crear-evento.component';
import { DetalleEventoComponent } from './components/detalle-evento/detalle-evento.component';
import { RegistroComponent } from './components/registro/registro.component';
import { NoAutenticadoGuard } from './guards/no-autenticado/no-autenticado.guard';
import { AutenticacionGuard } from './guards/autenticado/autenticacion.guard';

const routes: Routes = [
  {
    path: '',
    component: AutenticacionComponent,
    canActivate: [NoAutenticadoGuard]
  },
  {
    path: 'eventos',
    component: ListarEventosComponent,
    canActivate: [AutenticacionGuard]
  },
  {
    path: 'nuevoEvento',
    component: CrearEventoComponent,
    canActivate: [AutenticacionGuard]
  },
  {
    path: 'evento/:idEvento/:edit',
    component: DetalleEventoComponent,
    canActivate: [AutenticacionGuard]
  },
  {
    path: 'registro',
    component: RegistroComponent,
    canActivate: [NoAutenticadoGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
