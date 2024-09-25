import type { TileData } from "@/models";

export const postFlipTile = (gameId:number, tileId:number) => {
  // TODO: Send API request to POST tile flip
  let tile:TileData | null = null;
  fetch(`api/games/${gameId}/flipTile`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      tileId
    }),
  })
  .then(r => r.json())
  .then(res => tile = res)

  return tile;
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