import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Evento } from '../../services/evento/evento.model';
import { AutenticacionService } from '../autenticacion/autenticacion.service';
import { DatosUsuario } from '../../models/datos-usuario';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private eventos: Array<Evento> = [];
  private evento: Evento = new Evento();
  private usuario: DatosUsuario;

  constructor(
    private httpClient: HttpClient,
    private autenticacionService: AutenticacionService
  ) { }

  register(evento): Observable<any> {
    //const tokenSisred = this.autenticacionService.obtenerToken();
    const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          //Authorization: 'Token ' + tokenSisred
        })
      };
      console.log('Evento: ' + evento);
    return this.httpClient.post(environment.apiUrl + 'create_evento/', evento, options).pipe(map(response => { }));
  }

  getEventos(): Observable<Evento[]> {
  const tokenSisred = this.autenticacionService.obtenerToken();

  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  this.usuario = this.autenticacionService.obtenerDatosUsuario();
  console.log('usuario: ', this.usuario.id);
  this.eventos = [];
  this.httpClient.get(environment.apiUrl + 'eventos/'+this.usuario.id, {headers}).subscribe((data: Array<any>) => {
    console.log('eventos: ' + data);
    data.forEach(dataItem => {
      const evento = new Evento();
      evento.id = dataItem.id;
      evento.nombre = dataItem.nombre;
      evento.categoria = dataItem.categoria;
      evento.lugar = dataItem.lugar;
      this.eventos.push(evento);
    });
  });
  console.log("evento: " + this.eventos)
  return of(this.eventos);
}

getDetalleEvento(idEvento: number): Observable<Evento> {
    const tokenSisred = this.autenticacionService.obtenerToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //Authorization: 'Token ' + tokenSisred
    });

    let params = new HttpParams();
    params = params.append('', idEvento.toString());
    console.log('idEvento: ' + idEvento);
    this.httpClient
      .get(environment.apiUrl + 'evento/'+idEvento, { headers })
      .subscribe((data: any) => {
        data.forEach(item => {
          this.evento.id = item.id;
          this.evento.nombre = item.nombre;
          this.evento.categoria = item.categoria;
          this.evento.lugar = item.lugar;
          this.evento.direccion = item.direccion;
          this.evento.fechaInicio = item.fecha_inicio;
          this.evento.fechaFin = item.fecha_fin;
          this.evento.esPresencial = item.es_presencial;
        })
        console.log('message', this.evento);
      });
    return of(this.evento);
  }

  editar(evento, idEvento): Observable<any> {
    //const tokenSisred = this.autenticacionService.obtenerToken();
    const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          //Authorization: 'Token ' + tokenSisred
        })
      };
      console.log('Evento: ' + evento);
    return this.httpClient.put(environment.apiUrl + 'update_evento/'+idEvento, evento, options).pipe(map(response => { }));
  }

  eliminar(idEvento){
    const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          //Authorization: 'Token ' + tokenSisred
        })
      };
    return this.httpClient.delete(environment.apiUrl + 'delete_evento/'+idEvento, options).pipe(map(response => { }));
  }
}
