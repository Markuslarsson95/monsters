////////////////////////////////////DOM Elements////////////////////////////////////
////////////////////////////////////||||||||||||//////////////////////////////////

export const monsterForm = document.querySelector("#monster-form");
export const cardContainer = document.querySelector(".cards");
export const monsterElements = cardContainer.querySelectorAll(".cards > div");
export const topDivs = document.querySelector(".top-divs");
export const footer = document.querySelector(".footer");
export const formTypeDropdown = document.querySelector(".type");
export const formColorDropdown = document.querySelector(".color");
export const statisticsContainer = document.querySelector("#statistics-form");
export const dataTypeDropdown = document.querySelector("#type-data");
export const allTypesOptionElement = dataTypeDropdown.querySelector(
  "option[value='All Types']"
);
export const typeSelectors = document.querySelectorAll(".type");
export const dataColorDropdown = document.querySelector("#color-data");
export const allColorOptionElement = dataColorDropdown.querySelector(
  "option[value='All Colors']"
);
export const colorSelectors = document.querySelectorAll(".color");
export const dropdownsContainer = document.querySelector(".dropdowns");

//Deklarera addMonsterButton globalt
export let addMonsterButton = monsterForm.querySelector("#submit");
if (!addMonsterButton) {
  addMonsterButton = document.createElement("button");
  addMonsterButton.type = "submit";
  addMonsterButton.id = "submit";
  addMonsterButton.textContent = "Add Monster";
  monsterForm.appendChild(addMonsterButton);
  addMonsterButton.style.display = "inline-block";
}

// Deklarera Save-knappen globalt
export let saveButton = document.querySelector("#save-monster");
if (!saveButton) {
  saveButton = document.createElement("button");
  saveButton.id = "save-monster";
  saveButton.textContent = "Save Monster";
  monsterForm.appendChild(saveButton);
  saveButton.style.display = "none";
}
// Deklarera Cancel-knappen globalt
export let cancelButton = document.querySelector("#cancel-monster");
if (!cancelButton) {
  cancelButton = document.createElement("button");
  cancelButton.id = "cancel-edit";
  cancelButton.textContent = "Cancel";
  monsterForm.appendChild(cancelButton);
  cancelButton.style.display = "none";
}
