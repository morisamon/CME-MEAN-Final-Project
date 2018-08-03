import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class GameSessionService {

    constructor(private http:Http) { }

    getSessionsByKidID(id) {
        return this.http.get('/api/sessions/' + id).pipe(
            map(res => res.json()));
    }

    addNewSessionForKid(session) {
        var headers = new Headers();
        headers.append('Content-Type','application/json');
        return this.http.post('api/addsession', session, {headers: headers}).pipe(
            map(res => res.json()));
    }

    deleteSession(id){
        return this.http.delete('/api/deletesession/' + id).pipe( //startTime? todo
            map(res => res.json()));
    }

    getGameSessionsWithFilter(kidid, maxTotalTimeFilter, levelFilter, characterFilter) {
        if (!maxTotalTimeFilter)
            maxTotalTimeFilter = 9999999;
        if (!levelFilter)
            levelFilter = 0;
        if (!characterFilter)
            characterFilter = "";
        var filter = { kidid: Number(kidid), total_time: Number(maxTotalTimeFilter), level: Number(levelFilter), character: characterFilter }
        return this.http.get('/api/sessionsfilter', { params: filter }).pipe(
            map(res => res.json()));
    }
}