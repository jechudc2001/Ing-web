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

// Temporizador
// Temporizador
function startTimer(duration, display) {
    let timer = duration, hours, minutes, seconds;

    const interval = setInterval(() => {
        // Calcula horas, minutos y segundos
        hours = Math.floor(timer / 3600);
        minutes = Math.floor((timer % 3600) / 60);
        seconds = timer % 60;

        // Formatea como HH:MM:SS
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        // Actualiza el display
        display.textContent = `${hours}:${minutes}:${seconds}`;

        if (--timer < 0) {
            clearInterval(interval);
            display.textContent = "00:00:00";
            alert("¡El tiempo se ha agotado!");
            // Opcional: Deshabilitar preguntas o enviar automáticamente las respuestas
            document.querySelectorAll('.input-alternativa').forEach(input => input.disabled = true);
        }
    }, 1000);
}

// Inicializa el temporizador al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const duration = 2 * 60 * 60; // 2 horas en segundos (7200 segundos)
    const display = document.getElementById('timerDisplay');
    startTimer(duration, display);
});
