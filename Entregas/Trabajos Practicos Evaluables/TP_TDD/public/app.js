// ── Constantes ─────────────────────────────────────────────────
const ICONOS = {
  Tirolesa: "🧗",
  Safari: "🦁",
  Palestra: "🧱",
  Jardinería: "🌱",
};

const TERMINOS = {
  Tirolesa:
    "<strong>Tirolesa:</strong> Los participantes deben pesar entre 30 y 120 kg. Es obligatorio el uso del equipo de seguridad provisto. El talle de vestimenta es necesario para ajustar el arnés correctamente. No se permite la participación a personas con problemas cardíacos o vértigo severo.",
  Safari:
    "<strong>Safari:</strong> Mantené silencio y tranquilidad durante el recorrido. Prohibido alimentar o acercarse a los animales. Seguir en todo momento las instrucciones del guía. El parque no se responsabiliza por objetos personales perdidos.",
  Palestra:
    "<strong>Palestra:</strong> Es obligatorio el uso de calzado deportivo y el equipo provisto por el parque. El talle de vestimenta es necesario para el equipamiento. Menores de 12 años deben estar acompañados por un adulto. Informar al instructor sobre lesiones previas.",
  Jardinería:
    "<strong>Jardinería:</strong> Las plantas y semillas son propiedad del parque y no pueden retirarse sin autorización. Usar los guantes proporcionados al manipular herramientas. El parque provee todos los materiales necesarios. Actividad apta para todas las edades.",
};

const CON_TALLE = ["Tirolesa", "Palestra"];

// ── Estado global ──────────────────────────────────────────────
const estado = {
  pasoActual: 1,
  actividadSeleccionada: null,
  horarioSeleccionado: null,
  visitantes: [],
  email: "",
  aceptaTerminos: false,
  inscripcionId: null,
  requiereTalle: false,
};

let cantidadVisitantes = 1;

// ── Utilidades de UI ───────────────────────────────────────────
function mostrarPaso(n) {
  document
    .querySelectorAll('[id^="paso-"]')
    .forEach((el) => (el.style.display = "none"));
  document.getElementById(`paso-${n === "exito" ? "exito" : n}`).style.display =
    "block";

  const progresoWrapper = document.querySelector(".progreso-wrapper");
  if (n === "exito") {
    progresoWrapper.style.display = "none";
  } else {
    progresoWrapper.style.display = "";
    const progreso = { 1: 25, 2: 50, 3: 75, 4: 100 };
    document.getElementById("barra").style.width = progreso[n] + "%";
    ["1", "2", "3", "4"].forEach((i) => {
      const lbl = document.getElementById(`lbl-${i}`);
      lbl.className = "paso-label";
      if (parseInt(i) < n) lbl.classList.add("completado");
      if (parseInt(i) === n) lbl.classList.add("activo");
    });
  }

  estado.pasoActual = n;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function mostrarError(paso, msg) {
  const el = document.getElementById(`error-${paso}`);
  el.querySelector("span").textContent = msg;
  el.classList.add("visible");
  setTimeout(() => el.classList.remove("visible"), 5000);
}

function setSpinner(visible) {
  document.getElementById("btn-4-confirmar").disabled = visible;
  document.getElementById("btn-confirmar-texto").style.display = visible
    ? "none"
    : "inline";
  document.getElementById("spinner").style.display = visible
    ? "inline-block"
    : "none";
}

// ── PASO 1: Actividades ────────────────────────────────────────
async function cargarActividades() {
  try {
    const res = await fetch("/api/actividades");
    const data = await res.json();
    const grid = document.getElementById("grid-actividades");
    grid.innerHTML = "";

    data.actividades.forEach((nombre) => {
      const tieneTalle = CON_TALLE.includes(nombre);
      const card = document.createElement("div");
      card.className = "card-actividad";
      card.dataset.nombre = nombre;
      card.innerHTML = `
        <span class="icono">${ICONOS[nombre] || "🌿"}</span>
        <span class="nombre">${nombre}</span>
        ${tieneTalle ? '<span class="badge-talle">requiere talle</span>' : ""}
      `;
      card.addEventListener("click", () => seleccionarActividad(nombre, card));
      grid.appendChild(card);
    });
  } catch (e) {
    document.getElementById("grid-actividades").innerHTML =
      '<p style="color:red">Error al cargar actividades. ¿Está corriendo el servidor?</p>';
  }
}

function seleccionarActividad(nombre, card) {
  document
    .querySelectorAll(".card-actividad")
    .forEach((c) => c.classList.remove("seleccionada"));
  card.classList.add("seleccionada");
  estado.actividadSeleccionada = nombre;
  estado.requiereTalle = CON_TALLE.includes(nombre);
}

document
  .getElementById("btn-1-siguiente")
  .addEventListener("click", async () => {
    if (!estado.actividadSeleccionada) {
      mostrarError(1, "Por favor seleccioná una actividad.");
      return;
    }
    await cargarHorarios();
    mostrarPaso(2);
  });

// ── PASO 2: Horarios ───────────────────────────────────────────
async function cargarHorarios() {
  const grid = document.getElementById("grid-horarios");
  grid.innerHTML =
    '<p style="color:#aaa;font-size:0.85rem">Cargando horarios...</p>';
  document.getElementById("subtitulo-horario").textContent =
    `Horarios disponibles para ${estado.actividadSeleccionada}.`;

  try {
    const res = await fetch(
      `/api/actividades/${estado.actividadSeleccionada}/horarios`,
    );
    const data = await res.json();
    grid.innerHTML = "";

    if (data.horarios.length === 0) {
      grid.innerHTML =
        '<p style="color:#aaa;font-size:0.85rem;grid-column:1/-1">No hay horarios disponibles en este momento.</p>';
      return;
    }

    data.horarios.forEach((h) => {
      const card = document.createElement("div");
      card.className = "card-horario";
      card.dataset.id = h.id;
      card.innerHTML = `
        <span class="hora">${h.hora}</span>
        <span class="cupos">${h.cuposDisponibles} cupos</span>
      `;
      card.addEventListener("click", () => seleccionarHorario(h, card));
      grid.appendChild(card);
    });
  } catch (e) {
    grid.innerHTML = '<p style="color:red">Error al cargar horarios.</p>';
  }
}

function seleccionarHorario(h, card) {
  document
    .querySelectorAll(".card-horario")
    .forEach((c) => c.classList.remove("seleccionado"));
  card.classList.add("seleccionado");
  estado.horarioSeleccionado = h;
}

document.getElementById("btn-2-atras").addEventListener("click", () => {
  estado.horarioSeleccionado = null;
  cantidadVisitantes = 1;
  estado.visitantes = [];
  mostrarPaso(1);
});

document.getElementById("btn-2-siguiente").addEventListener("click", () => {
  if (!estado.horarioSeleccionado) {
    mostrarError(2, "Por favor seleccioná un horario.");
    return;
  }
  renderizarFormularioVisitantes();
  mostrarPaso(3);
});

// ── PASO 3: Visitantes ─────────────────────────────────────────
function renderizarFormularioVisitantes() {
  const container = document.getElementById("formulario-visitantes");
  container.innerHTML = "";
  for (let i = 0; i < cantidadVisitantes; i++) {
    const card = document.createElement("div");
    card.className = "visitante-card";
    card.innerHTML = `
      <div class="visitante-titulo">
        <span class="visitante-numero">${i + 1}</span>
        Visitante ${i + 1}
      </div>
      <div class="campo">
        <label>Nombre completo</label>
        <input type="text" id="v${i}-nombre" placeholder="Ej: Juan Pérez" />
      </div>
      <div class="grid-2">
        <div class="campo">
          <label>DNI</label>
          <input type="text" id="v${i}-dni" placeholder="Ej: 35123456" />
        </div>
        <div class="campo">
          <label>Edad</label>
          <input type="number" id="v${i}-edad" placeholder="Ej: 28" min="1" max="120" />
        </div>
      </div>
      ${
        estado.requiereTalle
          ? `
      <div class="campo">
        <label>Talle de vestimenta</label>
        <select id="v${i}-talle">
          <option value="">Seleccioná un talle</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
        </select>
      </div>`
          : ""
      }
    `;
    container.appendChild(card);
  }
  document.getElementById("cantidad-display").textContent = cantidadVisitantes;
  document.getElementById("btn-menos").disabled = cantidadVisitantes <= 1;
  document.getElementById("btn-mas").disabled =
    cantidadVisitantes >= (estado.horarioSeleccionado?.cuposDisponibles || 10);
}

document.getElementById("btn-menos").addEventListener("click", () => {
  if (cantidadVisitantes > 1) {
    cantidadVisitantes--;
    renderizarFormularioVisitantes();
  }
});

document.getElementById("btn-mas").addEventListener("click", () => {
  cantidadVisitantes++;
  renderizarFormularioVisitantes();
});

document.getElementById("btn-3-atras").addEventListener("click", () => {
  cantidadVisitantes = 1;
  estado.visitantes = [];
  estado.email = "";
  document.getElementById("input-email").value = "";
  mostrarPaso(2);
});

function validarCamposVisitante(i) {
  const n = i + 1;
  const nombre = document.getElementById(`v${i}-nombre`)?.value.trim();
  const dni = document.getElementById(`v${i}-dni`)?.value.trim();
  const edadRaw = document.getElementById(`v${i}-edad`)?.value.trim();
  const edad = parseInt(edadRaw);
  const talleEl = document.getElementById(`v${i}-talle`);
  const talle = talleEl ? talleEl.value : undefined;

  if (!nombre) return { error: `El nombre del visitante ${n} es obligatorio.` };
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(nombre))
    return {
      error: `El nombre del visitante ${n} solo puede contener letras y espacios.`,
    };
  if (nombre.length > 30)
    return {
      error: `El nombre del visitante ${n} no puede superar los 30 caracteres.`,
    };
  if (!dni) return { error: `El DNI del visitante ${n} es obligatorio.` };
  if (!/^\d{7,8}$/.test(dni))
    return {
      error: `El DNI del visitante ${n} debe tener entre 7 y 8 dígitos numéricos.`,
    };
  if (!edadRaw) return { error: `La edad del visitante ${n} es obligatoria.` };
  if (isNaN(edad) || edad < 1 || edad > 120)
    return {
      error: `La edad del visitante ${n} debe estar entre 1 y 120 años.`,
    };
  if (estado.requiereTalle && !talle)
    return { error: `Seleccioná el talle del visitante ${n}.` };

  const v = { nombre, dni, edad };
  if (talle) v.talle = talle;
  return { visitante: v };
}

document.getElementById("btn-3-siguiente").addEventListener("click", () => {
  const visitantes = [];

  for (let i = 0; i < cantidadVisitantes; i++) {
    const { error, visitante } = validarCamposVisitante(i);
    if (error) {
      mostrarError(3, error);
      return;
    }
    visitantes.push(visitante);
  }

  const email = document.getElementById("input-email").value.trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    mostrarError(3, "Ingresá un email válido (ej: nombre@dominio.com).");
    return;
  }

  estado.visitantes = visitantes;
  estado.email = email;

  document.getElementById("terminos-contenido").innerHTML =
    TERMINOS[estado.actividadSeleccionada] ||
    "Seguir las instrucciones del personal del parque en todo momento.";

  mostrarPaso(4);
});

// ── PASO 4: Términos ───────────────────────────────────────────
document
  .getElementById("acepta-terminos")
  .addEventListener("change", function () {
    document
      .getElementById("checkbox-wrapper")
      .classList.toggle("marcado", this.checked);
  });

document
  .getElementById("btn-4-atras")
  .addEventListener("click", () => mostrarPaso(3));

document
  .getElementById("btn-4-confirmar")
  .addEventListener("click", async () => {
    const acepta = document.getElementById("acepta-terminos").checked;
    if (!acepta) {
      mostrarError(
        4,
        "Debés aceptar los términos y condiciones para continuar.",
      );
      return;
    }

    setSpinner(true);

    try {
      const res = await fetch("/api/inscripciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          solicitud: {
            actividad: estado.actividadSeleccionada,
            horarioId: estado.horarioSeleccionado.id,
            visitantes: estado.visitantes,
            aceptaTerminos: true,
          },
          email: estado.email,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        mostrarError(4, data.error || "Error al procesar la inscripción.");
        setSpinner(false);
        return;
      }

      const ins = data.inscripcion;
      estado.inscripcionId = ins.id;

      document.getElementById("exito-detalle").innerHTML = `
      <div class="exito-fila"><span>Actividad</span><span>${ins.actividad}</span></div>
      <div class="exito-fila"><span>Horario</span><span>${ins.horario.hora}</span></div>
      <div class="exito-fila"><span>Visitantes</span><span>${ins.visitantes.length} persona${ins.visitantes.length > 1 ? "s" : ""}</span></div>
      <div class="exito-fila"><span>Email</span><span>${estado.email}</span></div>
    `;
      document.getElementById("exito-id").textContent =
        `ID de inscripción: ${ins.id}`;

      mostrarPaso("exito");
    } catch (e) {
      mostrarError(4, "Error de conexión con el servidor.");
      setSpinner(false);
    }
  });

// ── Reiniciar ──────────────────────────────────────────────────
function reiniciar() {
  cantidadVisitantes = 1;
  Object.assign(estado, {
    pasoActual: 1,
    actividadSeleccionada: null,
    horarioSeleccionado: null,
    visitantes: [],
    email: "",
    aceptaTerminos: false,
  });
  document.getElementById("acepta-terminos").checked = false;
  document.getElementById("checkbox-wrapper").classList.remove("marcado");
  setSpinner(false);
  mostrarPaso(1);
  cargarActividades();
}

// ── Inicio ─────────────────────────────────────────────────────
document
  .getElementById("btn-nueva-inscripcion")
  .addEventListener("click", reiniciar);
cargarActividades();
