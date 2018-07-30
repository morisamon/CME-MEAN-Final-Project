export class GameSession {
    _id: Number; //kid id
    start_time: Date;
    end_time: Date; 
    areas: Area[];
    sumofvideoduration: Number;
}


export class Area{
    area: String;
    count: Number;
}