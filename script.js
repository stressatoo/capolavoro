// Esempi di brani da visualizzare nella pagina iniziale
const brani = [
    { titolo: "Smells Like Teen Spirit", artista: "Nirvana", popolarità: 80, rating: 4.8, anno: 1991, dataAggiunta: "2024-04-20" },
    { titolo: "Bohemian Rhapsody", artista: "Queen", popolarità: 90, rating: 4.9, anno: 1975, dataAggiunta: "2024-04-19" },
    { titolo: "Stairway to Heaven", artista: "Led Zeppelin", popolarità: 78, rating: 4.7, anno: 1971, dataAggiunta: "2024-04-18" },
    { titolo: "Imagine", artista: "John Lennon", popolarità: 85, rating: 4.8, anno: 1971, dataAggiunta: "2024-04-17" },
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
        cellaTitolo.textContent = brano.titolo; // Access 'titolo' property
        elementoTr.appendChild(cellaTitolo);

        const cellaArtista = document.createElement("td");
        cellaArtista.classList.add("px-4", "py-2");
        cellaArtista.textContent = brano.artista; // Access 'artista' property
        elementoTr.appendChild(cellaArtista);

        const cellaPopolarita = document.createElement("td");
        cellaPopolarita.classList.add("px-4", "py-2");
        cellaPopolarita.textContent = brano.popolarità + "%"; // Access 'popolarità' property

        const cellaRating = document.createElement("td");
        cellaRating.classList.add("px-4", "py-2");
        cellaRating.textContent = brano.rating.toFixed(1) + "/5"; // Access 'rating' property

        const cellaAnno = document.createElement("td");
        cellaAnno.classList.add("px-4", "py-2");
        cellaAnno.textContent = brano.anno; // Access 'anno' property

        const cellaDataAggiunta = document.createElement("td");
        cellaDataAggiunta.classList.add("px-4", "py-2");
        // Format date (consider using libraries like Moment.js for more control)
        cellaDataAggiunta.textContent = new Date(brano.dataAggiunta).toLocaleDateString();

        elementoTr.appendChild(cellaPopolarita);
        elementoTr.appendChild(cellaRating);
        elementoTr.appendChild(cellaAnno);
        elementoTr.appendChild(cellaDataAggiunta);

        listaBrani.appendChild(elementoTr);
    });
}

// Call the function to populate the list on page load
popolaBrani();
