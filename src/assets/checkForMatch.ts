export function checkForMatch(flippedTiles:{type: string, id:number}[]) {
    return flippedTiles[0].type == flippedTiles[1].type;
}