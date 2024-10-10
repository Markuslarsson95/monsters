// Deklarera Save-knappen globalt
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

const typeOptions = ["Maritime Monster", "Terrestrial Beast", "Winged Horror"];

const colorOptions = ["Blue", "Green", "Yellow", "Pink", "Red"];

const fields = [
  "type-input",
  "name-input",
  "color-input",
  "size-input",
  "eyes-input",
  "viciousness-input",
  "head-input",
];

// state- Skapa array med objekt(monster)
const state = {
  monsters: [
    {
      type: typeOptions[0],
      name: "Kraken",
      color: colorOptions[0],
      size: 50,
      eyes: 256,
      viciousness: 100,
      head: 4,
    },
    {
      type: typeOptions[1],
      name: "Mudfang",
      color: colorOptions[4],
      size: 80,
      eyes: 2,
      viciousness: 10,
      head: 700,
    },
    {
      type: typeOptions[2],
      name: "Grimpflap",
      color: colorOptions[3],
      size: 30,
      eyes: 5,
      viciousness: 51,
      head: 1,
    },
  ],

  //add Monster
  addMonster: function (type, name, color, size, eyes, viciousness, head) {
    this.monsters.push({
      type,
      name,
      color,
      size,
      eyes,
      viciousness,
      head,
    });
  },

  //funktion för att rensa inputfälten i formen
  clearForm: () => {
    fields.forEach((field) => {
      document.querySelector(`.${field}`).value = "";
    });
    document.querySelector(".type-input").value = typeOptions[0];
    document.querySelector(".color-input").value = colorOptions[0];
  },

  //funktion för att hämta data från inputfälten
  getFormData: () => {
    const formData = [];
    fields.forEach((field) => {
      const value = document.querySelector(`.${field}`).value;
      formData.push(value);
    });
    return formData;
  },

  //funktion för att fylla i inputfälten med data
  populateForm: (monster) => {
    fields.forEach((field) => {
      document.querySelector(`.${field}`).value =
        monster[field.replace("-input", "")];
    });
  },
};

const renderMonsterOptions = () => {
  const typeSelectors = document.querySelectorAll(".type-input");
  typeSelectors.forEach((typeSelector) => {
    typeSelector.innerHTML = "";

    typeOptions.forEach((option) => {
      const optionElement = document.createElement("option");
      optionElement.value = option;
      optionElement.textContent = option;
      typeSelector.appendChild(optionElement);
    });
  });
};

const renderColorOptions = () => {
  const colorSelectors = document.querySelectorAll(".color-input");
  colorSelectors.forEach((colorSelector) => {
    colorSelector.innerHTML = "";
    colorOptions.forEach((color) => {
      const optionElement = document.createElement("option");
      optionElement.value = color;
      optionElement.textContent = color;
      colorSelector.appendChild(optionElement);
    });
  });
};

const renderFormOptions = () => {
  renderMonsterOptions();
  renderColorOptions();
  renderDataInfo();
};

const renderDataInfo = () => {
  const typeData = document.querySelector("#type-data");
  const colorData = document.querySelector("#color-data");
  const allOptionsType = document.createElement("option");
  const allOptionsColor = document.createElement("option");
  allOptionsType.value = "All";
  allOptionsType.textContent = "All";
  allOptionsColor.value = "All";
  allOptionsColor.textContent = "All";

  typeData.insertBefore(allOptionsType, typeData.firstChild);
  colorData.insertBefore(allOptionsColor, colorData.firstChild);
  typeData.value = allOptionsType.value;
  colorData.value = allOptionsColor.value;

  const dataForm = document.querySelector("#data-form");

  const typeAmount = document.createElement("div");
  typeAmount.innerHTML = `Number of monsters: ${state.monsters.length}`;
  const updateTypeData = () => {
    if (typeData.value === typeOptions[0]) {
      const filteredMonsters = state.monsters.filter(
        (monster) => monster.type === typeOptions[0]
      );
      typeAmount.innerHTML = `Number of monster type ${typeOptions[0]}: ${filteredMonsters.length}`;
    } else if (typeData.value === typeOptions[1]) {
      const filteredMonsters = state.monsters.filter(
        (monster) => monster.type === typeOptions[1]
      );
      typeAmount.innerHTML = `Number of monster type ${typeOptions[1]}: ${filteredMonsters.length}`;
    } else if (typeData.value === typeOptions[2]) {
      const filteredMonsters = state.monsters.filter(
        (monster) => monster.type === typeOptions[2]
      );
      typeAmount.innerHTML = `Number of monster type ${typeOptions[2]}: ${filteredMonsters.length}`;
    } else {
      typeAmount.innerHTML = `Number of monsters: ${state.monsters.length}`;
    }
  };

  const colorAmount = document.createElement("div");
  colorAmount.innerHTML = `Number of monsters: ${state.monsters.length}`;
  const updateColorData = () => {
    if (colorData.value === colorOptions[0]) {
      const filteredMonsters = state.monsters.filter(
        (monster) => monster.color === colorOptions[0]
      );
      colorAmount.innerHTML = `Number of ${colorOptions[0]} monsters: ${filteredMonsters.length}`;
    } else if (colorData.value === colorOptions[1]) {
      const filteredMonsters = state.monsters.filter(
        (monster) => monster.color === colorOptions[1]
      );
      colorAmount.innerHTML = `Number of ${colorOptions[1]} monsters: ${filteredMonsters.length}`;
    } else if (colorData.value === colorOptions[2]) {
      const filteredMonsters = state.monsters.filter(
        (monster) => monster.color === colorOptions[2]
      );
      colorAmount.innerHTML = `Number of ${colorOptions[2]} monsters: ${filteredMonsters.length}`;
    } else if (colorData.value === colorOptions[3]) {
      const filteredMonsters = state.monsters.filter(
        (monster) => monster.color === colorOptions[3]
      );
      colorAmount.innerHTML = `Number of ${colorOptions[3]} monsters: ${filteredMonsters.length}`;
    } else if (colorData.value === colorOptions[4]) {
      const filteredMonsters = state.monsters.filter(
        (monster) => monster.color === colorOptions[4]
      );
      colorAmount.innerHTML = `Number of ${colorOptions[4]} monsters: ${filteredMonsters.length}`;
    } else {
      colorAmount.innerHTML = `Number of monsters: ${state.monsters.length}`;
    }
  };

  typeData.addEventListener("change", updateTypeData);
  colorData.addEventListener("change", updateColorData);
  dataForm.appendChild(typeAmount);
  dataForm.appendChild(colorAmount);
};

const renderMonsters = () => {
  renderFormOptions();
  const card = document.querySelector(".cards");
  card.innerHTML = "";

  state.monsters.forEach((m, index) => {
    const monster = document.createElement("div");
    monster.innerHTML = `
      <h2>${m.name}</h2>
      <p>Type: ${m.type}</p>
      <p>Color: ${m.color}</p>
      <p>Size: ${m.size}</p>
      <p>Eye Amount: ${m.eyes}</p>
      <p>Viciousness: ${m.viciousness}</p>
      <p>Head Amount: ${m.head}</p>
      <button type="button" class="edit" data-index="${index}">Edit</button>
    `;
    card.appendChild(monster);
  });
};

// app
// initial render
renderMonsters();

//lyssnare för Add Monster
document.querySelector("#submit").addEventListener("click", (e) => {
  e.preventDefault();

  const formData = state.getFormData();

  state.addMonster(...formData);

  state.clearForm();
  renderMonsters();

  const scrollBottom = document.querySelector("footer");
  scrollBottom.scrollIntoView({ behavior: "smooth" });
});

//lyssnare för edit
const cardContainer = document.querySelector(".cards");

//hur funkar det med event.target osv.?
cardContainer.addEventListener("click", (event) => {
  if (event.target && event.target.classList.contains("edit")) {
    const index = event.target.getAttribute("data-index");
    const monster = state.monsters[index];
    state.populateForm(monster);

    saveButton.setAttribute("data-index", index);
    saveButton.style.display = "inline-block"; // Gör saveButton synlig
    cancelButton.style.display = "inline-block"; // Gör cancelButton synlig
  }
  const scrollTop = document.querySelector(".top-divs");
  scrollTop.scrollIntoView({ behavior: "smooth" });
});

//lyssnare saveButton
saveButton.addEventListener("click", (e) => {
  e.preventDefault();
  const index = saveButton.getAttribute("data-index");
  const formData = state.getFormData();

  const updatedMonster = {}; // Skapa ett tomt objekt för att lagra de uppdaterade värdena

  fields.forEach((field, inputValue) => {
    updatedMonster[field.replace("-input", "")] = formData[inputValue];
  });

  state.monsters[index] = updatedMonster; // Tilldela det uppdaterade monstret till rätt index

  state.clearForm();
  saveButton.removeAttribute("data-index");
  saveButton.style.display = "none";
  renderMonsters(); // Rendera om listan

  const monsterElements = document.querySelectorAll(".cards > div");
  const monsterElement = monsterElements[index];
  if (monsterElement) {
    monsterElement.scrollIntoView({ behavior: "smooth" });
  }
});


//lyssnare cancellButton

document.getElementById("cancel-edit").addEventListener("click", function(e) {
  e.preventDefault();
  document.getElementById("add-form").reset();
});
