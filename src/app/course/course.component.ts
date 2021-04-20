import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Course} from "../model/course";
import {
    debounceTime,
    distinctUntilChanged,
    startWith,
    tap,
    delay,
    map,
    concatMap,
    switchMap,
    withLatestFrom,
    concatAll, shareReplay,
} from 'rxjs/operators';
import {merge, fromEvent, Observable, concat} from 'rxjs';
import {Lesson} from '../model/lesson';
import { createHttpObservable } from '../common/util';
import { FormControl } from '@angular/forms';


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {

    courseId: string;
    course$: Observable<Course>;
    lessons$: Observable<Lesson[]>;
    searchInput: FormControl;

    constructor(private route: ActivatedRoute) {


    }

    ngOnInit() {
        this.searchInput = new FormControl('')
        this.courseId = this.route.snapshot.params['id'];
        this.course$ = createHttpObservable(`/api/courses/${this.courseId}`);
    }

    ngAfterViewInit() {

        const searchLessons$ = this.searchInput.valueChanges
            .pipe(
                debounceTime(200),
                distinctUntilChanged(),
                switchMap(val => this.loadLessons(val))
            );

        this.lessons$ = concat(this.loadLessons(), searchLessons$);
    }

    loadLessons(search: string = ''): Observable<Lesson[]> {
        return createHttpObservable(`/api/lessons?courseId=${this.courseId}&pageSize=100&filter=${search}`)
            .pipe(
                map(res => res.payload)
            )
    }




}
