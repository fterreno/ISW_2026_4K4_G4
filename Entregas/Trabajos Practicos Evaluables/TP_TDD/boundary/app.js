// Header compartido
class EcoHeader extends HTMLElement {
  connectedCallback() {
    const subtitulo = this.getAttribute('subtitulo') || 'Sistema de inscripción a actividades';
    const header = document.createElement('header');
    header.innerHTML = `
    <div class="logo-box">🌿</div>
    <div class="header-texto">
      <h1>EcoHarmony Park</h1>
      <p>${subtitulo}</p>
    </div>`;
    this.replaceWith(header);
  }
}
customElements.define('eco-header', EcoHeader);

// Constantes
const ICONOS = {
  'Tirolesa':   '🧗',
  'Safari':     '🦁',
  'Palestra':   '🧱',
  'Jardinería': '🌱',
};

const TERMINOS = {
  'Tirolesa':   '<strong>Tirolesa:</strong> Los participantes deben pesar entre 30 y 120 kg. Es obligatorio el uso del equipo de seguridad provisto. El talle de vestimenta es necesario para ajustar el arnés correctamente. No se permite la participación a personas con problemas cardíacos o vértigo severo.',
  'Safari':     '<strong>Safari:</strong> Mantené silencio y tranquilidad durante el recorrido. Prohibido alimentar o acercarse a los animales. Seguir en todo momento las instrucciones del guía. El parque no se responsabiliza por objetos personales perdidos.',
  'Palestra':   '<strong>Palestra:</strong> Es obligatorio el uso de calzado deportivo y el equipo provisto por el parque. El talle de vestimenta es necesario para el equipamiento. Menores de 12 años deben estar acompañados por un adulto. Informar al instructor sobre lesiones previas.',
  'Jardinería': '<strong>Jardinería:</strong> Las plantas y semillas son propiedad del parque y no pueden retirarse sin autorización. Usar los guantes proporcionados al manipular herramientas. El parque provee todos los materiales necesarios. Actividad apta para todas las edades.',
};

// Estados
function getState() {
  try { return JSON.parse(localStorage.getItem('ecoState') || '{}'); } catch { return {}; }
}

function setState(updates) {
  localStorage.setItem('ecoState', JSON.stringify({ ...getState(), ...updates }));
}

function clearState() {
  localStorage.removeItem('ecoState');
}

function requireState(...campos) {
  const s = getState();
  const ok = campos.every(c => {
    const val = s[c];
    if (Array.isArray(val)) return val.length > 0;
    return val !== null && val !== undefined && val !== '';
  });
  if (!ok) window.location.href = 'index.html';
  return s;
}

// Alertas
function mostrarError(idElemento, msg) {
  const el = document.getElementById(idElemento);
  if (!el) return;
  el.querySelector('span').textContent = msg;
  el.classList.add('visible');
  setTimeout(() => el.classList.remove('visible'), 5000);
}

// Visitante
function renderizarVisitante(i, saved = {}, requiereTalle = false) {
  const talles = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const opcionesTalle = talles
    .map(t => `<option value="${t}" ${saved.talle === t ? 'selected' : ''}>${t}</option>`)
    .join('');

  return `
    <div class="visitante-card">
      <div class="visitante-titulo">
        <span class="visitante-numero">${i + 1}</span>
        Visitante ${i + 1}
      </div>
      <div class="campo">
        <label>Nombre completo</label>
        <input type="text" id="v${i}-nombre" placeholder="Ej: Juan Pérez" value="${saved.nombre || ''}" autocomplete="off" />
      </div>
      <div class="grid-2">
        <div class="campo">
          <label>DNI</label>
          <input type="text" id="v${i}-dni" placeholder="Ej: 35123456" value="${saved.dni || ''}" autocomplete="off" />
        </div>
        <div class="campo">
          <label>Edad</label>
          <input type="number" id="v${i}-edad" placeholder="Ej: 28" min="1" max="120" value="${saved.edad || ''}" />
        </div>
      </div>
      ${requiereTalle ? `
      <div class="campo">
        <label>Talle de vestimenta</label>
        <select id="v${i}-talle">
          <option value="">Seleccioná un talle</option>
          ${opcionesTalle}
        </select>
      </div>` : ''}
    </div>
  `;
}

// Validar Visitante
function validarVisitantes(cantidad, requiereTalle, idError) {
  const visitantes = [];

  for (let i = 0; i < cantidad; i++) {
    const nombre  = document.getElementById(`v${i}-nombre`)?.value.trim();
    const dni     = document.getElementById(`v${i}-dni`)?.value.trim();
    const edadRaw = document.getElementById(`v${i}-edad`)?.value.trim();
    const edad    = parseInt(edadRaw);
    const talleEl = document.getElementById(`v${i}-talle`);
    const talle   = talleEl ? talleEl.value : undefined;
    const n = i + 1;

    if (!nombre) { mostrarError(idError, `El nombre del visitante ${n} es obligatorio.`); return null; }
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(nombre)) { mostrarError(idError, `El nombre del visitante ${n} solo puede contener letras y espacios.`); return null; }
    if (nombre.length > 30) { mostrarError(idError, `El nombre del visitante ${n} no puede superar los 30 caracteres.`); return null; }
    if (!dni) { mostrarError(idError, `El DNI del visitante ${n} es obligatorio.`); return null; }
    if (!/^\d{7,8}$/.test(dni)) { mostrarError(idError, `El DNI del visitante ${n} debe tener entre 7 y 8 dígitos numéricos.`); return null; }
    if (!edadRaw) { mostrarError(idError, `La edad del visitante ${n} es obligatoria.`); return null; }
    if (isNaN(edad) || edad < 1 || edad > 120) { mostrarError(idError, `La edad del visitante ${n} debe estar entre 1 y 120 años.`); return null; }
    if (requiereTalle && !talle) { mostrarError(idError, `Seleccioná el talle del visitante ${n}.`); return null; }

    const v = { nombre, dni, edad };
    if (talle) v.talle = talle;
    visitantes.push(v);
  }

  return visitantes;
}