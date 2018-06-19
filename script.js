/*---===lesson 01===---*/
//first stream
(function () {
    var stream$ = Rx.Observable.create((observer) => {
        observer.next('now');

        setTimeout(() => {
            observer.next('2 sec')
        }, 2000);

        setTimeout(() => {
            observer.error('Something went wrong')
        }, 4000);

        setTimeout(() => {
            observer.next('5 sec')
        }, 5000);

        setTimeout(() => {
            observer.next('1 sec')
        }, 1000);

        setTimeout(() => {
            observer.complete();
        }, 6000);



    });
    stream$.subscribe(
        data => { // data
            console.log('data =>', data);
        }, err => { // error
            console.log(err);
        }, () => { // complete
            console.log('complete');
        });
})();

//stream from event

(function () {
    var button = document.querySelector('button');
    var btn$ = Rx.Observable.fromEvent(button, 'click');


    btn$.subscribe(event => {
        console.log(event);
    });

    Rx.Observable.fromEvent(document.querySelector('input'), 'keyup').subscribe(({target}) => {
        console.log(target.value);
    });

    Rx.Observable.fromEvent(document, 'mousemove').subscribe(ev => {
        document.querySelector('#x').innerHTML = `X => ${ev.clientX}`;
        document.querySelector('#y').innerHTML = `Y => ${ev.clientY}`;
    });
})();

//simple operators

let createSubscribe = (name) => {
    return {
        next(x) {
            console.log(`Data ${name} => ${x}`);
        },
        error(err) {
            console.log(`Error ${name} => ${err}`)
        },
        complete() {
            console.log(`Completed!`);
        }
    }
}

(function () {
    Rx.Observable.of(1, 2, 3, 4, 'abcd', [5, 7, 9], {foo: 'bar'})
        .subscribe(createSubscribe('of'));


    Rx.Observable.interval(700)
        .take(5)
        .subscribe(createSubscribe('interval'));

    Rx.Observable.timer(8000, 350).
        take(4)
        .subscribe(createSubscribe('timer'));

    Rx.Observable.range(5, 15)
        .subscribe(createSubscribe('range'));

})();