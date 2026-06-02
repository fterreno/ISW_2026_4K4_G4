import { google } from 'googleapis';
import 'dotenv/config';
import * as path from 'path';
import * as fs from 'fs';


const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI,
);

// ─── Generá la URL para que el usuario autorice ───────────────────────────────
export function getAuthUrl(): string {
  return oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/gmail.send'],
    prompt: 'consent',
  });
}

// ─── Seteá los tokens si ya los tenés guardados ───────────────────────────────
export function setTokens(tokens: object): void {
  oAuth2Client.setCredentials(tokens);
}

// ─── Enviá el email ───────────────────────────────────────────────────────────
export async function sendEmail(destinatario: string, datos: {
  actividad: string;
  horario: string;
  visitantes: { nombre: string; dni: string; edad: number }[];
  idInscripcion: string;
}): Promise<void> {
    if (process.env.NODE_ENV === 'test') {
    console.log(`[TEST] Email a ${destinatario}:`, datos);
    return;
  }
  const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

  const fromEmail = "arrigogaspar0@gmail.com";

  const visitantesTexto = datos.visitantes
    .map((v, i) => `  ${i + 1}. ${v.nombre} — DNI: ${v.dni} — Edad: ${v.edad}`)
    .join('\n');

  const body = `
========================
Para: ${destinatario}
Actividad: ${datos.actividad}
Horario: ${datos.horario}
Visitantes: ${datos.visitantes.length}
${visitantesTexto}
ID Inscripción: ${datos.idInscripcion}
========================
  `.trim();

  const message = [
    `From: ${fromEmail}`,
    `To: ${destinatario}`,
    `Subject: Inscripcion Completada`,
    `MIME-Version: 1.0`,
    `Content-Type: text/plain; charset=utf-8`,
    '',
    body,
  ].join('\n');

  const raw = Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  await gmail.users.messages.send({ userId: 'me', requestBody: { raw } });
}



const TOKEN_PATH = path.join(process.cwd(), 'token.json');

// Guardar al hacer el callback
export async function handleAuthCallback(code: string) {
  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens)); // ← guardar
  return tokens;
}

// Cargar al arrancar
if (fs.existsSync(TOKEN_PATH)) {
  const tokens = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf-8'));
  oAuth2Client.setCredentials(tokens);
}