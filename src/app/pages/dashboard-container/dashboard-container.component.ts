import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard-container',
  standalone: true,
  imports: [RouterOutlet,RouterModule],
  templateUrl: './dashboard-container.component.html',
  styleUrl: './dashboard-container.component.scss'
})
export class DashboardContainerComponent {
  esAdmin = true;
  constructor(private router: Router) {}
  confirmLogout(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Tu sesión será cerrada",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/login']); // Redirige al usuario a la página de login
        Swal.fire(
          'Cerrado',
          'Tu sesión ha sido cerrada.',
          'success'
        );
      }
    });
  }
}