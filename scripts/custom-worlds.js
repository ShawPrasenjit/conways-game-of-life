function createOceanSim(rows, cols, pixelSize, roundDelay) {
  let sim = new Simulation(rows, cols, pixelSize, roundDelay, 0);

  let oceanHeight = Math.floor(rows * .75);
  let liveBar = rand(oceanHeight, sim.grid.length);
  let conwaysRules = generateUpdateFunction(2, 3, 3, 3);
  let oceanRules = generateUpdateFunction(2, 2, 3, 3);
  let [oceanLife, oceanDeath] = randomColorPair();

  sim.grid.forEach((row, i) => {
    row.forEach((entity) => {
      if(i > oceanHeight){
        entity.update = oceanRules;
        entity.lifeStyle = oceanLife;
        entity.deathStyle = oceanDeath;
      }

      if(i === liveBar) {
        entity.alive = true;
      }
    });
  });

  setRainbowSchemeWithin(sim, 0, sim.grid.length, 0, sim.grid[0].length);

  return sim;
}

/*
  Make everything rainbow colored dawwg.
*/
function setRainbowSchemeWithin(sim, startRow, stopRow, startCol, stopCol) {
  let rows = stopRow - startRow;
  let cols = stopCol - startCol;
  let diagonalLength = Math.sqrt((rows * rows) + (cols * cols)); //rows^2 + cols^2
  let hueIncrement = 360 / diagonalLength;
  console.log(startRow, stopRow, startCol, stopCol);
  for(let i = startRow; i < stopRow; i++) {
    for(let j = startCol; j < stopCol; j++) {
      let h = Math.floor(Math.sqrt((i * i) + (j * j)) * hueIncrement);
      sim.grid[i][j].lifeStyle = `hsl(${h}, 100%, 60%)`;
      sim.grid[i][j].deathStyle = '#000000';
    }
  }
}

function createWildOceanSim(rows, cols, pixelSize, roundDelay) {
  let sim = new Simulation(rows, cols, pixelSize, roundDelay, 0);

  let oceanHeight = Math.floor(rows / 2);
  let midOceanHeight = oceanHeight + Math.floor(oceanHeight / 2)
  let midOceanWidth = Math.floor(cols / 2);

  let conwaysRules = generateUpdateFunction(2, 3, 3, 3);
  let oceanRules = generateUpdateFunction(2, 2, 3, 3);
  let lifeGenRules = generateUpdateFunction(9, 0, 0, 4)

  let [oceanLife, oceanDeath] = randomColorPair();
  let [lifeGenLife, lifeGenDeath] = randomColorPair();

  sim.grid.forEach((row, i) => {
    row.forEach((entity, j) => {
      if(i > oceanHeight){
        entity.update = oceanRules;
        entity.lifeStyle = oceanLife;
        entity.deathStyle = oceanDeath;
      }

      if(i === midOceanHeight || i === sim.grid.length - 1 || (j === midOceanWidth)) {
        entity.update = lifeGenRules;
        entity.lifeStyle = lifeGenLife;
        entity.deathStyle = lifeGenDeath;
      }
    });
  });

  return sim;
}