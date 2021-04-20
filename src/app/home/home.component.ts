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
    public beginnerCourses$: Observable<Course[]>;
    public advancedCourses$: Observable<Course[]>;

    constructor() {
    }

    public ngOnInit(): void {

        const http$: Observable<any> = createHttpObservable('/api/courses');

        const courses$: Observable<Course[]> = http$.pipe(
            map(res => Object.values(res.payload as Course[])),
            shareReplay()
        );

        this.beginnerCourses$ = courses$.pipe(
            map(courses => courses.filter(course => course.category === 'BEGINNER'))
        );
        this.advancedCourses$ = courses$.pipe(
            map(courses => courses.filter(course => course.category === 'ADVANCED'))
        );

    }

}

