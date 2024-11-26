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

export interface Game extends Object {
  id: string;

  activePlayer: number;
  players: { [id:number]: Player };
  message: string;

  gameOver: boolean;
  endGameStatus: string;

  deck: TileData[];
  flippedTiles: TileData[];
}
