const savedState = getState();
let actividadSeleccionada = savedState.actividadSeleccionada || null;
let requiereTalleSeleccionada = savedState.requiereTalle || false;

async function cargarActividades() {
  const lista = document.getElementById('lista-actividades');
  try {
    const res  = await fetch('/api/actividades');
    const data = await res.json();
    lista.innerHTML = '';

    data.actividades.forEach(act => {
      const item = document.createElement('div');
      item.className = 'card-actividad' + (act.nombre === actividadSeleccionada ? ' seleccionada' : '');
      item.dataset.nombre = act.nombre;
      item.innerHTML = `
        <div class="icono">${ICONOS[act.nombre] || '🌿'}</div>
        <div class="info-act">
          <span class="nombre">${act.nombre}</span>
          ${act.requiereTalle ? '<span class="badge-talle">requiere talle</span>' : ''}
        </div>
        <div class="check-icon">✓</div>
      `;
      item.addEventListener('click', () => {
        document.querySelectorAll('.card-actividad').forEach(c => c.classList.remove('seleccionada'));
        item.classList.add('seleccionada');
        actividadSeleccionada = act.nombre;
        requiereTalleSeleccionada = act.requiereTalle;
      });
      lista.appendChild(item);
    });
  } catch {
    lista.innerHTML = '<p style="color:red;font-size:0.85rem">Error al cargar actividades. ¿Está corriendo el servidor?</p>';
  }
}

document.getElementById('btn-siguiente').addEventListener('click', () => {
  if (!actividadSeleccionada) {
    mostrarError('error-1', 'Por favor seleccioná una actividad.');
    return;
  }
  setState({
    actividadSeleccionada,
    requiereTalle: requiereTalleSeleccionada,
    horarioSeleccionado: null,
    visitantes: [],
    email: '',
    cantidadVisitantes: 1,
    inscripcion: null,
  });
  window.location.href = 'formularioHorarios.html';
});

cargarActividades();