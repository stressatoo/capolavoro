// Esempi di brani da visualizzare nella pagina iniziale
const brani = [
    { titolo: "Smells Like Teen Spirit", artista: "Nirvana", popolarità: 80, rating: 4.8, anno: 1991, dataAggiunta: "2024-04-20" },
    // ... other song entries
  ];

// Popola la lista dei brani nella pagina
function popolaBrani() {
const listaBrani = document.getElementById("lista-brani");
listaBrani.innerHTML = ""; // Clear existing content

brani.forEach(brano => {
    const elementoTr = document.createElement("tr");
    elementoTr.classList.add("text-left", "border-b", "border-gray-300"); // Separate classes

    // Create and append table cells for each song property in the correct order
    const cellaTitolo = document.createElement("td");
    cellaTitolo.classList.add("px-4", "py-2");
    cellaTitolo.textContent = brano.titolo;

    const cellaArtista = document.createElement("td");
    cellaArtista.classList.add("px-4", "py-2");
    cellaArtista.textContent = brano.artista;

    const cellaPopolarita = document.createElement("td");
    cellaPopolarita.classList.add("px-4", "py-2");
    cellaPopolarita.textContent = brano.popolarità;

    const cellaRating = document.createElement("td");
    cellaRating.classList.add("px-4", "py-2");

    // Display stars using Font Awesome icons
    const rating = brano.rating;
    const numStarsFilled = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    let starIcons = "";
    for (let i = 0; i < numStarsFilled; i++) {
    starIcons += "<i class='fas fa-star'></i>";
    }
    if (hasHalfStar) {
    starIcons += "<i class='fas fa-star-half-alt'></i>";
    }
    for (let i = numStarsFilled + hasHalfStar; i < 5; i++) {
    starIcons += "<i class='far fa-star'></i>";
    }
    cellaRating.innerHTML = starIcons;

    const cellaAnno = document.createElement("td");
    cellaAnno.classList.add("px-4", "py-2");
    cellaAnno.textContent = brano.anno;

    const cellaDataAggiunta = document.createElement("td");
    cellaDataAggiunta.classList.add("px-4", "py-2");
    // Format date (consider using libraries like Moment.js for more control)
    cellaDataAggiunta.textContent = new Date(brano.dataAggiunta).toLocaleDateString();

    elementoTr.appendChild(cellaTitolo);
    elementoTr.appendChild(cellaArtista);
    elementoTr.appendChild(cellaPopolarita);
    elementoTr.appendChild(cellaRating);
    elementoTr.appendChild(cellaAnno);
    elementoTr.appendChild(cellaDataAggiunta);

    listaBrani.appendChild(elementoTr);
});
}

// Call the function to populate the list on page load
popolaBrani();


// New code for search functionality
const searchInput = document.getElementById("barra-cerca");

searchInput.addEventListener("keyup", function() {
const searchTerm = this.value.toLowerCase(); // Convert search term to lowercase for case-insensitive search
cercaBrani(searchTerm); // Call the search function with the search term
});

function cercaBrani(searchTerm) {
// Filter brani based on search term
const filteredBrani = brani.filter(brano => {
const titoloLowerCase = brano.titolo.toLowerCase();
const artistaLowerCase = brano.artista.toLowerCase();
// You can add checks for other song properties if needed
return titoloLowerCase.includes(searchTerm) || artistaLowerCase.includes(searchTerm);
});

// Update table content with filtered data
const listaBrani = document.getElementById("lista-brani");
listaBrani.innerHTML = ""; // Clear existing content
popolaBrani(filteredBrani); // Call popolaBrani with filtered data
}