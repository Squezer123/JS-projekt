// (function () {
//   const overworld = new Overworld({
//     hero: new Player('TestNicku'),
//     element: document.querySelector(".game-container")
//   });
//     overworld.init();
// })();

let initGame = (username,selectedClass) => {
  const gameElement = document.querySelector(".game-container");
  restartOverworld = false;
  gameElement.style.display = "block";
  overworld = new Overworld({
    hero: new Player(username,selectedClass,true),
    element: document.querySelector(".game-container")
  });
    overworld.init();
}