import { Observable } from 'rxjs';


export function createHttpObservable(url: string): Observable<any> {
    return new Observable(subscriber => {

        const controller = new AbortController();
        const signal = controller.signal;

        fetch(url, {signal})
            .then(response => {
                return response.json();
            })
            .then(body => {
                subscriber.next(body);
                subscriber.complete();
            })
            .catch(err => {
                subscriber.error(err);
            });

        return () => controller.abort();
    });
}
