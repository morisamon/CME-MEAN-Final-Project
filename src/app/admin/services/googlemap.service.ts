import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { HttpModule } from '@angular/http';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Kid } from '../Kid';

@Injectable()
export class GooglemapService {

    authToken: any;
    user: any;

    constructor(private http:Http) { }
}