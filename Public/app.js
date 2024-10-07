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
  select: [
    {
      type: "Maritime Monster",
      name: "Kraken",
      color: "blue",
      size: 50,
      eyeNum: 256,
      viciousness: 100,
      headNum: 4,
    },
    {
      type: "Terrestrial Beast",
      name: "Mudfang",
      color: "Red",
      size: 80,
      eyeNum: 2,
      viciousness: 10,
      headNum: 700,
    },
    {
      type: "Winged Horror",
      name: "Grimpflap",
      color: "black",
      size: 30,
      eyeNum: 5,
      viciousness: 51,
      headNum: 1,
    },
  ],

  //add Monster
  addMonster: function (type, name, color, size, eyeNum, viciousness, headNum) {
    this.select.push({ type, name, color, size, eyeNum, viciousness, headNum });
  },

  //edit monster
  editMonster: function (
    type,
    name,
    color,
    size,
    eyeNum,
    viciousness,
    headNum
  ) {
    this.select.push({ type, name, color, size, eyeNum, viciousness, headNum });
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

  /*   // Funktion för att fylla formuläret med data från ett monster
const populateForm = (monster) => {
  // Iterera genom fälten och sätt värden i formuläret baserat på monster-data
  fields.forEach((field) => {
    document.querySelector(`#${field}`).value =
      monster[field.replace("-input", "")]; // Tar bort "-input" för att matcha med objekt-nycklar
  }); */

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

  for (const m of state.select) {
    const monster = document.createElement("div");

    monster.innerHTML = `<h2> ${m.name} </h2><p> Type: ${m.type}. <p> Color: ${
      m.color
    }. <p> Size: ${m.size}. <p> Eye Amount: ${m.eyeNum}. <p> Viciousness: ${
      m.viciousness
    }<p>Head Amount: ${
      m.headNum
    } <button type="submit" id="edit" data-index="${state.select.indexOf(
      m
    )}">Edit</button>`;

    card.appendChild(monster);
  }
};

//app

renderMonsters();

document.querySelector("#submit").addEventListener("click", (e) => {
  e.preventDefault();

  const type = document.querySelector("#type-input").value;
  const name = document.querySelector("#name-input").value;
  const color = document.querySelector("#color-input").value;
  const size = document.querySelector("#size-input").value;
  const eyeNum = document.querySelector("#eyes-input").value;
  const viciousness = document.querySelector("#viciousness-input").value;
  const headNum = document.querySelector("#head-input").value;

  state.addMonster(type, name, color, size, eyeNum, viciousness, headNum);

  const abbamonster = {
    type: "Maritime Monster",
    name: "Janne",
    color: "Red",
    size: 7878,
    eyes: 4545,
    viciousness: 4343,
    head: 98989,
  };

  state.populateForm(abbamonster);
  // state.clearForm();
  renderMonsters();
});
