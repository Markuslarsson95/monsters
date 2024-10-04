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
};

//render()
const render = () => {
  const card = document.querySelector(".cards");

  for (const m of state.select) {
    const monster = document.createElement("div");

    monster.innerHTML = `<h2> ${m.name} </h2>.<p> Type: ${m.type}. <p> Color: ${m.color}. <p> Size: ${m.size}. <p> Eye Amount: ${m.eyeNum}. <p> Viciousness: ${m.viciousness}  <p>  Head Amount: ${m.headNum}   `;

    card.appendChild(monster);
  }
};
render();

//app
