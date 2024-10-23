export interface Cochera{
  id: number;
  descripcion: string;
  deshabilitada: number;
  eliminada: number;
}import { Estacionamiento } from "./Estacionamiento";

export interface Cochera{
    id: number;
    descripcion: string;
    deshabilitada: number;
    eliminada: number;
    estacionamiento: Estacionamiento | undefined;
}