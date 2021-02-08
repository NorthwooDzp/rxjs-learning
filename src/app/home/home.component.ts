import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { fromEvent, interval, Observable, of, timer } from 'rxjs';
import { catchError, delayWhen, map, retryWhen, shareReplay, tap } from 'rxjs/operators';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


    constructor() {
    }

    public ngOnInit(): void {

        const interval$ = interval(1000);

        const timer$ = timer(3000, 1000);

        const clicks$ = fromEvent(document, 'click');

        interval$.subscribe(val => {
            console.log('stream 1 => ', val);
        })

        timer$.subscribe(val => {
            console.log('stream 2 => ', val);
        })

        clicks$.subscribe(ev => {
            console.log('clicks => ', ev);
        })

    }

}
