import { ServicioInscripcion } from "../control/servicioInscripcion";
import {
  Actividad,
  DatosVisitante,
  EmailService,
  Inscripcion,
  SolicitudInscripcion,
} from "../entity/models";

// ─── Datos de prueba ──────────────────────────────────────────────────────────

const actividadesDisponibles: Actividad[] = [
  {
    nombre: "Tirolesa",
    horarios: [
      { id: "T1", hora: "10:00", cuposDisponibles: 5, parqueAbierto: true },
      { id: "T2", hora: "14:00", cuposDisponibles: 0, parqueAbierto: true },
      { id: "T3", hora: "16:00", cuposDisponibles: 3, parqueAbierto: false },
    ],
  },
  {
    nombre: "Safari",
    horarios: [
      { id: "S1", hora: "09:00", cuposDisponibles: 10, parqueAbierto: true },
      { id: "S2", hora: "15:00", cuposDisponibles: 0, parqueAbierto: true },
    ],
  },
  {
    nombre: "Palestra",
    horarios: [
      { id: "P1", hora: "11:00", cuposDisponibles: 4, parqueAbierto: true },
    ],
  },
  {
    nombre: "Jardinería",
    horarios: [
      { id: "J1", hora: "13:00", cuposDisponibles: 8, parqueAbierto: true },
    ],
  },
];

const visitanteValido: DatosVisitante = {
  nombre: "Juan Pérez",
  dni: "35123456",
  edad: 28,
  talle: "M",
};

const visitanteValidoSinTalle: DatosVisitante = {
  nombre: "Ana Gómez",
  dni: "40987654",
  edad: 22,
};

let emailServiceMock: jest.Mocked<EmailService>;
let servicio: ServicioInscripcion;

beforeEach(() => {
  emailServiceMock = {
    enviarConfirmacion: jest.fn(),
  };
  servicio = new ServicioInscripcion(actividadesDisponibles, emailServiceMock);
});

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("US5 - Inscribirse a una actividad", () => {

  // ── Criterio 1: selección de actividad ──────────────────────────────────────

  describe("Selección de actividad", () => {
    it("debe listar las cuatro actividades disponibles", () => {
      const nombres = servicio.obtenerActividadesDisponibles();
      expect(nombres).toEqual(
        expect.arrayContaining(["Tirolesa", "Safari", "Palestra", "Jardinería"])
      );
      expect(nombres).toHaveLength(4);
    });
  });

  // ── Criterio 2: selección de horario ────────────────────────────────────────

  describe("Selección de horario", () => {
    it("debe listar solo los horarios con cupos disponibles y parque abierto", () => {
      const horarios = servicio.obtenerHorariosDisponibles("Tirolesa");
      // T2 sin cupos y T3 parque cerrado deben estar excluidos
      expect(horarios.map((h) => h.id)).toEqual(["T1"]);
    });

    it("debe lanzar error si la actividad no existe", () => {
      expect(() =>
        servicio.obtenerHorariosDisponibles("Buceo" as any)
      ).toThrow("Actividad no encontrada");
    });
  });

  // ── Criterio 3 y 4: inscripción exitosa con talle ───────────────────────────

  describe("Inscripción exitosa", () => {
    it("PASA: inscripción válida en actividad que requiere talle", () => {
      const solicitud: SolicitudInscripcion = {
        actividad: "Tirolesa",
        horarioId: "T1",
        visitantes: [visitanteValido],
        aceptaTerminos: true,
      };

      const inscripcion = servicio.inscribir(solicitud, "juan@mail.com");

      expect(inscripcion).toBeDefined();
      expect(inscripcion.actividad).toBe("Tirolesa");
      expect(inscripcion.visitantes).toHaveLength(1);
      expect(inscripcion.visitantes[0].talle).toBe("M");
    });

    it("PASA: inscripción válida en actividad que NO requiere talle (Safari)", () => {
      const solicitud: SolicitudInscripcion = {
        actividad: "Safari",
        horarioId: "S1",
        visitantes: [visitanteValidoSinTalle],
        aceptaTerminos: true,
      };

      const inscripcion = servicio.inscribir(solicitud, "ana@mail.com");

      expect(inscripcion).toBeDefined();
      expect(inscripcion.actividad).toBe("Safari");
    });

    it("PASA: inscripción con múltiples visitantes", () => {
      const solicitud: SolicitudInscripcion = {
        actividad: "Tirolesa",
        horarioId: "T1",
        visitantes: [visitanteValido, { ...visitanteValido, nombre: "María", dni: "41000001" }],
        aceptaTerminos: true,
      };

      const inscripcion = servicio.inscribir(solicitud, "juan@mail.com");
      expect(inscripcion.visitantes).toHaveLength(2);
    });
  });

  // ── Criterio: email de confirmación ─────────────────────────────────────────

  describe("Email de confirmación", () => {
    it("debe enviar email de confirmación al finalizar la inscripción", () => {
      const solicitud: SolicitudInscripcion = {
        actividad: "Safari",
        horarioId: "S1",
        visitantes: [visitanteValidoSinTalle],
        aceptaTerminos: true,
      };

      servicio.inscribir(solicitud, "ana@mail.com");

      expect(emailServiceMock.enviarConfirmacion).toHaveBeenCalledTimes(1);
      expect(emailServiceMock.enviarConfirmacion).toHaveBeenCalledWith(
        expect.objectContaining({ actividad: "Safari" }),
        "ana@mail.com"
      );
    });
  });

  // ── Pruebas de falla: sin cupo ───────────────────────────────────────────────

  describe("Fallas: cupos y disponibilidad", () => {
    it("FALLA: actividad sin cupo para el horario seleccionado", () => {
      const solicitud: SolicitudInscripcion = {
        actividad: "Tirolesa",
        horarioId: "T2", // cuposDisponibles: 0
        visitantes: [visitanteValido],
        aceptaTerminos: true,
      };

      expect(() => servicio.inscribir(solicitud, "juan@mail.com")).toThrow(
        "No hay cupos disponibles para el horario seleccionado"
      );
    });

    it("FALLA: horario en el que el parque está cerrado", () => {
      const solicitud: SolicitudInscripcion = {
        actividad: "Tirolesa",
        horarioId: "T3", // parqueAbierto: false
        visitantes: [visitanteValido],
        aceptaTerminos: true,
      };

      expect(() => servicio.inscribir(solicitud, "juan@mail.com")).toThrow(
        "El parque está cerrado o la actividad no está disponible en ese horario"
      );
    });

    it("FALLA: horario inexistente", () => {
      const solicitud: SolicitudInscripcion = {
        actividad: "Tirolesa",
        horarioId: "INVALIDO",
        visitantes: [visitanteValido],
        aceptaTerminos: true,
      };

      expect(() => servicio.inscribir(solicitud, "juan@mail.com")).toThrow(
        "Horario no encontrado"
      );
    });

    it("FALLA: cantidad de visitantes supera los cupos disponibles", () => {
      // T1 tiene 5 cupos
      const visitantes: DatosVisitante[] = Array.from({ length: 6 }, (_, i) => ({
        nombre: `Visitante ${i}`,
        dni: `3500000${i}`,
        edad: 25,
        talle: "M",
      }));

      const solicitud: SolicitudInscripcion = {
        actividad: "Tirolesa",
        horarioId: "T1",
        visitantes,
        aceptaTerminos: true,
      };

      expect(() => servicio.inscribir(solicitud, "juan@mail.com")).toThrow(
        "No hay cupos disponibles para el horario seleccionado"
      );
    });
  });

  // ── Pruebas de falla: términos y condiciones ────────────────────────────────

  describe("Fallas: términos y condiciones", () => {
    it("FALLA: no aceptar los términos y condiciones", () => {
      const solicitud: SolicitudInscripcion = {
        actividad: "Safari",
        horarioId: "S1",
        visitantes: [visitanteValidoSinTalle],
        aceptaTerminos: false,
      };

      expect(() => servicio.inscribir(solicitud, "ana@mail.com")).toThrow(
        "Debe aceptar los términos y condiciones de la actividad"
      );
    });
  });

  // ── Pruebas de falla: talle requerido ──────────────────────────────────────

  describe("Fallas: talle de vestimenta", () => {
    it("FALLA: actividad requiere talle pero no se ingresó", () => {
      const solicitud: SolicitudInscripcion = {
        actividad: "Tirolesa", // requiere talle
        horarioId: "T1",
        visitantes: [visitanteValidoSinTalle], // sin talle
        aceptaTerminos: true,
      };

      expect(() => servicio.inscribir(solicitud, "juan@mail.com")).toThrow(
        "El talle de vestimenta es requerido para esta actividad"
      );
    });

    it("FALLA: Palestra requiere talle pero no se ingresó", () => {
      const solicitud: SolicitudInscripcion = {
        actividad: "Palestra", // requiere talle
        horarioId: "P1",
        visitantes: [visitanteValidoSinTalle],
        aceptaTerminos: true,
      };

      expect(() => servicio.inscribir(solicitud, "juan@mail.com")).toThrow(
        "El talle de vestimenta es requerido para esta actividad"
      );
    });

    it("PASA: Jardinería no requiere talle, puede inscribirse sin él", () => {
      const solicitud: SolicitudInscripcion = {
        actividad: "Jardinería",
        horarioId: "J1",
        visitantes: [visitanteValidoSinTalle],
        aceptaTerminos: true,
      };

      expect(() => servicio.inscribir(solicitud, "ana@mail.com")).not.toThrow();
    });
  });

  // ── Datos de visitante incompletos ──────────────────────────────────────────

  describe("Fallas: datos de visitante incompletos", () => {
    it("FALLA: visitante sin nombre", () => {
      const solicitud: SolicitudInscripcion = {
        actividad: "Safari",
        horarioId: "S1",
        visitantes: [{ nombre: "", dni: "40000000", edad: 25 }],
        aceptaTerminos: true,
      };

      expect(() => servicio.inscribir(solicitud, "test@mail.com")).toThrow(
        "Los datos del visitante son incompletos"
      );
    });

    it("FALLA: visitante sin DNI", () => {
      const solicitud: SolicitudInscripcion = {
        actividad: "Safari",
        horarioId: "S1",
        visitantes: [{ nombre: "Carlos", dni: "", edad: 25 }],
        aceptaTerminos: true,
      };

      expect(() => servicio.inscribir(solicitud, "test@mail.com")).toThrow(
        "Los datos del visitante son incompletos"
      );
    });

    it("FALLA: lista de visitantes vacía", () => {
      const solicitud: SolicitudInscripcion = {
        actividad: "Safari",
        horarioId: "S1",
        visitantes: [],
        aceptaTerminos: true,
      };

      expect(() => servicio.inscribir(solicitud, "test@mail.com")).toThrow(
        "Debe indicar al menos un visitante"
      );
    });
  });
});
