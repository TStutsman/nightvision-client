import type { TileData } from "@/models";

export const postFlipTile = async (gameId:number, tileId:number):Promise<TileData[]> => {
  // TODO: Send API request to POST tile flip
  const data:{deck: TileData[]} = await fetch(`api/games/${gameId}/flipTile`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      tileId
    }),
  })
  .then(r => r.json());

  return data.deck;
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