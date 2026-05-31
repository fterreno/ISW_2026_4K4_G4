const state = requireState('actividadSeleccionada', 'horarioSeleccionado');
const maxCupos = state.horarioSeleccionado?.cuposDisponibles || 10;
let cantidadVisitantes = state.cantidadVisitantes || 1;

function renderizarFormulario() {
  const container = document.getElementById('formulario-visitantes');
  const savedVisitantes = getState().visitantes || [];
  container.innerHTML = '';

  for (let i = 0; i < cantidadVisitantes; i++) {
    container.insertAdjacentHTML('beforeend', renderizarVisitante(i, savedVisitantes[i] || {}, state.requiereTalle));
  }

  document.getElementById('cantidad-display').textContent = cantidadVisitantes;
  document.getElementById('btn-menos').disabled = cantidadVisitantes <= 1;
  document.getElementById('btn-mas').disabled  = cantidadVisitantes >= maxCupos;
}

document.getElementById('btn-menos').addEventListener('click', () => {
  if (cantidadVisitantes > 1) { cantidadVisitantes--; renderizarFormulario(); }
});

document.getElementById('btn-mas').addEventListener('click', () => {
  if (cantidadVisitantes < maxCupos) { cantidadVisitantes++; renderizarFormulario(); }
});

document.getElementById('btn-atras').addEventListener('click', () => {
  window.location.href = 'formularioHorarios.html';
});

document.getElementById('btn-siguiente').addEventListener('click', () => {
  const visitantes = validarVisitantes(cantidadVisitantes, state.requiereTalle, 'error-3');
  if (!visitantes) return;

  const email = document.getElementById('input-email').value.trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    mostrarError('error-3', 'Ingresá un email válido (ej: nombre@dominio.com).');
    return;
  }

  setState({ visitantes, email, cantidadVisitantes });
  window.location.href = 'terminosConfirmacion.html';
});

const emailEl = document.getElementById('input-email');
if (emailEl && state.email) emailEl.value = state.email;

renderizarFormulario();