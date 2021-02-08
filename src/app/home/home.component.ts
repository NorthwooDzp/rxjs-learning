import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { fromEvent, interval, Observable, of, Subscription, timer } from 'rxjs';
import { catchError, delayWhen, map, retryWhen, shareReplay, tap, timeout } from 'rxjs/operators';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


    constructor() {
    }

    public ngOnInit(): void {

        const http$ = Observable.create(observer => {
            fetch('http://localhost:9000/api/courses')
                .then(response => response.json())
                .then(body => {
                    observer.next(body);
                    observer.complete();
                })
                .catch(err => {
                    observer.error(err);
                });
        });

        http$.subscribe(val => {
            console.log(val);
        }, err => {
            console.log(err);
        }, () => {
            console.log('complete');
        });

    }

}
