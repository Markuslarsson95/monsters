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

// Deklarera Cancel-knappen globalt
let cancelButton = document.querySelector("#cancel-monster");
if (!cancelButton) {
  cancelButton = document.createElement("button");
  cancelButton.id = "cancel-edit";
  cancelButton.textContent = "Cancel";
  document.querySelector("#add-form").appendChild(cancelButton);
  cancelButton.style.display = "none";
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
    typeCountDisplay.innerHTML = `Monsters Roaming: <strong class="number">${state.monsters.length}</strong>`;
  } else {
    // Filtrera baserat på det valda värdet
    const filteredMonsters = state.monsters.filter(
      (monster) => monster.type === typeDropdown.value
    );
    if (filteredMonsters.length > 1) {
      typeCountDisplay.innerHTML = `<strong>Behold!</strong> Your horde of <em>${typeDropdown.value}s</em> now numbers <strong class="number">${filteredMonsters.length}</strong> strong!`;
    } else if (filteredMonsters.length === 1) {
      typeCountDisplay.innerHTML = `A <strong>lone</strong> <em>${typeDropdown.value}</em> has surfaced, fierce and ready!`;
    } else {
      typeCountDisplay.innerHTML =
        "The land lies shrouded in an eerie silence...";
    }
  }
};

// Uppdatera visningen av antalet monster i statisticsContainer baserat på färg
const updateColorCount = () => {
  // Om "All" valts, visa totalt antal monster
  if (colorDropdown.value === "All") {
    colorCountDisplay.innerHTML = `Monsters Roaming: <strong class="number">${state.monsters.length}</strong>`;
  } else {
    // Filtrera baserat på det valda värdet
    const filteredMonsters = state.monsters.filter(
      (monster) => monster.color === colorDropdown.value
    );

    if (filteredMonsters.length > 1) {
      colorCountDisplay.innerHTML = `The land echoes with the footsteps of <em class="${colorDropdown.value}">${colorDropdown.value}</em> monsters, now numbering <strong class="number">${filteredMonsters.length}</strong> strong!`;
    } else if (filteredMonsters.length === 1) {
      colorCountDisplay.innerHTML = `A solitary <em class="${colorDropdown.value}">${colorDropdown.value}</em> monster roams the wild, fierce and mysterious.`;
    } else {
      colorCountDisplay.innerHTML = "";
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

  const dropdownsContainer = document.querySelector(".dropdowns");

  if (!typeCountDisplay) {
    typeCountDisplay = document.createElement("div");
    typeCountDisplay.className = "monster-stat type-display";
    dropdownsContainer.append(typeCountDisplay);
  }

  if (!colorCountDisplay) {
    colorCountDisplay = document.createElement("div");
    colorCountDisplay.className = "monster-stat color-display";
    dropdownsContainer.append(colorCountDisplay);
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
  dropdownsContainer.append(typeCountDisplay, colorCountDisplay);
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
      <p>Eyes: ${m.eyes}</p>
      <p>Viciousness: ${m.viciousness}</p>
      <p>Heads: ${m.head}</p>
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

renderMonsters();

//lyssnare för Add Monster
document.querySelector("#submit").addEventListener("click", (e) => {
  e.preventDefault();

  cancelButton.style.display = "none";
  saveButton.style.display = "none";
  addTextChange.textContent = "Add Monster";
  const formData = state.getFormData();

  state.addMonster(...formData);

  state.clearForm();
  // Rendera om monsterlistan
  renderMonsters();

  const scrollBottom = document.querySelector("footer");
  scrollBottom.scrollIntoView({ behavior: "smooth" });
  // Uppdatera statistiken för typ och färg efter att ha lagt till ett nytt monster
  updateTypeCount();
  updateColorCount();
});

//lyssnare för edit
const cardContainer = document.querySelector(".cards");
const addTextChange = document.querySelector("#submit");
//hur funkar det med event.target osv.?
cardContainer.addEventListener("click", (event) => {
  if (event.target && event.target.classList.contains("edit")) {
    const index = event.target.getAttribute("data-index");
    const monster = state.monsters[index];
    state.populateForm(monster);

    saveButton.setAttribute("data-index", index);
    saveButton.style.display = "inline-block"; // Gör saveButton synlig
    cancelButton.style.display = "inline-block"; // Gör cancelButton synlig

    //för att scrolla upp
    const scrollTop = document.querySelector(".top-divs");
    scrollTop.scrollIntoView({ behavior: "smooth" });

    addTextChange.textContent = "Copy Monster";
  }
});

//lyssnare saveButton
saveButton.addEventListener("click", (e) => {
  e.preventDefault();
  addTextChange.textContent = "Add Monster";
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
  cancelButton.style.display = "none";
  renderMonsters(); // Rendera om listan

  const monsterElements = document.querySelectorAll(".cards > div");
  const monsterElement = monsterElements[index];
  if (monsterElement) {
    monsterElement.scrollIntoView({ behavior: "smooth" });
  }
});

//lyssnare cancellButton

cancelButton.addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("add-form").reset();
  cancelButton.style.display = "none";
  saveButton.style.display = "none";
  addTextChange.textContent = "Add Monster"; //Gör så att texten återvänder till "add monster" istället för "copy monster"
  updateTypeCount();
  updateColorCount();
});
