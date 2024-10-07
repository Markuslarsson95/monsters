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
      type: "Maritime Monster",
      name: "Kraken",
      color: "Blue",
      size: 50,
      eyes: 256,
      viciousness: 100,
      head: 4,
    },
    {
      type: "Terrestrial Beast",
      name: "Mudfang",
      color: "Red",
      size: 80,
      eyes: 2,
      viciousness: 10,
      head: 700,
    },
    {
      type: "Winged Horror",
      name: "Grimpflap",
      color: "Pink",
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

//render()
renderMonsters = () => {
  const card = document.querySelector(".cards");
  card.innerHTML = "";

  for (const m of state.monsters) {
    const monster = document.createElement("div");

    monster.innerHTML = `<h2> ${m.name} </h2><p> Type: ${m.type}</p> <p> Color: ${
      m.color
    }</p><p> Size: ${m.size}</p> <p> Eye Amount: ${m.eyes}</p> <p> Viciousness: ${
      m.viciousness
    }</p><p>Head Amount: ${
      m.head
    }</p> <p><button type="submit" id="edit" data-index="${state.monsters.indexOf(
      m
    )}">Edit</button></p>`;

    card.appendChild(monster);
  }

  const editButtons = document.querySelectorAll("#edit");
  editButtons.forEach((button) => {
    button.addEventListener("click", () => {
      //populera form med aktuellt monster

      const index = button.getAttribute("data-index");
      console.log(index);

      const monster = state.monsters[index];

      state.populateForm(monster);

      const saveButton = document.createElement("button");
      saveButton.textContent = "Save Monster";
      document.querySelector("#add-form").appendChild(saveButton);

      saveButton.addEventListener("click", (e) => {
        e.preventDefault();
        const formData = state.getFormData();
        console.log(formData);
        const updatedData = {};
        fields.forEach((field) => {
          // Tar bort "-input" för att matcha nycklar i objektet
          updatedData[field.replace("-input", "")] = formData[field]; // Sätter rätt nyckel och värde från formData
        });

        state.monsters[index] = updatedData;
      });
    });
  });
};

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
