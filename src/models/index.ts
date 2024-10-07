export interface TileData {
  type: string,
  revealed: boolean,
  illuminated: boolean | undefined
}
  
export interface Player {
  id: number,
  hasSpray: boolean,
  points: number
}

export interface Game {
  id: number;

  activePlayer: number;
  players: Player[];
  bearSpotted: boolean;

  gameOver: boolean;
  endGameStatus: string;

  deck: TileData[];
  flippedTiles: TileData[];
}