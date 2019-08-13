import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { CategoriaService } from '../../services/categoria/categoria.service';
import { Categoria } from '../../services/categoria/categoria.model';
import { EventoService } from '../../services/evento/evento.service';
import { Evento } from '../../services/evento/evento.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionService } from '../../services/autenticacion/autenticacion.service';

@Component({
  selector: 'app-crear-evento',
  templateUrl: './crear-evento.component.html',
  styleUrls: ['./crear-evento.component.css']
})
export class CrearEventoComponent implements OnInit {
  categorias: Categoria[];
  evento: Evento;
  registerForm: FormGroup;

  constructor(
    private location: Location,
    private categoriaService: CategoriaService,
    private eventoService: EventoService,
    private router: Router,
    private autenticacionService: AutenticacionService
  ) { }

  ngOnInit() {
    this.getCategorias();
    this.registerForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      categoria: new FormControl('', Validators.required),
      lugar: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required),
      fechaInicio: new FormControl('', Validators.required),
      fechaFin:  new FormControl('', Validators.required),
      esPresencial:  new FormControl('', Validators.required),
    });
  }

  goBack(): void {
      this.location.back();
  }

  getCategorias(): void {
    this.categoriaService.getCategorias()
      .subscribe(categorias => this.categorias = categorias);
  }

  register() {
    const nombre = this.registerForm.get('nombre').value;
    const categoria = this.registerForm.get('categoria').value;
    const lugar = this.registerForm.get('lugar').value;
    const direccion = this.registerForm.get('direccion').value;
    const fechaInicio = this.registerForm.get('fechaInicio').value;
    const fechaFin = this.registerForm.get('fechaFin').value;
    const esPresencial = this.registerForm.get('esPresencial').value;
    const user = this.autenticacionService.obtenerDatosUsuario().id;
    console.log('message', this.autenticacionService.obtenerDatosUsuario().id);
    const evento = {'nombre': nombre, 'categoria':categoria, 'lugar':lugar,
      'direccion':direccion, 'fecha_inicio':fechaInicio,  'fecha_fin':fechaFin, 'es_presencial':esPresencial, 'user': user };
    this.eventoService.register(evento).subscribe(response => {
      this.router.navigate(['/eventos']);
        }, error => {
          console.log(error);
          alert('Formulario Invalido');
          this.registerForm.reset();
        });

  };
}
