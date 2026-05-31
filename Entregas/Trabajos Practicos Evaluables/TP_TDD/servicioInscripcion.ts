import {
  Actividad,
  ActividadNombre,
  EmailService,
  Horario,
  Inscripcion,
  SolicitudInscripcion,
} from "./models";

export class ServicioInscripcion {
  constructor(
    private readonly actividades: Actividad[],
    private readonly emailService: EmailService
  ) {}

  obtenerActividadesDisponibles(): ActividadNombre[] {
    throw new Error("No Implementado");
  }

  obtenerHorariosDisponibles(nombreActividad: ActividadNombre): Horario[] {
    throw new Error("No Implementado");
  }

  inscribir(solicitud: SolicitudInscripcion, emailDestino: string): Inscripcion {
    throw new Error("No Implementado");
  }

}