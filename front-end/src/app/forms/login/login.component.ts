import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidatorService } from 'src/app/help/form-validator.service';
import { Usuario } from '../../model/usuario.model';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';
import { LoginForm } from 'src/app/interfaces/login.interface';
import { Encriptacion } from 'src/resource/encripto';
import Swal from 'sweetalert2';
import { TimerService } from 'src/resource/main.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginform:FormGroup;
  loginRequest:LoginForm;
  enviado:boolean=false;

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  isValidFormSubmitted = false;
  constructor(private fb:FormBuilder,private validar:FormValidatorService,private router:Router,
    private usuarioService:UsuarioService,private main:TimerService) { }

  ngOnInit(): void {
    //Verifica que exista en el localstorage el usuario l.ogueado
    if (localStorage.getItem("login")) {
      this.router.navigateByUrl('/productos');
    }

    //FormGroup para el manejo de email y password
    this.loginform = this.fb.group({
      email:['',[Validators.required]],
      password:['',[Validators.required]]
    });
  }
  // Valida que la clave y el email sean correctos si es asi visualiza el liostado de productos
  login() {
    this.isValidFormSubmitted = false;
    this.enviado=true;
    this.loginRequest = {
      email:this.loginform.get("email").value,
      password:Encriptacion.encriptar(this.loginform.get("password").value)
    }

    this.usuarioService.login(this.loginRequest).subscribe({
      next:(resp:Usuario)=>{

        if (this.loginform.get("password").value==Encriptacion.decrypter(resp.password)) {
          this.router.navigateByUrl('/productos');
          this.isValidFormSubmitted = true;
          localStorage.setItem("login",JSON.stringify(resp));
          this.main.mostrarTitulo();
        }
        else {
          Swal.fire("Error",'La clave no es correcta','error');
        }
      },
      error:(error:any)=>{
        Swal.fire("Error",'El usuario no es correcto','error');
      }
    })
  }
  // Valida si los campos son correctos
  vaidarCampo(filed:string) {
    this.validar.campoRequerido(this.loginform,filed,this.enviado)
}

}
