//////////////////////////////////MonsterUI///////////////////////////////////
/////////////////////////////////||||||||||///////////////////////////////////

import {
  monsterForm,
  statisticsContainer,
  dropdownsContainer,
  dataTypeDropdown,
  dataColorDropdown,
  addMonsterButton,
  cancelButton,
  saveButton,
  cardContainer,
  allTypesOptionElement,
  allColorOptionElement,
  typeSelectors,
  colorSelectors,
} from "./domElements.js";
import { config, state } from "./configAndState.js";

//////////////////////////////////Global Scope variables///////////////////////////////////
//////////////////////////////////||||||||||||||||||||||///////////////////////////////////

//spara element för visning av statistik i variabler
let typeCountDisplay = statisticsContainer.querySelector(".type-display");

let colorCountDisplay = statisticsContainer.querySelector(".color-display");

//////////////////////////////////Global Scope Functions///////////////////////////////////
//////////////////////////////////||||||||||||||||||||||///////////////////////////////////

//funktion för att bygga monster dynamiskt
export const createMonster = (fieldValues) => {
  const monster = {};

  //iterera igenom looks-egenskaper och tilldela värden
  config.fields.forEach((field, index) => {
    monster[field] = fieldValues[index] !== undefined ? fieldValues[index] : 0;
  });
  return monster;
};

const renderMonsterForm = () => {
  config.looks.forEach((look) => {
    const inputElement = document.createElement("input");
    inputElement.setAttribute("id", `${look}`);
    inputElement.min = "0";
    inputElement.max = "100";
    inputElement.step = "1";
    inputElement.setAttribute("placeholder", "0-100");
    inputElement.required = true;
    inputElement.maxLength = "3";
    const labelElement = document.createElement("label");
    labelElement.textContent =
      look.charAt(0).toUpperCase() + look.slice(1) + ":";
    labelElement.setAttribute("for", inputElement.id);
    inputElement.addEventListener("input", function () {
      // Lyssna på input-händelsen
      this.value = this.value.replace(/[^0-9]/g, ""); // Ta bort allt som inte är siffror
      if (this.value.length > 1 && this.value.startsWith("0")) {
        this.value = this.value.replace(/^0+/, "");
      }

      // Begränsa längden till 3 siffror
      if (this.value.length > 3) {
        this.value = this.value.slice(0, 3);
      }

      // Begränsa värdet till 100 om det är större än 100
      const numValue = parseInt(this.value, 10);
      if (numValue > 100) {
        this.value = 100;
      }
    });
    inputElement.name = `${look}`;
    inputElement.className = `${look}`;
    inputElement.type = "number";
    monsterForm.appendChild(labelElement);
    labelElement.appendChild(inputElement);
  });

  monsterForm.appendChild(addMonsterButton);
  monsterForm.appendChild(saveButton);
  monsterForm.appendChild(cancelButton);
};

const renderTypeOptions = () => {
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

export const renderMonsterCards = () => {
  // Sätt standardvärde om dropdown-menyerna inte har ett värde
  const typeFilter = dataTypeDropdown.value || "All Types";
  const colorFilter = dataColorDropdown.value || "All Colors";

  // Filtrera baserat på både typ och färg
  const filteredMonsters = state.monsters.filter((monster) => {
    const matchesType =
      typeFilter === "All Types" || monster.type === typeFilter;
    const matchesColor =
      colorFilter === "All Colors" || monster.color === colorFilter;
    return matchesType && matchesColor; // Monster måste matcha båda filtren
  });

  console.log(`dataTypeDropdown.value${dataTypeDropdown.value}`);
  cardContainer.innerHTML = "";

  if (filteredMonsters.length === 0) {
    cardContainer.innerHTML = "<p>No monsters found matching your filters.</p>";
  } else {
    filteredMonsters.forEach((m, index) => {
      const monster = document.createElement("div");
      const content = [
        `<h2>${m.name}</h2>`,
        `<p><strong>Type:</strong> ${m.type}</p>`,
        `<p><strong>Color:</strong> ${m.color}</p>`,
      ];
      config.looks.forEach((look) => {
        content.push(
          `<p><strong>${look.charAt(0).toUpperCase() + look.slice(1)}:</strong> ${m[look]}</p>`
        );
      });
      content.push(
        `<button type="button" class="edit" data-index="${index}">Edit</button>`
      );
      content.push(
        `<button type="button" class="delete" data-index="${index}">Delete</button>`
      );
      monster.innerHTML = content.join("");
      cardContainer.appendChild(monster);
    });
  }
};

const updateTypeCount = () => {
  // Om alla valts, visa totalt antal monster
  if (dataTypeDropdown.value === "All Types") {
    typeCountDisplay.innerHTML = `Monsters Roaming: <strong class="number">${state.monsters.length}</strong>`;
  } else {
    // Filtrera baserat på det valda värdet
    const filteredMonsters = state.monsters.filter(
      (monster) => monster.type === dataTypeDropdown.value
    );
    if (filteredMonsters.length > 1) {
      typeCountDisplay.innerHTML = `<strong>Behold!</strong> Your horde of <em>${dataTypeDropdown.value}s</em> now numbers <strong class="number">${filteredMonsters.length}</strong> strong!`;
    } else if (filteredMonsters.length === 1) {
      typeCountDisplay.innerHTML = `A <strong>lone</strong> <em>${dataTypeDropdown.value}</em> has surfaced, fierce and ready!`;
    } else {
      typeCountDisplay.innerHTML =
        "The land lies shrouded in an eerie silence...";
    }
  }
};
// Uppdatera visningen av antalet monster i statisticsContainer baserat på färg
const updateColorCount = () => {
  // Om "All" valts, visa totalt antal monster
  if (dataColorDropdown.value === "All Colors") {
    colorCountDisplay.innerHTML = `Monsters Roaming: <strong class="number">${state.monsters.length}</strong>`;
  } else {
    // Filtrera baserat på det valda värdet
    const filteredMonsters = state.monsters.filter(
      (monster) => monster.color === dataColorDropdown.value
    );

    if (filteredMonsters.length > 1) {
      colorCountDisplay.innerHTML = `The land echoes with the footsteps of <em class="${dataColorDropdown.value}">${dataColorDropdown.value}</em> monsters, now numbering <strong class="number">${filteredMonsters.length}</strong> strong!`;
    } else if (filteredMonsters.length === 1) {
      colorCountDisplay.innerHTML = `A solitary <em class="${dataColorDropdown.value}">${dataColorDropdown.value}</em> monster roams the wild, fierce and mysterious.`;
    } else {
      colorCountDisplay.innerHTML = `The world remains untouched by monsters of <em class="${dataColorDropdown.value}">${dataColorDropdown.value}</em>...`;
    }
  }
};
export const updateStatistics = () => {
  updateTypeCount();
  updateColorCount();
};

const renderMonsterStatistics = () => {
  // Uppdatera visningen av antalet monster i statisticsContainer baserat på typ
  // Lägg till "All Types"-alternativ i dropdownmenyerna för monster-typ och -färg, och sätt "All Types" som förvalt val.
  if (!allTypesOptionElement) {
    const typeOptionAll = new Option("All Types", "All Types");
    dataTypeDropdown.insertBefore(typeOptionAll, dataTypeDropdown.firstChild);
  }

  if (!allColorOptionElement) {
    const colorOptionAll = new Option("All Colors", "All Colors");
    dataColorDropdown.insertBefore(
      colorOptionAll,
      dataColorDropdown.firstChild
    );
  }

  // Sätt "All" som förvalt val för dropdown-menyerna
  dataTypeDropdown.value = "All Types";
  dataColorDropdown.value = "All Colors";

  // Kontrollera om typ-räkningsdisplayen redan existerar, annars skapa den
  if (!typeCountDisplay) {
    typeCountDisplay = document.createElement("div");
    typeCountDisplay.className = "monster-stat type-display";
    dropdownsContainer.append(typeCountDisplay);
  }

  // Kontrollera om färg-räkningsdisplayen redan existerar, annars skapa den
  if (!colorCountDisplay) {
    colorCountDisplay = document.createElement("div");
    colorCountDisplay.className = "monster-stat color-display";
    dropdownsContainer.append(colorCountDisplay);
  }

  // Lägg till event-lyssnare för att uppdatera statistiken om de inte redan finns
  if (!dataTypeDropdown.hasAttribute("data-listener")) {
    dataTypeDropdown.addEventListener("change", () => {
      updateTypeCount();
      renderMonsterCards();
    });
    dataTypeDropdown.setAttribute("data-listener", true);
  }

  if (!dataColorDropdown.hasAttribute("data-listener")) {
    dataColorDropdown.addEventListener("change", () => {
      updateColorCount();
      renderMonsterCards();
    });
    dataColorDropdown.setAttribute("data-listener", true);
  }

  // Inledande uppdatering av monsterstatistik baserat på valda typer
  updateStatistics();
  renderMonsterCards();

  dropdownsContainer.append(typeCountDisplay, colorCountDisplay);
};

export const render = () => {
  renderMonsterForm();
  renderTypeOptions();
  renderColorOptions();
  // Lägg till event-lyssnare för att trigga filtreringen varje gång dropdowns ändras
  dataTypeDropdown.addEventListener("change", renderMonsterCards);
  dataColorDropdown.addEventListener("change", renderMonsterCards);

  // Initial rendering av monsterkort
  renderMonsterCards();
  renderMonsterStatistics();
};
