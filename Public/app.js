/////////////////////////////////////////////App///////////////////////////////////
////////////////////////////////////////////||||//////////////////////////////////

import { formHandler, state, config } from "./config and state.js";

import {
  renderMonsterCards,
  updateTypeCount,
  updateColorCount,
  render,
} from "./monsterUI.js";
import { cancelButton, saveButton } from "./domElements.js";

let isEditing = false;
// initial render
render();

const submitButton = document.querySelector("#submit");

//lyssnare för addMonster
document.querySelector("#submit").addEventListener("click", (e) => {
  e.preventDefault();

  // Om vi är i redigeringsläge, hoppa över denna händelse
  if (isEditing) {
    // Validera att alla fält är ifyllda
    if (!formHandler.validateForm()) {
      alert("Please complete all required fields to proceed!");
      return; // Avbryt om något fält är tomt
    }
  }

  cancelButton.style.display = "none";
  saveButton.style.display = "none";
  submitButton.textContent = "Add Monster";
  const formData = formHandler.getFormData();

  // Validera att alla fält är ifyllda
  if (!formHandler.validateForm()) {
    alert("Please complete all required fields to proceed!");
    return; // Avbryt om något fält är tomt
  }
  if (!formHandler.validateName()) {
    return;
  }

  state.addMonster(...formData);

  formHandler.resetForm();

  renderMonsterCards();
  //scrolla ner
  document.querySelector("footer").scrollIntoView({ behavior: "smooth" });

  // Uppdatera statistiken för typ och färg efter att ha lagt till ett nytt monster
  updateTypeCount();
  updateColorCount();
});

//lyssnare för editButton
const cardContainer = document.querySelector(".cards");
cardContainer.addEventListener("click", (event) => {
  if (event.target && event.target.classList.contains("edit")) {
    isEditing = true;
    const index = event.target.getAttribute("data-index");
    const monster = state.monsters[index];
    formHandler.populateForm(monster);

    saveButton.setAttribute("data-index", index);
    saveButton.style.display = "inline-block"; // Gör saveButton synlig
    cancelButton.style.display = "inline-block"; // Gör cancelButton synlig

    //för att scrolla upp
    document.querySelector(".top-divs").scrollIntoView({ behavior: "smooth" });

    submitButton.textContent = "Copy Monster";
  }
});

//lyssnare saveButton
saveButton.addEventListener("click", (e) => {
  e.preventDefault();

  const index = saveButton.getAttribute("data-index");
  const formData = formHandler.getFormData();

  const updatedMonster = {}; // Skapa ett tomt objekt för att lagra de uppdaterade värdena

  config.fields.forEach((field, inputValue) => {
    updatedMonster[field] = formData[inputValue];
  });

  // Validera att alla fält är ifyllda
  if (!formHandler.validateForm()) {
    alert("Please complete all required fields to proceed!");
    return; // Avbryt om något fält är tomt
  }
  isEditing = false;
  submitButton.textContent = "Add Monster";
  state.monsters[index] = updatedMonster; // Tilldela det uppdaterade monstret till rätt index

  formHandler.resetForm();
  saveButton.removeAttribute("data-index");
  saveButton.style.display = "none";
  cancelButton.style.display = "none";
  renderMonsterCards(); // Rendera om listan

  const monsterElements = document.querySelectorAll(".cards > div");
  const monsterElement = monsterElements[index];
  if (monsterElement) {
    monsterElement.scrollIntoView({ behavior: "smooth" });
  }
  updateTypeCount();
  updateColorCount();
});

//lyssnare cancelButton
cancelButton.addEventListener("click", (e) => {
  e.preventDefault();
  // document.getElementById("monster-form").reset();
  formHandler.resetForm();
  cancelButton.style.display = "none";
  saveButton.style.display = "none";
  submitButton.textContent = "Add Monster"; //Gör så att texten återvänder till "add monster" istället för "copy monster"
});

//lyssnare deleteButton
document.querySelector(".cards").addEventListener("click", (e) => {
  if (e.target && e.target.classList.contains("delete")) {
    const index = e.target.getAttribute("data-index");
    state.deleteMonster(index);
    renderMonsterCards();
    updateTypeCount();
    updateColorCount();
  }
});
