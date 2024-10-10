//variabler i Global Scope
const typeDropdown = document.querySelector("#type-data");
const colorDropdown = document.querySelector("#color-data");
const statisticsContainer = document.querySelector("#data-form");

let saveButton = document.querySelector("#save-monster");
if (!saveButton) {
  saveButton = document.createElement("button");
  saveButton.id = "save-monster";
  saveButton.textContent = "Save Monster";
  document.querySelector("#add-form").appendChild(saveButton);
  saveButton.style.display = "none";
}

let typeCountDisplay = statisticsContainer.querySelector(".type-display");
let colorCountDisplay = statisticsContainer.querySelector(".color-display");

//Funktioner i Global Scope
const renderMonsterOptions = () => {
  const typeSelectors = document.querySelectorAll(".type-input");
  typeSelectors.forEach((typeSelector) => {
    typeSelector.innerHTML = "";

    typeOptions.forEach((option) => {
      const optionElement = document.createElement("option");
      optionElement.value = option;
      optionElement.textContent = option;
      typeSelector.appendChild(optionElement);
    });
  });
};

const renderColorOptions = () => {
  const colorSelectors = document.querySelectorAll(".color-input");
  colorSelectors.forEach((colorSelector) => {
    colorSelector.innerHTML = "";
    colorOptions.forEach((color) => {
      const optionElement = document.createElement("option");
      optionElement.value = color;
      optionElement.textContent = color;
      colorSelector.appendChild(optionElement);
    });
  });
};

const updateTypeCount = () => {
  // Om alla valts, visa totalt antal monster
  if (typeDropdown.value === "All") {
    typeCountDisplay.innerHTML = `Number of monsters: ${state.monsters.length}`;
  } else {
    // Filtrera baserat på det valda värdet
    const filteredMonsters = state.monsters.filter(
      (monster) => monster.type === typeDropdown.value
    );
    if (filteredMonsters.length > 1) {
      typeCountDisplay.innerHTML = `Behold! Your horde of ${typeDropdown.value}s now numbers <strong>${filteredMonsters.length}</strong> strong!`;
    } else {
      console.log(typeDropdown.value);
      typeCountDisplay.innerHTML = `A <strong>lone</strong> <em>${typeDropdown.value}</em> has surfaced, fierce and ready!`;
    }
  }
};

// Uppdatera visningen av antalet monster i statisticsContainer baserat på färg
const updateColorCount = () => {
  // Om "All" valts, visa totalt antal monster
  if (colorDropdown.value === "All") {
    colorCountDisplay.innerHTML = `Number of monsters: ${state.monsters.length}`;
  } else {
    // Filtrera baserat på det valda värdet
    const filteredMonsters = state.monsters.filter(
      (monster) => monster.color === colorDropdown.value
    );
    if (filteredMonsters.length > 1) {
      colorCountDisplay.innerHTML = `<em>${colorDropdown.value}</em>s now numbers <strong>${filteredMonsters.length}</strong> strong!`;
    } else {
      console.log(colorDropdown.value);
      colorCountDisplay.innerHTML = `A <strong>lone</strong> <em>${colorDropdown.value}</em> has surfaced, fierce and ready!`;
    }
  }
};

const renderFormOptions = () => {
  renderMonsterOptions();
  renderColorOptions();
  renderMonsterStatistics();
};

const renderMonsterStatistics = () => {
  // Uppdatera visningen av antalet monster i statisticsContainer baserat på typ

  // Lägg till "All"-alternativ i dropdownmenyerna för monster-typ och -färg, och sätt "All" som förvalt val.

  if (!typeDropdown.querySelector("option[value='All]")) {
    const typeOptionAll = new Option("All", "All");
    const colorOptionAll = new Option("All", "All");

    typeDropdown.insertBefore(typeOptionAll, typeDropdown.firstChild);
    colorDropdown.insertBefore(colorOptionAll, colorDropdown.firstChild);

    // Sätt "All" som förvalt val
    typeDropdown.value = "All";
    colorDropdown.value = "All";
  }

  const statisticsContainer = document.querySelector("#data-form");

  if (!typeCountDisplay) {
    typeCountDisplay = document.createElement("div");
    typeCountDisplay.className = "monster-stat type-display";
    statisticsContainer.appendChild(typeCountDisplay);
  }

  if (!colorCountDisplay) {
    colorCountDisplay = document.createElement("div");
    colorCountDisplay.className = "monster-stat color-display";
    statisticsContainer.appendChild(colorCountDisplay);
  }

  //Lägg till event-lyssnare för att uppdatera statistiken om de inte redan finns
  if (!typeDropdown.hasAttribute("data-listener")) {
    typeDropdown.addEventListener("change", updateTypeCount);
    typeDropdown.setAttribute("data-listener", true);
  }

  if (!colorDropdown.hasAttribute("data-listener")) {
    colorDropdown.addEventListener("change", updateColorCount);
    colorDropdown.setAttribute("data-listener", true);
  }

  // Inledande uppdatering av monsterstatistik baserat på valda typer
  updateTypeCount();
  updateColorCount();

  typeDropdown.addEventListener("change", updateTypeCount);
  colorDropdown.addEventListener("change", updateColorCount);
  statisticsContainer.append(typeCountDisplay, colorCountDisplay);
  updateTypeCount();
  updateColorCount();
};

const renderMonsters = () => {
  const card = document.querySelector(".cards");
  card.innerHTML = "";

  state.monsters.forEach((m, index) => {
    const monster = document.createElement("div");
    monster.innerHTML = `
      <h2>${m.name}</h2>
      <p>Type: ${m.type}</p>
      <p>Color: ${m.color}</p>
      <p>Size: ${m.size}</p>
      <p>Eye Amount: ${m.eyes}</p>
      <p>Viciousness: ${m.viciousness}</p>
      <p>Head Amount: ${m.head}</p>
      <button type="button" class="edit" data-index="${index}">Edit</button>
    `;
    card.appendChild(monster);
  });
};

const typeOptions = ["Maritime Monster", "Terrestrial Beast", "Winged Horror"];

const colorOptions = ["Blue", "Green", "Yellow", "Pink", "Red"];

const fields = [
  "type-input",
  "name-input",
  "color-input",
  "size-input",
  "eyes-input",
  "viciousness-input",
  "head-input",
];

// state- Skapa array med objekt(monster)
const state = {
  monsters: [
    {
      type: typeOptions[0],
      name: "Kraken",
      color: colorOptions[0],
      size: 50,
      eyes: 256,
      viciousness: 100,
      head: 4,
    },
    {
      type: typeOptions[1],
      name: "Mudfang",
      color: colorOptions[4],
      size: 80,
      eyes: 2,
      viciousness: 10,
      head: 700,
    },
    {
      type: typeOptions[2],
      name: "Grimpflap",
      color: colorOptions[3],
      size: 30,
      eyes: 5,
      viciousness: 51,
      head: 1,
    },
  ],

  //add Monster
  addMonster: function (type, name, color, size, eyes, viciousness, head) {
    this.monsters.push({
      type,
      name,
      color,
      size,
      eyes,
      viciousness,
      head,
    });
  },

  //funktion för att rensa inputfälten i formen
  clearForm: () => {
    fields.forEach((field) => {
      document.querySelector(`.${field}`).value = "";
    });
    document.querySelector(".type-input").value = typeOptions[0];
    document.querySelector(".color-input").value = colorOptions[0];
  },

  //funktion för att hämta data från inputfälten
  getFormData: () => {
    const formData = [];
    fields.forEach((field) => {
      const value = document.querySelector(`.${field}`).value;
      formData.push(value);
    });
    return formData;
  },

  //funktion för att fylla i inputfälten med data
  populateForm: (monster) => {
    fields.forEach((field) => {
      document.querySelector(`.${field}`).value =
        monster[field.replace("-input", "")];
    });
  },
};

renderFormOptions();

// app
// initial render
console.log("Rendering monsters:", state.monsters);
renderMonsters();

//lyssnare för Add Monster
document.querySelector("#submit").addEventListener("click", (e) => {
  e.preventDefault();

  const formData = state.getFormData();

  state.addMonster(...formData);

  state.clearForm();
  // Rendera om monsterlistan
  renderMonsters();
  // Uppdatera statistiken för typ och färg efter att ha lagt till ett nytt monster
  updateTypeCount();
  updateColorCount();
});

//lyssnare för edit
const cardContainer = document.querySelector(".cards");

//hur funkar det med event.target osv.?
cardContainer.addEventListener("click", (event) => {
  if (event.target && event.target.classList.contains("edit")) {
    const index = event.target.getAttribute("data-index");
    const monster = state.monsters[index];
    state.populateForm(monster);

    saveButton.setAttribute("data-index", index);
    saveButton.style.display = "inline-block"; // Gör knappen synlig
  }
});

//lyssnare saveButton
saveButton.addEventListener("click", (e) => {
  e.preventDefault();
  const index = saveButton.getAttribute("data-index");
  const formData = state.getFormData();

  const updatedMonster = {}; // Skapa ett tomt objekt för att lagra de uppdaterade värdena

  fields.forEach((field, inputValue) => {
    updatedMonster[field.replace("-input", "")] = formData[inputValue];
  });

  state.monsters[index] = updatedMonster; // Tilldela det uppdaterade monstret till rätt index

  state.clearForm();
  saveButton.removeAttribute("data-index");
  saveButton.style.display = "none";
  renderMonsters(); // Rendera om listan
});
