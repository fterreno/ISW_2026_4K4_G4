import {
  Actividad,
  ActividadNombre,
  ACTIVIDADES_CON_TALLE,
  DatosVisitante,
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

  // ── Consultas públicas ───────────────────────────────────────────────────────

  obtenerActividadesDisponibles(): ActividadNombre[] {
    return this.actividades.map((a) => a.nombre);
    
  }

  obtenerHorariosDisponibles(nombreActividad: ActividadNombre): Horario[] {
    const actividad = this.buscarActividad(nombreActividad);
    return actividad.horarios.filter(this.esHorarioDisponible);
    
  }

  // ── Caso de uso principal ────────────────────────────────────────────────────

  inscribir(solicitud: SolicitudInscripcion, emailDestino: string): Inscripcion {
   this.validar(solicitud);

    const inscripcion = this.crearInscripcion(solicitud);
    this.emailService.enviarConfirmacion(inscripcion, emailDestino);

    return inscripcion;
  }

  // ── Pipeline de validación ───────────────────────────────────────────────────

  private validar(solicitud: SolicitudInscripcion): void {
    this.validarTerminos(solicitud.aceptaTerminos);
    this.validarVisitantes(solicitud.visitantes);

    const actividad = this.buscarActividad(solicitud.actividad);
    const horario = this.buscarHorario(actividad, solicitud.horarioId);

    this.validarDisponibilidadHorario(horario, solicitud.visitantes.length);
    this.validarTallesSegunActividad(solicitud.actividad, solicitud.visitantes);
  }

  private validarTerminos(aceptaTerminos: boolean): void {
    if (!aceptaTerminos) {
      throw new Error("Debe aceptar los términos y condiciones de la actividad");
    }
  }

  private validarVisitantes(visitantes: DatosVisitante[]): void {
    if (visitantes.length === 0) {
      throw new Error("Debe indicar al menos un visitante");
    }
    for (const v of visitantes) {
      if (!v.nombre || !v.dni || v.edad == null) {
        throw new Error("Los datos del visitante son incompletos");
      }
    }
  }

  private validarDisponibilidadHorario(
    horario: Horario,
    cantidadVisitantes: number
  ): void {
    if (!horario.parqueAbierto) {
      throw new Error(
        "El parque está cerrado o la actividad no está disponible en ese horario"
      );
    }
    if (horario.cuposDisponibles < cantidadVisitantes) {
      throw new Error(
        "No hay cupos disponibles para el horario seleccionado"
      );
    }
  }

  private validarTallesSegunActividad(
    nombreActividad: ActividadNombre,
    visitantes: DatosVisitante[]
  ): void {
    if (!ACTIVIDADES_CON_TALLE.includes(nombreActividad)) return;

    const sinTalle = visitantes.find((v) => !v.talle);
    if (sinTalle) {
      throw new Error(
        "El talle de vestimenta es requerido para esta actividad"
      );
    }
  }

  // ── Construcción de inscripción ──────────────────────────────────────────────

  private crearInscripcion(solicitud: SolicitudInscripcion): Inscripcion {
    const actividad = this.buscarActividad(solicitud.actividad);
    const horario = this.buscarHorario(actividad, solicitud.horarioId);

    return {
      id: this.generarId(),
      actividad: solicitud.actividad,
      horario,
      visitantes: solicitud.visitantes,
      fechaInscripcion: new Date(),
    };
  }

  // ── Helpers de búsqueda ──────────────────────────────────────────────────────

  private buscarActividad(nombre: ActividadNombre): Actividad {
    const actividad = this.actividades.find((a) => a.nombre === nombre);
    if (!actividad) throw new Error("Actividad no encontrada");
    return actividad;
  }

  private buscarHorario(actividad: Actividad, horarioId: string): Horario {
    const horario = actividad.horarios.find((h) => h.id === horarioId);
    if (!horario) throw new Error("Horario no encontrado");
    return horario;
  }

  private esHorarioDisponible = (horario: Horario): boolean =>
    horario.cuposDisponibles > 0 && horario.parqueAbierto;

  private generarId(): string {
    return `INS-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 7)
      .toUpperCase()}`;
  }
}

