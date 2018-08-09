import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class SvmVectorService {


    constructor(private http:Http) { }

    getDataSet() {
        return this.http.get('/api/svmvectors').pipe(
            map(res => res.json()));
    }

    addNewKid(newVector) {
        var headers = new Headers();
        headers.append('Content-Type','application/json');
        return this.http.post('api/addvector', newVector, {headers: headers}).pipe(
            map(res => res.json()));
    }
}