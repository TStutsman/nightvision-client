export const flipTile = (gameId:number, tileId:number) => {
  // TODO: Send API request to POST tile flip
  fetch(`api/games/${gameId}/flipTile`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      tileId
    }),
  })
}

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