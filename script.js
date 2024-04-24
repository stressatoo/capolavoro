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

        // Create and append table cells for each song property
        const cellaTitolo = document.createElement("td");
        cellaTitolo.classList.add("px-4", "py-2");
        cellaTitolo.textContent = brano.titolo;
        elementoTr.appendChild(cellaTitolo);

        const cellaArtista = document.createElement("td");
        cellaArtista.classList.add("px-4", "py-2");
        cellaArtista.textContent = brano.artista;
        elementoTr.appendChild(cellaArtista);

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

        elementoTr.appendChild(cellaRating);
        elementoTr.appendChild(cellaAnno);
        elementoTr.appendChild(cellaDataAggiunta);

        listaBrani.appendChild(elementoTr);
    });
}

// Call the function to populate the list on page load
popolaBrani();
