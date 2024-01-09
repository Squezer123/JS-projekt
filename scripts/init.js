// (function () {
//   const overworld = new Overworld({
//     hero: new Player(),
//     element: document.querySelector(".game-container")
//   });
//     overworld.init();
// })();

let initGame = () => {
  const gameElement = document.querySelector(".game-container");
  gameElement.style.display = "block";
  const overworld = new Overworld({
    hero: new Player(),
    element: document.querySelector(".game-container")
  });
    overworld.init();
}