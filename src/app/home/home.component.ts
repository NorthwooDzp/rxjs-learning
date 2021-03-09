import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { fromEvent, interval, Observable, of, Subscription, timer } from 'rxjs';
import { catchError, delayWhen, map, retryWhen, shareReplay, tap, timeout } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


    constructor() {
    }

    public ngOnInit(): void {

        const http$: Observable<any> = createHttpObservable('http://localhost:9000/api/courses');
        const courses$ = http$.pipe(
            map(res => Object.values(res.payload))
        );

        courses$.subscribe(val => {
            console.log(val);
        }, err => {
            console.log(err);
        }, () => {
            console.log('complete');
        });

    }

}

