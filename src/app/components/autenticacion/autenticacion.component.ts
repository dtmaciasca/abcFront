import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AutenticacionService } from '../../services/autenticacion/autenticacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-autenticacion',
  templateUrl: './autenticacion.component.html',
  styleUrls: ['./autenticacion.component.css']
})
export class AutenticacionComponent implements OnInit {
  registerForm: FormGroup;
  public enviado = false;

  constructor(
    private autenticacionService: AutenticacionService,
  ) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  login() {
    //this.enviado = true;
    //this.mensajeError = '';
    const correo = this.registerForm.get('email').value;
    const contrasena = this.registerForm.get('password').value;
    if (correo !== '' && contrasena !== '') {
      //this.cargando = true;
      this.autenticacionService
        .login(correo, contrasena)
        .then(data => {
          this.autenticacionService.guardarDatos(data, correo);
          window.location.reload();
        })
        .catch(err => {
          alert(err);
          console.log(err);

          //this.mensajeError = err;
          //this.cargando = false;
        });
    }else{
      alert("El correo y la contraseña son requeridos.")
    }
  }

}
