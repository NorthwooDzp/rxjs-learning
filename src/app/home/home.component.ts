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

        const interval$: Observable<number> = interval(1000);

        const timer$: Observable<number> = timer(3000, 1000);

        const clicks$: Observable<Event> = fromEvent(document, 'click');

        interval$.subscribe(val => {
            console.log('stream 1 => ', val);
        })

        timer$.subscribe(val => {
            console.log('stream 2 => ', val);
        })

        const clicksSubs: Subscription = clicks$.subscribe(ev => {
            console.log('clicks => ', ev);
        }, err => { // wont run complete after and won't emit new values
            console.log('click err => ', err);
        }, () => { // wont throw errors and emit new values
            console.log('clicks completed');
        });

        setTimeout(() => {
            clicksSubs.unsubscribe();
        }, 6000)


    }

}
