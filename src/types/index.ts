export interface TileData {
  type: string,
  url: string,
  revealed: boolean,
  illuminated: boolean | undefined
}
  
export interface Player {
  id: number,
  hasSpray: boolean,
  points: number
}

export interface Game {
  activePlayer: number;
  players: { [id:number]: Player };
  message: string;

  endGameStatus: string;

  deck: TileData[];
  flippedTiles: TileData[];

  images: string[];
}
