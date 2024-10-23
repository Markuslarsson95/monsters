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

export const renderMonsterCards = (monsters) => {
  cardContainer.innerHTML = "";

  monsters.forEach((m, index) => {
    const monster = document.createElement("div");
    const content = [
      `<h2>${m.name}</h2>`,
      `<p><strong>Type:</strong> ${m.type}</p>`,
      `<p><strong>Color:</strong> ${m.color}</p>`,
    ];
    config.looks.forEach((look) => {
      content.push(
        `<p><strong>${look.charAt(0).toUpperCase() + look.slice(1)}:</strong> ${
          m[look]
        }</p>`
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
};

const updateTypeCount = () => {
  // Om alla valts, visa totalt antal monster
  if (dataTypeDropdown.value === "All Types") {
    typeCountDisplay.innerHTML = `Monsters Roaming: <strong class="number">${
      getFilteredMonsters().length
    }</strong>`;
  } else {
    // Filtrera baserat på det valda värdet
    const filteredMonsters = getFilteredMonsters();
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
    colorCountDisplay.innerHTML = `Monsters Roaming: <strong class="number">${
      getFilteredMonsters().length
    }</strong>`;
  } else {
    // Filtrera baserat på det valda värdet
    const filteredMonsters = getFilteredMonsters();

    if (filteredMonsters.length > 1) {
      colorCountDisplay.innerHTML = `The land echoes with the footsteps of <em class="${dataColorDropdown.value}">${dataColorDropdown.value}</em> monsters, now numbering <strong class="number">${filteredMonsters.length}</strong> strong!`;
    } else if (filteredMonsters.length === 1) {
      colorCountDisplay.innerHTML = `A solitary <em class="${dataColorDropdown.value}">${dataColorDropdown.value}</em> monster roams the wild, fierce and mysterious.`;
    } else {
      colorCountDisplay.innerHTML = `The world remains untouched by monsters of <em class="${dataColorDropdown.value}">${dataColorDropdown.value}</em>...`;
    }
  }
};

// Funktion för att hämta monster från state som är filtrerade baserat på färg och typ
export const getFilteredMonsters = () => {
  const monsters = state.monsters;
  // Returnerar alla monster om ingen typ eller färg valts
  if (
    dataTypeDropdown.value === "All Types" &&
    dataColorDropdown.value === "All Colors"
  ) {
    return monsters;
    // Om typ ej är vald så filtrera baserad endast på färg
  } else if (dataTypeDropdown.value === "All Types") {
    return monsters.filter((monster) =>
      config.colorOptions.some(
        (color) => dataColorDropdown.value === color && monster.color === color
      )
    );
    // Om färg ej är vald så filtrera baserad endast på typ
  } else if (dataColorDropdown.value === "All Colors") {
    return monsters.filter((monster) =>
      config.typeOptions.some(
        (type) => dataTypeDropdown.value === type && monster.type === type
      )
    );
    // Är båda valda filtrera på båda
  } else {
    return monsters.filter(
      (monster) =>
        config.typeOptions.some(
          (type) => dataTypeDropdown.value === type && monster.type === type
        ) &&
        config.colorOptions.some(
          (color) =>
            dataColorDropdown.value === color && monster.color === color
        )
    );
  }
};

export const updateStatistics = () => {
  updateTypeCount();
  updateColorCount();
};

const renderMonsterStatistics = () => {
  // Uppdatera visningen av antalet monster i statisticsContainer baserat på typ
  // Lägg till "All Types"-alternativ i dropdownmenyerna för monster-typ och -färg, och sätt "All Types" som förvalt val.
  if (!dataTypeDropdown.querySelector("option[value='All Types']")) {
    const typeOptionAll = new Option("All Types", "All Types");

    dataTypeDropdown.insertBefore(typeOptionAll, dataTypeDropdown.firstChild);

    // Sätt "All" som förvalt val
    dataTypeDropdown.value = "All Types";
  }
  if (!dataColorDropdown.querySelector("option[value='All Colors']")) {
    const colorOptionAll = new Option("All Colors", "All Colors");

    dataColorDropdown.insertBefore(
      colorOptionAll,
      dataColorDropdown.firstChild
    );

    // Sätt "All" som förvalt val
    dataColorDropdown.value = "All Colors";
  }

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
  if (!dataTypeDropdown.hasAttribute("data-listener")) {
    dataTypeDropdown.addEventListener("change", () => {
      updateTypeCount();
      updateColorCount();
      renderMonsterCards(getFilteredMonsters());
    });
    dataTypeDropdown.setAttribute("data-listener", true);
  }

  if (!dataColorDropdown.hasAttribute("data-listener")) {
    dataColorDropdown.addEventListener("change", () => {
      updateColorCount();
      updateTypeCount();
      renderMonsterCards(getFilteredMonsters());
    });
    dataColorDropdown.setAttribute("data-listener", true);
  }

  // Inledande uppdatering av monsterstatistik baserat på valda typer
  updateStatistics();

  dropdownsContainer.append(typeCountDisplay, colorCountDisplay);
};

export const render = () => {
  renderMonsterForm();
  renderTypeOptions();
  renderColorOptions();
  renderMonsterCards(state.monsters);
  renderMonsterStatistics();
};
