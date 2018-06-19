/*---===lesson 01===---*/
//first stream
(function () {
    var stream$ = rxjs.Observable.create((observer) => {
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
    var btn$ = rxjs.fromEvent(button, 'click');


    btn$.subscribe(event => {
        console.log(event);
    });

    rxjs.fromEvent(document.querySelector('input'), 'keyup').subscribe(({target}) => {
        console.log(target.value);
    });

    rxjs.fromEvent(document, 'mousemove').subscribe(ev => {
        document.querySelector('#x').innerHTML = `X => ${ev.clientX}`;
        document.querySelector('#y').innerHTML = `Y => ${ev.clientY}`;
    });
})();

//simple operators

(function () {
    rxjs.of(1, 2, 3, 4, 'abcd').subscribe(data => {
        console.log(data);
    }, err => {
        console.log(err);
    }, () => {
        console.log('complete');
    });
})();