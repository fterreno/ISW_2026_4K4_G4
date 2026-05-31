const state = requireState('actividadSeleccionada');
let horarioSeleccionado = state.horarioSeleccionado || null;

document.getElementById('subtitulo-horario').textContent =
  `Horarios disponibles para ${state.actividadSeleccionada}.`;

async function cargarHorarios() {
  const grid = document.getElementById('grid-horarios');
  try {
    const res  = await fetch(`/api/actividades/${state.actividadSeleccionada}/horarios`);
    const data = await res.json();
    grid.innerHTML = '';

    if (data.horarios.length === 0) {
      grid.innerHTML = '<p style="color:var(--texto-suave);font-size:0.85rem;grid-column:1/-1">No hay horarios disponibles en este momento.</p>';
      return;
    }

    data.horarios.forEach(h => {
      const card = document.createElement('div');
      card.className = 'card-horario' + (horarioSeleccionado?.id === h.id ? ' seleccionado' : '');
      card.innerHTML = `
        <span class="hora">${h.hora}</span>
        <span class="cupos">${h.cuposDisponibles} cupos</span>
      `;
      card.addEventListener('click', () => {
        document.querySelectorAll('.card-horario').forEach(c => c.classList.remove('seleccionado'));
        card.classList.add('seleccionado');
        horarioSeleccionado = h;
      });
      grid.appendChild(card);
    });
  } catch {
    grid.innerHTML = '<p style="color:red;font-size:0.85rem">Error al cargar horarios.</p>';
  }
}

document.getElementById('btn-atras').addEventListener('click', () => {
  window.location.href = 'index.html';
});

document.getElementById('btn-siguiente').addEventListener('click', () => {
  if (!horarioSeleccionado) {
    mostrarError('error-2', 'Por favor seleccionÃ¡ un horario.');
    return;
  }
  setState({ horarioSeleccionado, cantidadVisitantes: 1, visitantes: [], email: '' });
  window.location.href = 'formularioVisiantes.html';
});

cargarHorarios();