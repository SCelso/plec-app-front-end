interface Player {
    _id: string;
    email: string;
    nickname: string;
    __v: number;
}

export interface GamePlayer {
    player: Player;
    points: 0;
    index: 0;
}
