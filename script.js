document.addEventListener('DOMContentLoaded', (event) => {
    const brani = [
      {
          titolo: "Enter Sandman",
          artista: "Metallica",
          popolarita: 4.5,
          anno: 1991,
          aggiunto: "2023-03-10",
          album: "Metallica",
          genere: "Metal",
          pdf: "enter_sandman.pdf" // Aggiungi l'URL del PDF
      },
      {
          titolo: "Stairway to Heaven",
          artista: "Led Zeppelin",
          popolarita: 5,
          anno: 1971,
          aggiunto: "2023-03-15",
          album: "Led Zeppelin IV",
          genere: "Rock",
          pdf: "stairway_to_heaven.pdf" // Aggiungi l'URL del PDF
      },
      // ... altri brani
  ];

  // Funzione per generare le stelle HTML
  function generaStelle(voto) {
      let stelleHTML = '';
      const votoIntero = Math.floor(voto);
      const mezzaStella = voto - votoIntero >= 0.5;

      for (let i = 0; i < votoIntero; i++) {
          stelleHTML += '<i class="fas fa-star text-yellow-500"></i>';
      }

      if (mezzaStella) {
          stelleHTML += '<i class="fas fa-star-half-alt text-yellow-500"></i>';
      }

      for (let i = votoIntero + (mezzaStella ? 1 : 0); i < 5; i++) {
          stelleHTML += '<i class="far fa-star text-yellow-500"></i>';
      }

      return stelleHTML;
  }

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
          <td class="px-4 py-2">${generaStelle(brano.popolarita)}</td>
          <td class="px-4 py-2">${brano.anno}</td>
          <td class="px-4 py-2">${brano.aggiunto}</td>
      `;
          listaBrani.appendChild(tr);
      });
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
          document.getElementById("brano-popolarita").innerHTML = "Popolarità: " + generaStelle(brano.popolarita);
          document.getElementById("pdf-viewer").src = brano.pdf; 

      } else {
          console.error("Brano non trovato:", titoloBrano);
      }
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

  // Logica per determinare quale funzione eseguire in base alla pagina corrente
  if (window.location.pathname.endsWith("index.html")) {
      // Aggiungi event listener all'evento 'input' della barra di ricerca
      document.getElementById("barra-cerca").addEventListener("input", gestisciInputRicerca);

      // Popola la tabella dei brani iniziale
      popolaBrani(brani);
  } else if (window.location.pathname.endsWith("brano.html")) {
      caricaBrano();
  }
});