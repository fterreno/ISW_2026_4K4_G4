import express from "express";
import cors from "cors";
import path from "path";
import { ServicioInscripcion } from "./servicioInscripcion";
import { EmailServiceConsola } from "./EmailServiceConsola";
import { actividadesEnMemoria } from "./datos";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

const emailService = new EmailServiceConsola();
const servicio = new ServicioInscripcion(actividadesEnMemoria, emailService);

// ── GET /api/actividades ─────────────────────────────────────────────────────
app.get("/api/actividades", (_req, res) => {
  const nombres = servicio.obtenerActividadesDisponibles();
  res.json({ actividades: nombres });
});

// ── GET /api/actividades/:nombre/horarios ────────────────────────────────────
app.get("/api/actividades/:nombre/horarios", (req, res) => {
  try {
    const nombre = req.params["nombre"] as any;
    const horarios = servicio.obtenerHorariosDisponibles(nombre);
    res.json({ horarios });
  } catch (e: any) {
    res.status(404).json({ error: e.message });
  }
});

// ── POST /api/inscripciones ──────────────────────────────────────────────────
app.post("/api/inscripciones", (req, res) => {
  try {
    const { solicitud, email } = req.body;
    const inscripcion = servicio.inscribir(solicitud, email);
    res.status(201).json({ inscripcion });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`\n🌿 EcoHarmony Park - Sistema de Inscripciones`);
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}\n`);
});
