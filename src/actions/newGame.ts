const game = {id: -1};

export async function createNewGame():Promise<void> {
    const res = await fetch('/api/games/new')
    const data = await res.json();
    game.id = data.gameId;
}

export function initNewGame():{id:number} {
    return game;
}