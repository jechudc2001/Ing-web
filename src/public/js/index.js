const hamBurger = document.querySelector(".toggle-btn");
const sidebar = document.querySelector("#sidebar");
const headerText = document.querySelector("#header-text");


document.addEventListener("DOMContentLoaded", function () {
    if (window.innerWidth <= 768) {
        sidebar.classList.remove("expand"); 
        headerText.classList.remove("hide-text"); 
    } else if (sidebar.classList.contains("expand")) {
        headerText.classList.add("hide-text"); 
    }
});


hamBurger.addEventListener("click", function () {
    sidebar.classList.toggle("expand");

    if (sidebar.classList.contains("expand")) {
        headerText.classList.add("hide-text"); 
    } else {
        headerText.classList.remove("hide-text"); 
    }
});
