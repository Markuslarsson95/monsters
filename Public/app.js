/////////////////////////////////////////////App///////////////////////////////////
////////////////////////////////////////////||||//////////////////////////////////

import { formHandler, state, config } from "./configAndState.js";

import { renderMonsterCards, updateStatistics, render } from "./monsterUI.js";
import {
  cardContainer,
  monsterElements,
  addMonsterButton,
  cancelButton,
  saveButton,
  topDivs,
  footer,
} from "./domElements.js";

// initial render
render();

//lyssnare för submit knapp
addMonsterButton.addEventListener("click", (e) => {
  e.preventDefault();

  // Validera att alla fält är ifyllda
  if (!formHandler.validateForm()) {
    return; // Avbryt om något fält är fel
  }

  addMonsterButton.style.display = "inline-block";
  addMonsterButton.textContent = "Add Monster";
  cancelButton.style.display = "none";
  saveButton.style.display = "none";
  const formData = formHandler.getFormData();

  // Kopiera monstret
  state.addMonster(...formData);

  formHandler.resetForm();

  renderMonsterCards();
  //scrolla ner
  footer.scrollIntoView({ behavior: "smooth" });

  // Uppdatera statistiken för typ och färg efter att ha lagt till ett nytt monster
  updateStatistics();
});

//lyssnare för editButton
cardContainer.addEventListener("click", (event) => {
  if (event.target && event.target.classList.contains("edit")) {
    // Läs in det valda monstret med hjälp av edit knappens "data-index"
    const index = event.target.getAttribute("data-index");
    const monster = state.monsters[index];
    formHandler.populateForm(monster);

    saveButton.setAttribute("data-index", index);
    saveButton.style.display = "inline-block"; // Gör saveButton synlig
    cancelButton.style.display = "inline-block"; // Gör cancelButton synlig

    //för att scrolla upp
    topDivs.scrollIntoView({ behavior: "smooth" });

    addMonsterButton.textContent = "Copy Monster";
  }
});

//lyssnare saveButton
saveButton.addEventListener("click", (e) => {
  e.preventDefault();

  // Läs in det valda monstret med hjälp av edit knappens "data-index"
  const index = saveButton.getAttribute("data-index");
  const formData = formHandler.getFormData();

  const updatedMonster = {}; // Skapa ett tomt objekt för att lagra de uppdaterade värdena

  config.fields.forEach((field, inputValue) => {
    updatedMonster[field] = formData[inputValue];
  });

  // Validera att alla fält är ifyllda
  if (!formHandler.validateForm()) {
    return; // Avbryt om något fält är tomt
  }
  addMonsterButton.textContent = "Add Monster";
  state.monsters[index] = updatedMonster; // Tilldela det uppdaterade monstret till rätt index

  formHandler.resetForm();
  saveButton.removeAttribute("data-index");
  saveButton.style.display = "none";
  cancelButton.style.display = "none";
  renderMonsterCards(); // Rendera om listan

  const monsterElement = monsterElements[index];
  // Scrolla ner till monstret som redigerats
  if (monsterElement) {
    monsterElement.scrollIntoView({ behavior: "smooth" });
  }

  // Uppdatera statistiken för typ och färg efter att ha redigerat ett monster
  updateStatistics();
});

//lyssnare cancelButton
cancelButton.addEventListener("click", (e) => {
  e.preventDefault();
  formHandler.resetForm();
  cancelButton.style.display = "none";
  saveButton.style.display = "none";
  addMonsterButton.textContent = "Add Monster"; //Gör så att texten återvänder till "add monster" istället för "copy monster"
});

//lyssnare deleteButton
cardContainer.addEventListener("click", (e) => {
  if (e.target && e.target.classList.contains("delete")) {
    // Läs in det valda monstret med hjälp av edit knappens "data-index"
    const index = e.target.getAttribute("data-index");
    state.deleteMonster(index);
    renderMonsterCards();

    // Uppdatera statistiken för typ och färg efter att ha tagit bort ett monster
    updateStatistics();
  }
});
