import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';

/**
 * GeocodingService class.
 * https://developers.google.com/maps/documentation/javascript/
 */
@Injectable() export class GeocodingService {


    constructor(private http:Http) {
    }

    codeAddress(address) {
        var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address +"&key=AIzaSyAKdYwyz2q3cz8o6YeBJyWMA4tpl0Z9_mo"
        return this.http.get(url).pipe(
            map(res => res.json()));
    }

}
