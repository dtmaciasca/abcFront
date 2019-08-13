import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Location} from '@angular/common';
import { EventoService } from '../../services/evento/evento.service';
import { Evento } from '../../services/evento/evento.model';

declare let $: any;

@Component({
  selector: 'app-listar-eventos',
  templateUrl: './listar-eventos.component.html',
  styleUrls: ['./listar-eventos.component.css']
})
export class ListarEventosComponent implements OnInit {
  eventos: Evento[];

  @ViewChild('modalFase', {static: true}) modal: ElementRef;

  constructor(
    private activeModal: NgbModal,
    private location: Location,
    private eventoService: EventoService,
  ) { }

  ngOnInit() {
    this.getEventos();
  }

  onOptionsSelected() {
  }

  goBack(): void {
      this.location.back();
  }

  getEventos(): void {
    this.eventoService.getEventos()
      .subscribe(eventos => this.eventos = eventos);
  }

  eliminarEvento(idEvento): void {
    this.eventoService.eliminar(idEvento).subscribe();
    location.reload();
  }

  openModal(idEvento){
    var eliminar = confirm('¿Esta seguro de eliminar el evento?');
    if(eliminar){
      this.eliminarEvento(idEvento);
    }
  }
}
