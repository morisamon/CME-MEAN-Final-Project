import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class KidsService {
    authToken: any;
    user: any;

    constructor(private http:Http) { }

    getKids(){
        return this.http.get('/api/kids')
            .map(res => res.json());
    }

    addNewKid(newKid) {
        var headers = new Headers();
        headers.append('Content-Type','application/json');
        return this.http.post('api/addkid', newKid, {headers: headers})
            .map(res => res.json());
    }
        
    deleteKid(id){
        return this.http.delete('/api/deletekid/' + id)
            .map(res => res.json());
    }
}