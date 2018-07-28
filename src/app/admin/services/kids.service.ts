import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpModule } from '@angular/http';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Kid } from '../Kid';

@Injectable()
export class KidsService {

    authToken: any;
    user: any;
    kidToEdit: Kid;

    constructor(private http:Http) { }

    getKids(){
        return this.http.get('/api/kids').pipe(
            map(res => res.json()));
    }

    addNewKid(newKid) {
        var headers = new Headers();
        headers.append('Content-Type','application/json');
        return this.http.post('api/addkid', newKid, {headers: headers}).pipe(
            map(res => res.json()));
    }
        
    deleteKid(id){
        return this.http.delete('/api/deletekid/' + id).pipe(
            map(res => res.json()));
    }

    editKid(kidToUpdate) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('/api/editkid/'+kidToUpdate._id, kidToUpdate, {headers: headers}).pipe(
            map(res => res.json()));
    }
}