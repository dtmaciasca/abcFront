import { Component } from '@angular/core';
import { AutenticacionService } from './services/autenticacion/autenticacion.service';
import { DatosUsuario } from './models/datos-usuario';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public autenticado = false;
  public usuario: DatosUsuario;

  constructor(
    private autenticationService: AutenticacionService
  ) {
  this.autenticado = this.autenticationService.autenticado();

  if (this.autenticado) {
    this.usuario = this.autenticationService.obtenerDatosUsuario();
  }
}

cerrarSesion() {
    this.autenticationService
      .cerrarSesion()
      .then(data => {
        console.log(data);
        this.autenticationService.borrarDatos();
      })
      .catch(err => {
        console.log(err);
        this.autenticationService.borrarDatos();
      });
  }

title = 'Eventos';
}
