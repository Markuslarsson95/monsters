//variabler i Global Scope
const typeDropdown = document.querySelector("#type-data");
const colorDropdown = document.querySelector("#color-data");
const statisticsContainer = document.querySelector("#data-form");
const addForm = document.querySelector("#add-form");

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

//funktion för att bygga monster dynamiskt
const createMonster = (type, name, color, lookValues) => {
  const monster = {
    type,
    name,
    color,
  };
  //iterera igenom looks-egenskaper och tilldela värden
  config.looks.forEach((look, index) => {
    monster[look] = lookValues[index];
  });
  return monster;
};

const renderAddForm = () => {
  config.looks.forEach((look) => {
    const pElement = document.createElement("p");
    const labelElement = document.createElement("label");
    labelElement.textContent = look.charAt(0).toUpperCase() + look.slice(1);
    pElement.appendChild(labelElement);
    const inputElement = document.createElement("input");
    inputElement.name = `${look}`;
    inputElement.className = `${look}`;
    inputElement.type = "number";
    addForm.appendChild(pElement);
    addForm.appendChild(inputElement);
  });
  const buttonElement = document.createElement("button");
  buttonElement.type = "submit";
  buttonElement.id = "submit";
  buttonElement.textContent = "Add Monster";
  addForm.appendChild(buttonElement);
  addForm.appendChild(saveButton);
  addForm.appendChild(cancelButton);
};

const renderTypeOptions = () => {
  console.log(config.typeOptions);
  const typeSelectors = document.querySelectorAll(".type");
  typeSelectors.forEach((typeSelector) => {
    typeSelector.innerHTML = "";

    config.typeOptions.forEach((option) => {
      const optionElement = document.createElement("option");
      optionElement.value = option;
      optionElement.textContent = option;
      typeSelector.appendChild(optionElement);
    });
  });
};

const renderColorOptions = () => {
  const colorSelectors = document.querySelectorAll(".color");
  colorSelectors.forEach((colorSelector) => {
    colorSelector.innerHTML = "";
    config.colorOptions.forEach((color) => {
      const optionElement = document.createElement("option");
      optionElement.value = color;
      optionElement.textContent = color;
      colorSelector.appendChild(optionElement);
    });
  });
};

const renderMonsters = () => {
  const card = document.querySelector(".cards");
  card.innerHTML = "";

  state.monsters.forEach((m, index) => {
    const monster = document.createElement("div");
    const content = [
      `<h2>${m.name}</h2>`,
      `<p>Type: ${m.type}</p>`,
      `<p>Color: ${m.color}</p>`,
    ];
    config.looks.forEach((look) => {
      content.push(
        `<p>${look.charAt(0).toUpperCase() + look.slice(1)}: ${m[look]}</p>`
      );
    });
    content.push(
      `<button type="button" class="edit" data-index="${index}">Edit</button>`
    );
    monster.innerHTML = content.join("");
    card.appendChild(monster);
  });
};

const updateTypeCount = () => {
  // Om alla valts, visa totalt antal monster
  if (typeDropdown.value === "All Types") {
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
  if (colorDropdown.value === "All Colors") {
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
      colorCountDisplay.innerHTML = `The world remains untouched by monsters of <em class="${colorDropdown.value}">${colorDropdown.value}</em>...`;
    }
  }
};

const renderMonsterStatistics = () => {
  // Uppdatera visningen av antalet monster i statisticsContainer baserat på typ
  // Lägg till "All Types"-alternativ i dropdownmenyerna för monster-typ och -färg, och sätt "All Types" som förvalt val.
  if (!typeDropdown.querySelector("option[value='All Types']")) {
    const typeOptionAll = new Option("All Types", "All Types");

    typeDropdown.insertBefore(typeOptionAll, typeDropdown.firstChild);

    // Sätt "All" som förvalt val
    typeDropdown.value = "All Types";
  }
  if (!colorDropdown.querySelector("option[value='All Colors']")) {
    const colorOptionAll = new Option("All Colors", "All Colors");

    colorDropdown.insertBefore(colorOptionAll, colorDropdown.firstChild);

    // Sätt "All" som förvalt val
    colorDropdown.value = "All Colors";
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

  dropdownsContainer.append(typeCountDisplay, colorCountDisplay);
};

const render = () => {
  renderAddForm();
  renderTypeOptions();
  renderColorOptions();
  renderMonsters();
  renderMonsterStatistics();
};

const formHandler = {
  //funktion för att rensa inputfälten i formen
  clearForm: () => {
    config.fields.forEach((field) => {
      document.querySelector(`.${field}`).value = "";
    });
    typeDropdown.value = config.typeOptions[0];
    colorDropdown.value = config.colorOptions[0];
  },

  //funktion för att hämta data från inputfälten
  getFormData: () => {
    const formData = [];
    config.fields.forEach((field) => {
      const value = document.querySelector(`.${field}`).value;
      formData.push(value);
    });
    return formData;
  },

  //funktion för att fylla i inputfälten med data
  populateForm: (monster) => {
    config.fields.forEach((field) => {
      document.querySelector(`.${field}`).value = monster[field];
    });
  },
};

// Konfigurationsobjekt för att lagra monster-relaterade inställningar
// Innehåller typalternativ, färgalternativ, utseendeattribut och fält
// Dessa inställningar används för att bygga och rendera monsterkort i applikationen
const config = {
  typeOptions: ["Maritime Monster", "Terrestrial Beast", "Winged Horror"],

  colorOptions: ["Blue", "Green", "Yellow", "Pink", "Red"],

  // ändra denna för att kunna ändra på utseendealternativen
  looks: ["size", "eyes", "viciousness", "head"],

  fields: ["type", "name", "color"],
};
config.fields.push(...config.looks);

// state- Skapa array med objekt(monster)
const state = {
  monsters: [
    createMonster(
      config.typeOptions[0],
      "Kraken",
      config.colorOptions[0],
      [50, 100, 50, 4]
    ),
    createMonster(
      config.typeOptions[1],
      "Mudfang",
      config.colorOptions[4],
      [30, 5, 51, 1]
    ),
    createMonster(
      config.typeOptions[2],
      "Grimflap",
      config.colorOptions[3],
      [30, 5, 51, 1]
    ),
  ],

  //add Monster
  addMonster: function (type, name, color, size, eyes, viciousness, head) {
    const newMonster = createMonster(type, name, color, [
      size,
      eyes,
      viciousness,
      head,
    ]);
    this.monsters.push(newMonster);
  },
};

// app
// initial render
render();

//lyssnare för Add Monster
document.querySelector("#submit").addEventListener("click", (e) => {
  e.preventDefault();

  cancelButton.style.display = "none";
  saveButton.style.display = "none";
  addTextChange.textContent = "Add Monster";
  const formData = formHandler.getFormData();

  state.addMonster(...formData);

  formHandler.clearForm();
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
    formHandler.populateForm(monster);

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
  const formData = formHandler.getFormData();

  const updatedMonster = {}; // Skapa ett tomt objekt för att lagra de uppdaterade värdena

  config.fields.forEach((field, inputValue) => {
    updatedMonster[field] = formData[inputValue];
  });

  state.monsters[index] = updatedMonster; // Tilldela det uppdaterade monstret till rätt index

  formHandler.clearForm();
  saveButton.removeAttribute("data-index");
  saveButton.style.display = "none";
  cancelButton.style.display = "none";
  renderMonsters(); // Rendera om listan

  const monsterElements = document.querySelectorAll(".cards > div");
  const monsterElement = monsterElements[index];
  if (monsterElement) {
    monsterElement.scrollIntoView({ behavior: "smooth" });
  }
  updateTypeCount();
  updateColorCount();
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
