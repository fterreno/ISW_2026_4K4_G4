export type ActividadNombre = "Tirolesa" | "Safari" | "Palestra" | "Jardinería";

export const ACTIVIDADES_CON_TALLE: ActividadNombre[] = [
  "Tirolesa",
  "Palestra",
];

export interface Horario {
  id: string;
  hora: string;
  cuposDisponibles: number;
  parqueAbierto: boolean;
}

export interface Actividad {
  nombre: ActividadNombre;
  horarios: Horario[];
}

export interface DatosVisitante {
  nombre: string;
  dni: string;
  edad: number;
  talle?: string;
}

export interface SolicitudInscripcion {
  actividad: ActividadNombre;
  horarioId: string;
  visitantes: DatosVisitante[];
  aceptaTerminos: boolean;
}

export interface Inscripcion {
  id: string;
  actividad: ActividadNombre;
  horario: Horario;
  visitantes: DatosVisitante[];
  fechaInscripcion: Date;
}

export interface EmailService {
  enviarConfirmacion(inscripcion: Inscripcion, emailDestino: string): void;
}
