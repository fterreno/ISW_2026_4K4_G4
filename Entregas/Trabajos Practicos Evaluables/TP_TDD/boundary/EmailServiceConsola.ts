import { EmailService, Inscripcion } from "../entity/models";

export class EmailServiceConsola implements EmailService {
  enviarConfirmacion(inscripcion: Inscripcion, emailDestino: string): void {
    console.log("\n📧 EMAIL DE CONFIRMACIÓN");
    console.log("========================");
    console.log(`Para: ${emailDestino}`);
    console.log(`Actividad: ${inscripcion.actividad}`);
    console.log(`Horario: ${inscripcion.horario.hora}`);
    console.log(`Visitantes: ${inscripcion.visitantes.length}`);
    inscripcion.visitantes.forEach((v, i) => {
      console.log(
        `  ${i + 1}. ${v.nombre} — DNI: ${v.dni} — Edad: ${v.edad}${
          v.talle ? ` — Talle: ${v.talle}` : ""
        }`
      );
    });
    console.log(`ID Inscripción: ${inscripcion.id}`);
    console.log("========================\n");
  }
}
