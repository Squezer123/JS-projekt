(function () {

  const overworld = new Overworld({
    hero: new Person({
      id: "hero",
      isPlayerControlled: true,
      x: utils.withGrid(1),
      y: utils.withGrid(1),
      inventory: [],
    }),
    element: document.querySelector(".game-container")
  });
  overworld.init();

})();