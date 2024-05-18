const brani = [
  {
      titolo: "Enter Sandman",
      artista: "Metallica",
      popolarita: 5,
      rating: 4.5,
      anno: 1991,
      aggiunto: "2023-03-10",
      album: "Metallica",
      genere: "Metal"
  },
  {
      titolo: "Stairway to Heaven",
      artista: "Led Zeppelin",
      popolarita: 4,
      rating: 5,
      anno: 1971,
      aggiunto: "2023-03-15",
      album: "Led Zeppelin IV",
      genere: "Rock"
  },
  // ... altri brani
];

// Funzione per popolare la tabella dei brani in index.html
function popolaBrani(braniDaMostrare) {
  const listaBrani = document.getElementById("lista-brani");
  listaBrani.innerHTML = ""; // Svuota la tabella

  braniDaMostrare.forEach(brano => {
      const tr = document.createElement("tr");
      tr.className = "border-b border-gray-200 hover:bg-gray-100";
      tr.innerHTML = `
          <td class="px-4 py-2"><a href="brano.html?titolo=${brano.titolo}" class="text-indigo-500 hover:underline">${brano.titolo}</a></td>
          <td class="px-4 py-2">${brano.artista}</td>
          <td class="px-4 py-2">${brano.popolarita}</td>
          <td class="px-4 py-2">${brano.rating}</td>
          <td class="px-4 py-2">${brano.anno}</td>
          <td class="px-4 py-2">${brano.aggiunto}</td>
      `;
      listaBrani.appendChild(tr);
  });
}

// Funzione per filtrare i brani in base alla query di ricerca
function cercaBrani(query) {
  const queryLowerCase = query.toLowerCase();
  return brani.filter(brano => {
      return brano.titolo.toLowerCase().includes(queryLowerCase) ||
          brano.artista.toLowerCase().includes(queryLowerCase);
  });
}

// Funzione per gestire l'evento di input nella barra di ricerca
function gestisciInputRicerca() {
  const query = document.getElementById("barra-cerca").value;
  const braniTrovati = cercaBrani(query);
  popolaBrani(braniTrovati);
}

// Funzione per popolare la pagina brano.html con i dettagli del brano
function caricaBrano() {
  const urlParams = new URLSearchParams(window.location.search);
  const titoloBrano = urlParams.get("titolo");

  const brano = brani.find(b => b.titolo === titoloBrano);

  if (brano) {
      document.getElementById("brano-titolo").textContent = brano.titolo;
      document.getElementById("brano-artista").textContent = "Artista: " + brano.artista;
      document.getElementById("brano-album").textContent = "Album: " + brano.album || "-";
      document.getElementById("brano-anno").textContent = "Anno: " + brano.anno;
      document.getElementById("brano-genere").textContent = "Genere: " + brano.genere || "-";

      // Carica tabs, commenti, ecc. qui...
  } else {
      console.error("Brano non trovato:", titoloBrano);
  }
}

// Logica per determinare quale funzione eseguire in base alla pagina corrente
if (window.location.pathname.endsWith("index.html")) {
  // Aggiungi event listener all'evento 'input' della barra di ricerca
  document.getElementById("barra-cerca").addEventListener("input", gestisciInputRicerca);

  // Popola la tabella dei brani iniziale
  popolaBrani(brani);
} else if (window.location.pathname.endsWith("brano.html")) {
  caricaBrano();
}