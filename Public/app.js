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

  getFormData: () => {
    const values = [];
    for (const field of fields) {
      values.push(document.querySelector(`#${field}`).value);
    }
    return values;
  },
  populateForm: (monster) => {
    fields.forEach((field) => {
      document.querySelector(`#${field}`).value =
        monster[field.replace("-input", "")];
    });
  },
};

const renderMonsterOptions = () => {
  const selects = [];
  selects.push(document.querySelector("#type-input"));
  selects.push(document.querySelector("#type-select"));
  selects.forEach((select) => {
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
  const select = document.querySelector("#color-input");
  select.innerHTML = "";

  colorOptions.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.textContent = option;
    select.appendChild(optionElement);
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

  document.querySelectorAll(".edit").forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.getAttribute("data-index");
      const monster = state.monsters[index];
      state.populateForm(monster);

      saveButton.setAttribute("data-index", index);
      saveButton.style.display = "inline-block"; // Gör knappen synlig
    });
  });
};

// Start rendering
renderMonsters();

const editButtons = document.querySelectorAll("#edit");
editButtons.forEach((button) => {
  button.addEventListener("click", () => {
    //populera form med aktuellt monster

    const index = button.getAttribute("data-index");
    console.log(index);

    const monster = state.monsters[index];

    state.populateForm(monster);
  });
});
saveButton.addEventListener("click", (e) => {
  e.preventDefault();
  const index = saveButton.getAttribute("data-index");
  const formData = state.getFormData();

  const updatedMonster = {}; // Skapa ett tomt objekt för att lagra de uppdaterade värdena

  fields.forEach((field, i) => {
    updatedMonster[field.replace("-input", "")] = formData[i]; // Omvandla till nummer om det är numeriskt
  });

  state.monsters[index] = updatedMonster; // Tilldela det uppdaterade monstret till rätt index

  state.clearForm();
  saveButton.removeAttribute("data-index");
  renderMonsters(); // Rendera om listan
});

//app

renderMonsters();

document.querySelector("#submit").addEventListener("click", (e) => {
  e.preventDefault();

  const type = document.querySelector("#type-input").value;
  const name = document.querySelector("#name-input").value;
  const color = document.querySelector("#color-input").value;
  const size = document.querySelector("#size-input").value;
  const eyes = document.querySelector("#eyes-input").value;
  const viciousness = document.querySelector("#viciousness-input").value;
  const head = document.querySelector("#head-input").value;

  state.addMonster(type, name, color, size, eyes, viciousness, head);

  state.clearForm();
  renderMonsters();
});
