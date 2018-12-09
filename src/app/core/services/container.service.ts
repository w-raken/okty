import { Injectable } from '@angular/core';
import Container from '../models/container';
import { ApiService } from './api.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ContainerService {

    constructor(private api: ApiService) {
    }

    public getAll(): Observable<Container[]> {
        return this.api.get('container/form').pipe(
            map((elements: Array<object>) => {
                return elements.map(element => Object.assign(new Container, element));
            }),
            catchError((error: HttpErrorResponse) => {
                console.error(error.message);
                return of([]);
            })
        );
    }
}