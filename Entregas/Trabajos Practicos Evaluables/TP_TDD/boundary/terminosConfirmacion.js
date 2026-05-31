const state = requireState('actividadSeleccionada', 'horarioSeleccionado', 'visitantes');

document.getElementById('terminos-contenido').innerHTML =
  TERMINOS[state.actividadSeleccionada] || 'Seguir las instrucciones del personal del parque en todo momento.';

document.getElementById('acepta-terminos').addEventListener('change', function () {
  document.getElementById('checkbox-wrapper').classList.toggle('marcado', this.checked);
});

document.getElementById('btn-atras').addEventListener('click', () => {
  window.location.href = 'formularioVisitantes.html';
});

document.getElementById('btn-confirmar').addEventListener('click', async () => {
  if (!document.getElementById('acepta-terminos').checked) {
    mostrarError('error-4', 'Debés aceptar los términos y condiciones para continuar.');
    return;
  }

  const btn    = document.getElementById('btn-confirmar');
  const texto  = document.getElementById('btn-confirmar-texto');
  const spinner = document.getElementById('spinner');

  btn.disabled       = true;
  texto.style.display  = 'none';
  spinner.style.display = 'inline-block';

  try {
    const res = await fetch('/api/inscripciones', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        solicitud: {
          actividad:      state.actividadSeleccionada,
          horarioId:      state.horarioSeleccionado.id,
          visitantes:     state.visitantes,
          aceptaTerminos: true,
        },
        email: state.email,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      mostrarError('error-4', data.error || 'Error al procesar la inscripción.');
      btn.disabled       = false;
      texto.style.display  = 'inline';
      spinner.style.display = 'none';
      return;
    }

    setState({ inscripcion: data.inscripcion });
    window.location.href = 'exito.html';

  } catch {
    mostrarError('error-4', 'Error de conexión con el servidor.');
    btn.disabled       = false;
    texto.style.display  = 'inline';
    spinner.style.display = 'none';
  }
});