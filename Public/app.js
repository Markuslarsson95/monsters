// En global array för att lagra ID:n för alla inputfält
const fields = [
  "type-input",
  "name-input",
  "color-input",
  "size-input",
  "eyes-input",
  "viciousness-input",
  "head-input",
];

// Application state - Array för att lagra monster-objekt
// appState håller alla monsterobjekt som dynamiskt läggs till eller uppdateras
const appState = {
  monsters: [
    {
      type: "Maritime Monster", // Typ av monster (kategori)
      name: "Kraken", // Monstrets namn
      color: "blue", // Monstrets färg
      size: 50, // Monstrets storlek
      eyes: 256, // Antal ögon
      viciousness: 100, // Grad av farlighet
      heads: 4, // Antal huvuden
    },
    {
      type: "Terrestrial Beast",
      name: "Mudfang",
      color: "red",
      size: 80,
      eyes: 2,
      viciousness: 10,
      heads: 700,
    },
    {
      type: "Winged Horror",
      name: "Grimpflap",
      color: "black",
      size: 30,
      eyes: 5,
      viciousness: 51,
      heads: 1,
    },
  ],

  // Funktion för att lägga till ett nytt monster i arrayen monsters
  addMonster: () => {
    const newMonster = {};
    fields.forEach((field) => {
      newMonster[field.replace("-input", "")] = document.querySelector(
        `#${field}`
      ).value;
    });
    appState.monsters.push(newMonster);
  },
};
// Funktion för att hämta värden från alla inputfält i formuläret
const getFormData = () => {
  const values = {}; // Ett objekt för att lagra inputvärdena
  fields.forEach((field) => {
    // Fyll objektet med värden från formuläret. Sparar ex color-input: blue. Som en nyckel och dess inmatade värde
    values[field] = document.querySelector(`#${field}`).value;
  });
  return values; // Returnera värdena som ett objekt
};

// Funktion för att fylla formuläret med data från ett monster
const populateForm = (monster) => {
  // Iterera genom fälten och sätt värden i formuläret baserat på monster-data
  fields.forEach((field) => {
    document.querySelector(`#${field}`).value =
      monster[field.replace("-input", "")]; // Tar bort "-input" för att matcha med objekt-nycklar
  });
};

// Funktion för att återställa formulärfälten till tomma
const clearForm = () => {
  // Loop genom varje fält och töm deras värde
  fields.forEach((field) => {
    document.querySelector(`#${field}`).value = "";
  });
};

// Funktion för att skrolla till ett specifikt monsterkort efter att det har lagts till eller redigerats
const scrollToMonsterCard = (index) => {
  const monsterCard = document.querySelector(`#monster-${index}`); // Hitta rätt monsterkort genom dess ID
  if (monsterCard) {
    monsterCard.scrollIntoView({ behavior: "smooth", block: "start" }); // Skrolla till rätt monsterkort
  }
};

// Funktion för att rendera alla monsterkort på sidan
// Loopar genom arrayen monsters i appState och skapar HTML för varje monster
const renderMonsters = () => {
  const cardContainer = document.querySelector(".cards"); // Hämtar containern för korten
  cardContainer.innerHTML = ""; // Tömmer kortcontainern

  // Loopar genom alla monster och skapar ett kort för varje
  appState.monsters.forEach((monster, index) => {
    const monsterCard = document.createElement("div"); // Skapar en ny div för monsterkortet
    monsterCard.id = `monster-${index}`; // Tilldelar ett ID till div:en för skrollning

    // Skapar HTML-strukturen för varje monsters detaljer
    let monsterDetails = `<h2>${monster.name}</h2>`;
    Object.entries(monster).forEach(([key, value]) => {
      // Lägger till varje monster-egenskap som ett stycke
      monsterDetails += `<p>${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}</p>`;
    });

    // Lägger till en redigeringsknapp för varje kort
    monsterDetails += `<button type="button" id="edit" data-index="${index}">Edit</button>`;
    monsterCard.innerHTML = monsterDetails; // Sätter HTML-innehållet för monsterkortet

    cardContainer.appendChild(monsterCard); // Lägger till monsterkortet i containern
  });
};

// Initial render av alla monsterkort
renderMonsters();

// Event listener för att lägga till ett nytt monster när "Add Monster"-knappen trycks
document.querySelector("#submit").addEventListener("click", (e) => {
  e.preventDefault(); // Förhindrar den vanliga formulärinlämningen

  const formData = getFormData(); // Hämtar data från formuläret
  const monsterData = [];

  fields.forEach((field) => {
    monsterData.push(formData[field]);
  });

  appState.addMonster();

  const newIndex = appState.monsters.length - 1; // Hämtar indexet för det nyligen tillagda monstret

  clearForm(); // Tömmer formuläret efter inlämning
  renderMonsters(); // Renderar om alla monster med det nya monstret
  scrollToMonsterCard(newIndex); // Skrollar till det nyligen tillagda monsterkortet
});

// Event listener för att redigera ett monster när "Edit"-knappen trycks
document.addEventListener("click", (e) => {
  if (e.target && e.target.id === "edit") {
    // Skrolla till toppen när ett monster redigeras
    window.scrollTo({ top: 0, behavior: "smooth" });

    const index = e.target.getAttribute("data-index"); // Hämtar indexet för monstret som ska redigeras
    const monster = appState.monsters[index]; // Hämtar rätt monster från appState

    populateForm(monster); // Fyller formuläret med monsterdata

    // Skapar en "Save"-knapp om den inte redan finns
    let saveButton = document.querySelector("#save-button");
    if (!saveButton) {
      saveButton = document.createElement("button");
      saveButton.textContent = "Save Monster";
      saveButton.id = "save-button";
      document.querySelector("#submit").parentNode.appendChild(saveButton); // Lägger till save-knappen
    }

    // Event listener för att spara ändringarna
    saveButton.onclick = (e) => {
      e.preventDefault(); // Förhindrar den vanliga knappfunktionen

      const updatedMonster = getFormData(); // Hämtar uppdaterad data från formuläret
      const updatedData = {};

      fields.forEach((field) => {
        const key = field.replace("-input", ""); // Tar bort "-input" för att matcha nycklar i objektet
        updatedData[key] = updatedMonster[field]; // Sätter rätt nyckel och värde från updatedMonster
      });

      appState.monsters[index] = updatedData;

      clearForm(); // Tömmer formuläret efter sparandet
      saveButton.remove(); // Tar bort save-knappen efter sparandet
      document.querySelector("#cancel-button").remove(); // Tar bort cancel-knappen
      renderMonsters(); // Renderar om den uppdaterade monsterlistan
      scrollToMonsterCard(index); // Skrollar till det uppdaterade monsterkortet
    };

    // Skapar en cancel-knapp om den inte redan finns
    let cancelButton = document.querySelector("#cancel-button");
    if (!cancelButton) {
      cancelButton = document.createElement("button");
      cancelButton.textContent = "Cancel";
      cancelButton.id = "cancel-button";
      document.querySelector("#submit").parentNode.appendChild(cancelButton); // Lägger till cancel-knappen

      // Event listener för att avbryta redigeringen
      cancelButton.onclick = () => {
        clearForm(); // Återställer formulärfälten
        saveButton.remove(); // Tar bort save-knappen
        cancelButton.remove(); // Tar bort cancel-knappen
      };
    }
  }
});
