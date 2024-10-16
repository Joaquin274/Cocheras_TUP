import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Cochera } from '../../interfaces/cochera';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { DataCocherasService } from '../../services/data-cocheras.service';
import { DataAuthService } from '../../services/data-auth.service';

@Component({
  selector: 'app-estado-cocheras',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './estado-cocheras.component.html',
  styleUrl: './estado-cocheras.component.scss'
})
export class EstadoCocherasComponent {
  authService = inject(DataAuthService);
  esAdmin = true;
  dataCocherasService = inject(DataCocherasService)


  agregarCochera(){
    this.dataCocherasService.agregarCochera()
  }

  borrarFila(index:number){
    this.dataCocherasService.borrarFila(index)
  }

  deshabilitarCochera(index:number){
    this.dataCocherasService.deshabilitarCochera(index)
  }

  habilitarCochera(index:number){
    this.dataCocherasService.habilitarCochera(index)
  }

  preguntarBorrarCochera(index: number) {
    Swal.fire({
      title: "¿Estás seguro de que quieres borrar esta cochera?",
      showDenyButton: true,
      confirmButtonText: "Sí",
      denyButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        // Asegúrate de pasar el índice al método borrarFila
        this.dataCocherasService.borrarFila(index);
        Swal.fire("Borrado con éxito", "", "success");
      } else if (result.isDenied) {
        Swal.fire("No se borró nada", "", "info");
      }
    });
  }

  BorrarTodo() {
    if (this.dataCocherasService.cocheras.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'No se puede eliminar cocheras',
        text: 'No hay ninguna cochera disponible para eliminar.',
      });
    } else {
      Swal.fire({
        title: '¿Estás seguro de que quieres borrar todas las cocheras?',
        showDenyButton: true,
        confirmButtonText: 'Sí',
        denyButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
          this.dataCocherasService.borrarTodo();
          Swal.fire('Todas las cocheras fueron eliminadas', '', 'success')
        } else if (result.isDenied) {
          Swal.fire('No se borró nada', '', 'info');
        }
      });
    }
}
}