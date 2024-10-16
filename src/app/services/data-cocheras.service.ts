import { inject, Injectable } from '@angular/core';
import { Cochera } from '../interfaces/cochera';
import { DataAuthService } from './data-auth.service';
import { Estacionamiento } from '../interfaces/Estacionamiento';

@Injectable({
  providedIn: 'root'
})
export class DataCocherasService {
  cocheras: Cochera[] = [];
  estacionamientos: Estacionamiento[] = [];
  authService = inject(DataAuthService);

  constructor() {
    this.loadData();
  }

  async loadData() {
    await this.getCocheras();
    await this.getEstacionamientos();
    this.asociarEstacionamientosConCocheras();
  }

  async getCocheras() {
    const res = await fetch('http://localhost:4000/cocheras', {
      headers: {
        authorization: 'Bearer ' + this.authService.usuario?.token
      },
    });
    if (res.status !== 200) return;
    const resJson: Cochera[] = await res.json();
    this.cocheras = resJson;
  }

  async getEstacionamientos() {
    const res = await fetch('http://localhost:4000/estacionamientos', {
      headers: {
        authorization: 'Bearer ' + this.authService.usuario?.token
      },
    });
    if (res.status !== 200) return;
    const resJson: Estacionamiento[] = await res.json();
    this.estacionamientos = resJson;
    console.log(this.estacionamientos);
  }

  asociarEstacionamientosConCocheras() {
    this.cocheras = this.cocheras.map(cochera => {
      const estacionamiento = this.estacionamientos.find(e => e.idCochera === cochera.id);
      return { ...cochera, estacionamiento };
    });
    console.log(this.cocheras);
  }

  ultimoNumero = this.cocheras[this.cocheras.length - 1]?.id || 0;

  async agregarCochera() {
    const cochera = { "descripcion": "Agregada por WebApi" };
    const res = await fetch('http://localhost:4000/cocheras', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + this.authService.usuario?.token
      },
      body: JSON.stringify(cochera)
    });
    if (res.status !== 200) {
      console.log("Error en la creación de una nueva cochera");
    } else {
      console.log("Creación de cochera exitosa");
    }
  }

  async borrarFila(index: number) {
    const res = await fetch(`http://localhost:4000/cocheras/${index}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + this.authService.usuario?.token
      }
    });
    if (res.status !== 200) {
      console.log('Error en la eliminación de la cochera');
    } else {
      console.log('Cochera eliminada con éxito');
      this.loadData();
    }
  }

  async borrarTodo() {
    const res = await fetch('http://localhost:4000/cocheras', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + this.authService.usuario?.token
      }
    });
    if (res.status !== 200) {
      console.log('Error al eliminar todas las cocheras');
    } else {
      console.log('Todas las cocheras han sido eliminadas con éxito');
      this.loadData();
    }
  }

  deshabilitarCochera(index: number) {
    this.cocheras[index].deshabilitada = 1;
  }

  habilitarCochera(index: number) {
    this.cocheras[index].deshabilitada = 0;
  }
}
