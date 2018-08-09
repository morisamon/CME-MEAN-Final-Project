import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { SvmVector } from '../../models/SvmVector';

@Injectable()
export class SvmVectorService {


    constructor(private http:Http) { }

    getDataSet() {
        return this.http.get('/api/svmvectors').pipe(
            map(res => res.json()));
    }

    addNewVector(newVector) {
        var headers = new Headers();
        headers.append('Content-Type','application/json');
        return this.http.post('api/addvector', newVector, {headers: headers}).pipe(
            map(res => res.json()));
    }

    ConvertVectorToObject(vector, label): SvmVector {
        var x = new SvmVector();
        x.total_time = vector[0];
        x.video_duration = vector[1];
        x.vagrancy_time = vector[2];
        x.area1 = vector[3];
        x.area2 = vector[4];
        x.area3 = vector[5];
        x.area4 = vector[6];
        x.area5 = vector[7];
        x.area6 = vector[8];
        x.areaface = vector[9];
        x.areaeyes = vector[10];
        x.label = label;
  
        return x;
    }
}