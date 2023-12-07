(function () {

  const overworld = new Overworld({
    hero: new Player(),
    element: document.querySelector(".game-container")
  });

    overworld.init();

})();