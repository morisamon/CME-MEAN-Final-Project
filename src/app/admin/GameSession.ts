
export class GameSession {
    _id: Number;
    kidid: Number;
    start_time: Date;
    end_time: Date; 
    video_duration: Number;
    areas: JSON;
}

export class Area{
    area: String;
    count: Number;
}