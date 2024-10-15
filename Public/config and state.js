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
  looks: ["legs", "eyes", "viciousness", "head"],

  fields: ["type", "name", "color"],
};
config.fields.push(...config.looks);

// state- Skapa array med objekt(monster)
export const state = {
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
    config.fields.forEach((field) => {
      const value = document.querySelector(`.${field}`).value.trim();
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
