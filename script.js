document.addEventListener("DOMContentLoaded", function () {
    var dropdownToggle = document.getElementById("user-dropdown-toggle");
    var dropdownContent = document.querySelector(".dropdown-content");

    dropdownToggle.addEventListener("click", function () {
        dropdownContent.classList.toggle("show");
    });

    window.addEventListener("click", function (event) {
        if (!event.target.matches('.fa-user')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            for (var i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    });
});

//variables carroussel

let compteur = 0; // compteur qui permet de savoir sur quelle image je me trouve
let timer, slides, slideWidth, elements;

window.onload = () => {
    //je récupère le diapo
    const diapo = document.querySelector(".diapo");

    elements = document.querySelector(".elements");

    //je clone la 1ère image
    let firstImage = elements.firstElementChild.cloneNode(true);

    //j'injecte le clone à la fin du diapo
    elements.appendChild(firstImage);

    slides = Array.from(elements.children);

    //je récupère la largeur d'une slide
    slideWidth = diapo.getBoundingClientRect().width;

    //je récupère les flèches
    let next = document.querySelector("#nav-droite");
    let prev = document.querySelector("#nav-gauche");

    //je gère le clic
    next.addEventListener("click", slideNext);
    prev.addEventListener("click", slidePrev);

    //j'automatise le défilement
    timer = setInterval(slideNext, 5000)

    //je gère l'arrêt et la reprise du défilement
    diapo.addEventListener("mouseover", stopTimer);
    diapo.addEventListener("mouseout", startTimer);

}

//défilement du diapo vers la droite
function slideNext() {
    //j'incrémente le compteur
    compteur++;
    elements.style.transition = "1s linear";

    let decal = -slideWidth * compteur;
    elements.style.transform = `translateX(${decal}px)`;

    // on revient au début
    setTimeout(function () {
        if (compteur >= slides.length - 1) {
            compteur = 0;
            elements.style.transition = "unset";
            elements.style.transform = "translateX(0)";
        }
    }, 1000);
}

//défilement du diapo vers la gauche
function slidePrev() {
    //je décrémente le compteur
    compteur--;
    elements.style.transition = "1s linear";

    if (compteur < 0) {
        compteur = slides.length - 1;
        let decal = -slideWidth * compteur
        elements.style.transition = "unset";
        elements.style.transform = `translateX(${decal}px)`;
        setTimeout(slidePrev, 1); 
    }

    let decal = -slideWidth * compteur
    elements.style.transform = `translateX(${decal}px)`;

}

function stopTimer(){
    clearInterval(timer);
}

function startTimer(){
    timer = setInterval(slideNext, 5000);
}