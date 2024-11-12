const hamBurger = document.querySelector(".toggle-btn");
const sidebar = document.querySelector("#sidebar");
const headerText = document.querySelector("#header-text");

// Verifica el estado inicial del sidebar al cargar la página
if (sidebar.classList.contains("expand")) {
    headerText.classList.add("hide-text"); // Oculta el texto del header
}

hamBurger.addEventListener("click", function () {
    console.log("holas");
    sidebar.classList.toggle("expand");

    // Verifica si el sidebar está expandido
    if (sidebar.classList.contains("expand")) {
        headerText.classList.add("hide-text"); // Oculta el texto del header
    } else {
        headerText.classList.remove("hide-text"); // Muestra el texto del header
    }
});
