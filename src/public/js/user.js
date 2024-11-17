document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const progressContainer = document.getElementById('progress-container');
    const totalPreguntas = parseInt(progressContainer.getAttribute('data-total-preguntas'), 10);
    const respondedPreguntas = new Set();

    document.querySelectorAll('.input-alternativa').forEach(input => {
        input.addEventListener('click', (event) => {
            const preguntaId = event.target.getAttribute('data-pregunta-id');

            // Si ya estaba seleccionada, desmarcarla
            if (event.target.checked) {
                if (event.target.classList.contains('already-selected')) {
                    event.target.checked = false;
                    event.target.classList.remove('already-selected');
                    respondedPreguntas.delete(preguntaId);
                } else {
                    // Marcarla como seleccionada
                    event.target.classList.add('already-selected');
                    respondedPreguntas.add(preguntaId);
                }
            }

            // Actualizar el progreso
            const progreso = (respondedPreguntas.size / totalPreguntas) * 100;
            progressBar.style.width = `${progreso}%`;
            progressBar.setAttribute('aria-valuenow', respondedPreguntas.size);
            progressText.textContent = `${respondedPreguntas.size} de ${totalPreguntas} preguntas respondidas`;

            // Imprimir en consola el progreso
            console.log(`Progreso actualizado: ${respondedPreguntas.size}/${totalPreguntas}`);
        });
    });
});
