////////////////////////////////////DOM Elements////////////////////////////////////
////////////////////////////////////||||||||||||//////////////////////////////////

export const monsterForm = document.querySelector("#monster-form");
export const statisticsContainer = document.querySelector("#statistics-form");
export const typeDropdown = document.querySelector(".type");
export const colorDropdown = document.querySelector(".color");
export const dropdownsContainer = document.querySelector(".dropdowns");

// Deklarera Save-knappen globalt
export let saveButton = document.querySelector("#save-monster");
if (!saveButton) {
  saveButton = document.createElement("button");
  saveButton.id = "save-monster";
  saveButton.textContent = "Save Monster";
  document.querySelector("#monster-form").appendChild(saveButton);
  saveButton.style.display = "none";
}
// Deklarera Cancel-knappen globalt
export let cancelButton = document.querySelector("#cancel-monster");
if (!cancelButton) {
  cancelButton = document.createElement("button");
  cancelButton.id = "cancel-edit";
  cancelButton.textContent = "Cancel";
  document.querySelector("#monster-form").appendChild(cancelButton);
  cancelButton.style.display = "none";
}
