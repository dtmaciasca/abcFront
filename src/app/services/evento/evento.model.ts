import {Categoria} from '../categoria/categoria.model';

export class Evento{
  id: number;
  nombre: string;
  categoria: Categoria;
  lugar: string;
  direccion: string;
  fechaInicio: string;
  fechaFin: string;
  esPresencial: string;

}
