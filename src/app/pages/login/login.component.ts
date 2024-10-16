import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DataAuthService } from '../../services/data-auth.service';
import { Login } from '../../interfaces/Login';
import {FormsModule, NgForm} from '@angular/forms'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule ,FormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  authService = inject(DataAuthService);
  


  loginData: Login = {
    username: 'admin',
    password: 'admin',
  }

  router = inject(Router);

  //Login con .then
  // login(){
  //   console.log('Comienzo login')
  //   fetch('http://localhost:4000/login',{
  //     method: 'POST',
  //     headers: {
  //       'Content-type':'application/json'
  //     },
  //     body: JSON.stringify(this.loginData)
  //   }).then(res => {
  //     console.log('Tengo respuesta del back',res)
  //     res.json().then((resJson:ResLogin) => {
  //       console.log(resJson)
  //     })
  //   })
  //   console.log('Despues del fetch')
  // }
  
  errorLogin = false;
  async login(loginForm: NgForm) {
    const {username, password }= loginForm.value;
    const loginData: Login = {username: username, password}
    const res = await this.authService.login(this.loginData);
    if (res?.status === 200) {
      this.router.navigate(['/estado-cocheras']); 
    } else {
      this.errorLogin = true;
    }
  }  
}