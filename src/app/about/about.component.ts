import { Component, OnInit } from '@angular/core';
import { concat, merge, interval, Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';

@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {

        /**
         * Concat strategy
         */
        const source1$: Observable<number> = of(1, 2, 3);
        const source2$: Observable<number> = of(4, 5, 6);
        const source3$: Observable<number> = of(7, 8, 9);
        // concat(source1$, source2$, source3$).subscribe(console.log);


        /**
         * Merge strategy
         */
        const interval1$ = interval(1000);
        const interval2$ = interval1$.pipe(map(val => val * 10));
        // merge(interval1$, interval2$).subscribe(console.log)

        /**
         * Observable unsubscription
         */
        const intervalSubs: Subscription = interval1$.subscribe(console.log);

        setTimeout(() => {
            intervalSubs.unsubscribe()
        }, 5000)

        const http$ = createHttpObservable('/api/courses');

        const subs = http$.subscribe();

        setTimeout(() => {
            subs.unsubscribe();
        }, 10)

    }

}
