// Deklarera Save-knappen globalt
let saveButton = document.querySelector("#save-monster");
if (!saveButton) {
  saveButton = document.createElement("button");
  saveButton.id = "save-monster";
  saveButton.textContent = "Save Monster";
  document.querySelector("#add-form").appendChild(saveButton);
}

const monsterOptions = [
  "Maritime Monster",
  "Terrestrial Beast",
  "Winged Horror",
];

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
      type: monsterOptions[0],
      name: "Kraken",
      color: colorOptions[0],
      size: 50,
      eyes: 256,
      viciousness: 100,
      head: 4,
    },
    {
      type: monsterOptions[1],
      name: "Mudfang",
      color: colorOptions[4],
      size: 80,
      eyes: 2,
      viciousness: 10,
      head: 700,
    },
    {
      type: monsterOptions[2],
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
      document.querySelector(`#${field}`).value = "";
    });
    document.querySelector("#type-input").value = "Maritime Monster";
    document.querySelector("#color-input").value = "Blue";
  },

  //funktion för att hämta inputfältens data
  getFormData: () => {
    return fields.map((field) => document.querySelector(`#${field}`).value);
  },

  //funktion för att fylla i inputfälten med data
  populateForm: (monster) => {
    fields.forEach((field) => {
      document.querySelector(`#${field}`).value =
        monster[field.replace("-input", "")];
    });
  },
};

const renderMonsterOptions = () => {
  const monsterSelects = [
    document.querySelector("#type-input"),
    document.querySelector("#type-select"),
  ];
  monsterSelects.forEach((select) => {
    select.innerHTML = "";
    monsterOptions.forEach((option) => {
      const optionElement = document.createElement("option");
      optionElement.value = option;
      optionElement.textContent = option;
      select.appendChild(optionElement);
    });
  });
};

const renderColorOptions = () => {
  const colorSelect = document.querySelector("#color-input");
  colorSelect.innerHTML = "";
  colorOptions.forEach((color) => {
    const optionElement = document.createElement("option");
    optionElement.value = color;
    optionElement.textContent = color;
    colorSelect.appendChild(optionElement);
  });
};

const renderFormOptions = () => {
  renderMonsterOptions();
  renderColorOptions();
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

// initial render
renderMonsters();

//app

//lyssnare för Add Monster
document.querySelector("#submit").addEventListener("click", (e) => {
  e.preventDefault();

  const formData = state.getFormData();

  state.addMonster(...formData);

  state.clearForm();
  renderMonsters();
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
    saveButton.style.display = "inline-block"; // Gör knappen synlig
  }
});

//lyssnare saveButton
saveButton.addEventListener("click", (e) => {
  e.preventDefault();
  const index = saveButton.getAttribute("data-index");
  const formData = state.getFormData();

  const updatedMonster = {}; // Skapa ett tomt objekt för att lagra de uppdaterade värdena

  fields.forEach((field, i) => {
    updatedMonster[field.replace("-input", "")] = formData[i];
  });

  state.monsters[index] = updatedMonster; // Tilldela det uppdaterade monstret till rätt index

  state.clearForm();
  saveButton.removeAttribute("data-index");
  saveButton.style.display = "none";
  renderMonsters(); // Rendera om listan
});
