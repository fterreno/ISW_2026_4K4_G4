const state = getState();

if (!state.inscripcion) {
  window.location.href = 'index.html';
} else {
  const ins = state.inscripcion;
  document.getElementById('exito-detalle').innerHTML = `
    <div class="exito-fila"><span>Actividad</span><span>${ins.actividad}</span></div>
    <div class="exito-fila"><span>Horario</span><span>${ins.horario.hora}</span></div>
    <div class="exito-fila"><span>Visitantes</span><span>${ins.visitantes.length} persona${ins.visitantes.length > 1 ? 's' : ''}</span></div>
    <div class="exito-fila"><span>Email</span><span>${state.email}</span></div>
  `;
  document.getElementById('exito-id').textContent = `ID de inscripción: ${ins.id}`;
}

document.getElementById('btn-nueva').addEventListener('click', () => {
  clearState();
  window.location.href = 'index.html';
});