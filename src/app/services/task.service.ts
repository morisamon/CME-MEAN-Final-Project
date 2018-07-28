import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable()
export class TaskService{
    constructor(private http:Http){
        console.log('sh Task Service Initialized...');
    }
    
    getTasks(): Observable<any> {
        return this.http.get('/api/tasks').pipe(
            map(res => res.json()));
    }
    
    addTask(newTask){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/task', JSON.stringify(newTask), {headers: headers}).pipe(
            map(res => res.json()));
    }
    
    deleteTask(id){
        return this.http.delete('/api/task/'+id).pipe(
            map(res => res.json()));
    }
    
    updateStatus(task){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('/api/task/'+task._id, JSON.stringify(task), {headers: headers}).pipe(
            map(res => res.json()));
    }
}