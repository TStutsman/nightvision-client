export function deilluminate(id:number) {
  // TODO: helper fn to animate tiles
}

export const resetGame = () => {
  let game;
  fetch(`api/games/new`)
    .then(res => res.json())
    .then(data => game = data);
  return game;
}