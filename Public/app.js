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
};

const resetForm = () => {
  // Reset form and button text
  document.querySelector("#type-input").value = "";
  document.querySelector("#name-input").value = "";
  document.querySelector("#color-input").value = "";
  document.querySelector("#size-input").value = "";
  document.querySelector("#eyes-input").value = "";
  document.querySelector("#viciousness-input").value = "";
  document.querySelector("#head-input").value = "";
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

  resetForm();
  renderMonsters();
});
