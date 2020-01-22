import { Observable, BehaviorSubject } from 'rxjs';
import { filter, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { NgZone } from '@angular/core';





export class MVCEventManager {

    private _source$ = new BehaviorSubject<google.maps.MVCObject>(undefined);
    private _listeners: google.maps.MapsEventListener[] = [];

    constructor(private _ngZone: NgZone){}

    setSource(source: google.maps.MVCObject){
        this._source$.next(source);
    }

    getEmitter<T>(eventName: string): Observable<T>{

        return this._source$.pipe(
            filter(source => !!source),
            distinctUntilChanged(),
            switchMap(source => this._observeEvent<T>(source, eventName))
        );

    }

    clear(){
        this._listeners.forEach(l => l.remove());
        this._listeners = [];
    }

    private _observeEvent<T>(source: google.maps.MVCObject, eventName: string): Observable<T>{

        return new Observable<T>(observer => {

            const listener = source.addListener(eventName, (event: T) => {
                this._ngZone.run(() => observer.next(event));
            });

            this._listeners.push(listener);

            return () => listener.remove();
        });

    }


}