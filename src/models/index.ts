interface Tile {
  type: string;
  revealed: boolean;
  illuminated: boolean | undefined;
}
  
export interface Player {
  id: number,
  hasSpray: boolean,
  points: number
}

export interface Game {
  activePlayer: number;
  players: Player[];
  bearSpotted: boolean;

  gameOver: boolean;
  endGameStatus: string;

  deck: Tile[];
  flippedTiles: Tile[];
}