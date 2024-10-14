import {
  monsterForm,
  statisticsContainer,
  dropdownsContainer,
  typeDropdown,
  colorDropdown,
  cancelButton,
  saveButton,
} from "./domElements.js";
import { config, state } from "./config.js";

//////////////////////////////////Global Scope variables///////////////////////////////////
//////////////////////////////////||||||||||||||||||||||///////////////////////////////////

//spara element för visning av statistik i variabler
let typeCountDisplay = statisticsContainer.querySelector(".type-display");

let colorCountDisplay = statisticsContainer.querySelector(".color-display");
console.log("statisticsContainer:", statisticsContainer);

console.log("typeCountDisplay:", typeCountDisplay);
console.log("colorCountDisplay:", colorCountDisplay);

//////////////////////////////////Global Scope Functions///////////////////////////////////
//////////////////////////////////||||||||||||||||||||||///////////////////////////////////

//funktion för att bygga monster dynamiskt
export const createMonster = (type, name, color, lookValues) => {
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
const renderMonsterForm = () => {
  config.looks.forEach((look) => {
    const pElement = document.createElement("p");
    const labelElement = document.createElement("label");
    labelElement.textContent = look.charAt(0).toUpperCase() + look.slice(1);
    pElement.appendChild(labelElement);
    const inputElement = document.createElement("input");
    inputElement.name = `${look}`;
    inputElement.className = `${look}`;
    inputElement.type = "number";
    monsterForm.appendChild(pElement);
    monsterForm.appendChild(inputElement);
  });
  const buttonElement = document.createElement("button");
  buttonElement.type = "submit";
  buttonElement.id = "submit";
  buttonElement.textContent = "Add Monster";
  monsterForm.appendChild(buttonElement);
  monsterForm.appendChild(saveButton);
  monsterForm.appendChild(cancelButton);
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
export const renderMonsterCards = () => {
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
export const updateTypeCount = () => {
  // Om alla valts, visa totalt antal monster
  if (typeDropdown.value === "All Types") {
    typeCountDisplay.innerHTML = `Monsters Roaming: <strong class="number">${state.monsters.length}</strong>`;
    console.log("typeCountDisplay:", typeCountDisplay.innerHTML);
    console.log(`typeDropdown.value${typeDropdown.value}`);
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
export const updateColorCount = () => {
  // Om "All" valts, visa totalt antal monster
  if (colorDropdown.value === "All Colors") {
    colorCountDisplay.innerHTML = `Monsters Roaming: <strong class="number">${state.monsters.length}</strong>`;
    console.log("colorCountDisplay:", colorCountDisplay.innerHTML);
    console.log(`colorDropdown.value${colorDropdown.value}`);
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
export const render = () => {
  renderMonsterForm();
  renderTypeOptions();
  renderColorOptions();
  renderMonsterCards();
  renderMonsterStatistics();
};
