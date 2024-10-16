import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { DataAuthService } from '../../services/data-auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  errorRegister = false;
  authService = inject(DataAuthService);
  router = inject(Router);

  async register(registerForm: NgForm) {
    const { username, nombre, apellido, password, confirmPassword } = registerForm.value;
    
    // Verifica si las contraseñas coinciden
    if (password !== confirmPassword) {
      Swal.fire("Las contraseñas no coinciden", "", "error");
      // Limpia los campos de contraseña y confirmación
      registerForm.controls['password'].setValue('');
      registerForm.controls['confirmPassword'].setValue('');
      return; // Sale de la función
    }
    
    const registerData = { username, nombre, apellido, password };
    const res = await this.authService.register(registerData)

    if (res?.statusText === "Created") {
      Swal.fire("Registro exitoso", "", "success").then(() => {
          // Espera 3 segundos antes de redirigir
          setTimeout(() => {
              this.router.navigate(['/login']);
          }, 3000);
      });
    } else this.errorRegister = true;
  }
}