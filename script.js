document.addEventListener('DOMContentLoaded', (event) => {
    // Array per contenere titolo, artista, popolarità, anno, data di aggiunta, album, genere e path del pdf relativi al brano
    const brani = [
      {
          titolo: "Enter Sandman",
          artista: "Metallica",
          popolarita: 4.5,
          anno: 1991,
          aggiunto: "10/03/2023",
          album: "Metallica",
          genere: "Metal",
          pdf: "pdf/enter_sandman.pdf" 
      },
      {
          titolo: "Stairway to Heaven",
          artista: "Led Zeppelin",
          popolarita: 5,
          anno: 1971,
          aggiunto: "15/03/2023",
          album: "Led Zeppelin IV",
          genere: "Rock",
          pdf: "pdf/stairway_to_heaven.pdf" 
      },
      {
        titolo: "Can't Help Falling in Love",
        artista: "Elvis Presley",
        popolarita: 4.5,
        anno: 1961,
        aggiunto: "21/05/2024",
        album: "Blue Hawaii",
        genere: "Pop",
        pdf: "pdf/cant_help_falling_in_love.pdf" 
    },
    {
        titolo: "Creep",
        artista: "Radiohead",
        popolarita: 4,
        anno: 1993,
        aggiunto: "13/02/2024",
        album: "Pablo Honey",
        genere: "Rock",
        pdf: "pdf/creep.pdf" 
    },
    {
        titolo: "Hallelujah",
        artista: "Jeff Buckley",
        popolarita: 4.5,
        anno: 2007,
        aggiunto: "26/03/2024",
        album: "Grace",
        genere: "Folk rock",
        pdf: "pdf/hallelujah.pdf" 
    },
    {
        titolo: "Hotel California",
        artista: "Eagles",
        popolarita: 5,
        anno: 1977,
        aggiunto: "05/04/2024",
        album: "Hotel California",
        genere: "Rock",
        pdf: "pdf/hotel_california.pdf" 
    },
    {
        titolo: "I'm Yours",
        artista: "Jason Mraz",
        popolarita: 4,
        anno: 2008,
        aggiunto: "08/04/2024",
        album: "We Sing. We Dance. We Steal Things.",
        genere: "Pop",
        pdf: "pdf/im_yours.pdf" 
    },
    {
        titolo: "Let Her Go",
        artista: "Passenger",
        popolarita: 4.5,
        anno: 2012,
        aggiunto: "13/05/2024",
        album: "All the Little Lights",
        genere: "Folk rock",
        pdf: "pdf/let_her_go.pdf" 
    },
    {
        titolo: "Thinking Out Loud",
        artista: "Ed Sheeran",
        popolarita: 4,
        anno: 2014,
        aggiunto: "23/05/2024",
        album: "X",
        genere: "Soul bianco",
        pdf: "pdf/thinking_out_loud.pdf" 
    },
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
          tr.className = "border-b border-gray-200 hover:bg-gray-200 dark:border-gray-700 dark:hover:bg-gray-800";
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
  if (window.location.pathname === "/" || window.location.pathname.endsWith("/index.html")) {
    // Aggiungi event listener all'evento 'input' della barra di ricerca
    document.getElementById("barra-cerca").addEventListener("input", gestisciInputRicerca);

    // Popola la tabella dei brani iniziale
    popolaBrani(brani);
  } else if (window.location.pathname.endsWith("brano.html")) {
    caricaBrano();
  }

    // Dark mode
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const html = document.documentElement; // Seleziona l'elemento HTML

    // Controlla se la dark mode è abilitata nel localStorage
    if (localStorage.getItem("darkMode") === "enabled") {
        html.classList.add("dark"); // Aggiungi la classe "dark" all'elemento HTML
    }

    darkModeToggle.addEventListener("click", () => {
        html.classList.toggle("dark"); // Attiva/disattiva la classe "dark" sull'elemento HTML
        if (html.classList.contains("dark")) {
        localStorage.setItem("darkMode", "enabled");
        } else {
        localStorage.setItem("darkMode", "disabled");
        }
    });
});