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

}