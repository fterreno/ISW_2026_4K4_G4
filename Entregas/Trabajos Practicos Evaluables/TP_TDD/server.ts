import express from "express";
import cors from "cors";
import path from "path";
import { ServicioInscripcion } from "./control/servicioInscripcion";
import { EmailServiceConsola } from "./boundary/EmailServiceConsola";
import { actividadesEnMemoria } from "./persistence/datos";
import { ACTIVIDADES_CON_TALLE } from "./entity/models";
import { getAuthUrl, handleAuthCallback, setTokens } from "./control/emailService";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "boundary")));

const servicio = new ServicioInscripcion(actividadesEnMemoria);

app.get("/api/actividades", (_req, res) => {
  const nombres = servicio.obtenerActividadesDisponibles();
  const actividades = nombres.map(nombre => ({
    nombre,
    requiereTalle: ACTIVIDADES_CON_TALLE.includes(nombre),
  }));
  res.json({ actividades });
});

app.get("/api/actividades/:nombre/horarios", (req, res) => {
  try {
    const nombre = req.params["nombre"] as any;
    const horarios = servicio.obtenerHorariosDisponibles(nombre);
    res.json({ horarios });
  } catch (e: any) {
    res.status(404).json({ error: e.message });
  }
});

app.post("/api/inscripciones", (req, res) => {
  try {
    const { solicitud, email } = req.body;
    const inscripcion = servicio.inscribir(solicitud, email);
    res.status(201).json({ inscripcion });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

app.get("/auth/google", (_req, res) => {
  res.redirect(getAuthUrl());
});

app.get("/auth/callback", async (req, res) => {
  try {
    const tokens = await handleAuthCallback(req.query.code as string);
    setTokens(tokens);
    res.redirect('/');
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`\n EcoHarmony Park - Sistema de Inscripciones`);
  console.log(` Servidor corriendo en http://localhost:${PORT}\n`);
});
