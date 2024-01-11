// (function () {
//   const overworld = new Overworld({
//     hero: new Player('TestNicku'),
//     element: document.querySelector(".game-container")
//   });
//     overworld.init();
// })();

let initGame = (selectedClass) => {
  const gameElement = document.querySelector(".game-container");
  gameElement.style.display = "block";
  const overworld = new Overworld({
    hero: new Player('TestNicku',selectedClass),
    element: document.querySelector(".game-container")
  });
    overworld.init();
}