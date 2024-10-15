//////////////////////////////////configuration and state///////////////////////////////////
//////////////////////////////////||||||||||||||||||||||||///////////////////////////////////

import { formTypeDropdown, formColorDropdown } from "./domElements.js";
import { createMonster } from "./monsterUI.js";

// Konfigurationsobjekt för att lagra monster-relaterade inställningar
// Innehåller typalternativ, färgalternativ, utseendeattribut och fält
// Dessa inställningar används för att bygga och rendera monsterkort i applikationen
export const config = {
  typeOptions: ["Maritime Monster", "Terrestrial Beast", "Winged Horror"],

  colorOptions: ["Blue", "Green", "Yellow", "Black", "Red"],

  // ändra denna för att kunna ändra på utseendealternativen
  looks: ["legs", "eyes", "viciousness", "head", "death", "life"],

  fields: ["type", "name", "color"],
};
config.fields.push(...config.looks);

const defaultMonsterAttribute = 0;
const defaultMonsterAttributes = config.looks.map(
  () => defaultMonsterAttribute
);
console.log(`defaultLooksValue=${defaultMonsterAttributes}`);
defaultMonsterAttributes.splice(0, 4);
console.log(`spliceddefaultLooksValue=${defaultMonsterAttributes}`);

// state- Skapa array med objekt(monster)
export const state = {
  monsters: [
    createMonster(
      config.typeOptions[0],
      "Kraken",
      config.colorOptions[0],
      [10, 2, 39, 3, 23, 23],
      defaultMonsterAttributes
    ),
    createMonster(
      config.typeOptions[1],
      "Mudfang",
      config.colorOptions[4],
      [10, 2, 39, 3],
      defaultMonsterAttributes
    ),
    createMonster(
      config.typeOptions[2],
      "Grimflap",
      config.colorOptions[3],
      [10, 2, 39, 3],
      defaultMonsterAttributes
    ),
  ],

  //add Monster
  addMonster: function (type, name, color, ...attributeValues) {
    // De första tre fälten är alltid type, name, color
    const lookValues = attributeValues;

    const newMonster = createMonster(type, name, color, lookValues);
    this.monsters.push(newMonster);
  },
};

export const formHandler = {
  //funktion för att rensa inputfälten i formen
  resetForm: () => {
    config.fields.forEach((field) => {
      document.querySelector(`.${field}`).value = "";
    });
    formTypeDropdown.value = config.typeOptions[0];
    formColorDropdown.value = config.colorOptions[0];
  },

  //funktion för att hämta data från inputfälten

  getFormData: () => {
    const formData = [];
    config.fields.concat(config.looks).forEach((field) => {
      const inputElement = document.querySelector(`.${field}`);
      const inputValue = inputElement ? inputElement.value : "";
      formData.push(inputValue);
    });
    return formData;
  },

  //funktion för att fylla i inputfälten med data
  populateForm: (monster) => {
    config.fields.forEach((field) => {
      document.querySelector(`.${field}`).value = monster[field];
    });
  },
  //funktion för att validera att inputfälten inte är tomma
  validateForm: () => {
    console.log(`validateForm is running`);
    let allFieldsFilled = true;
    config.fields.forEach((field) => {
      const value = document.querySelector(`.${field}`).value.trim();
      if (!value) {
        allFieldsFilled = false;
      }
    });
    return allFieldsFilled;
  },
};
