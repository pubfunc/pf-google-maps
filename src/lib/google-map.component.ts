import { Component, OnInit, OnDestroy, ElementRef, ViewEncapsulation, ViewChild, Input } from "@angular/core";
import { GoogleMapsApiLoaderService } from './google-maps-api-loader.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, map, switchMap, takeUntil, distinctUntilChanged, tap } from 'rxjs/operators';
import { coerceNumber } from './types/coerce';
import { LatLng } from './types/coordinates';



@Component({
    selector: 'pf-google-map',
    template: `<div class="map-container" #container></div><ng-content></ng-content>`,
    styles: [
        `
            :host {
                display: block;
                min-height: 100px;
                min-width: 100px;
            }
            .map-container {
                width: 100%;
                height: 100%;
            }
        `
    ],
    encapsulation: ViewEncapsulation.ShadowDom
})
export class PfGoogleMapComponent implements OnInit, OnDestroy {

    @ViewChild('container', {static: true})
    container: ElementRef<HTMLDivElement>;

    @Input()
    set zoom(zoom: number){
        this._zoom$.next(coerceNumber(zoom));
    }
    get zoom(){
        return this._zoom$.getValue();
    }

    @Input()
    set center(center: LatLng){
        this._center$.next(center);
    }
    get center(){
        return this._center$.getValue();
    }


    private _zoom$ = new BehaviorSubject<number>(8);
    private _center$ = new BehaviorSubject<LatLng>({lat: -34.397, lng: 150.644});

    private _destroy$ = new Subject<void>();
    private _init$ = new BehaviorSubject<boolean>(false);

    map: google.maps.Map;
    init: Observable<void>;

    constructor(
        private _apiLoader: GoogleMapsApiLoaderService,
        private _hostEl: ElementRef
    ){
        this.init = this._init$
            .pipe(
                filter(init => init),
                map(init => { return; }),
            );
    }

    ngOnInit(){
        this._apiLoader.init()
            .then(
                () => {
                    this.onApiInit();
                    this._init$.next(true);
                },
                e => {
                    this._init$.error(e);
                }
            );
    }

    onApiInit(){
        let map = this.map = new google.maps.Map(this.container.nativeElement, {
            center: this._center$.getValue(),
            zoom: this._zoom$.getValue(),
        });

        this._zoom$.pipe(distinctUntilChanged()).subscribe(zoom => {
            console.log('map set zoom', zoom);
            map.setZoom(zoom);
        });

        this._center$.pipe(distinctUntilChanged()).subscribe(center => {
            console.log('map set center', center);
            map.setCenter(center);
        });
    }

    ngOnDestroy(){
        console.log('map destroy');
        if(this.map) this.map.unbindAll();
        this._init$.complete();
        this._destroy$.next();
        this._destroy$.complete();
    }

    addZoomListener(){
        return this.init.pipe(
            switchMap(() => this.observeEvent('zoom_changed')),
            map(() => this.map.getZoom())
        );
    }

    addCenterListener(){
        return this.init.pipe(
            switchMap(() => this.observeEvent('center_changed')),
            // tap(() => console.log('center', this.map.getCenter())),
            map((): LatLng => this.map.getCenter().toJSON())
        );
    }

    private observeEvent(eventName: string): Observable<void>{
        return new Observable(observer => {

            let ref = this.map.addListener(eventName, (...args: any[]) => {
                // console.log('fire', eventName);
                observer.next();
            });

            console.log('listener added', eventName);

            return () => {
                console.log('listener removed', eventName);
                google.maps.event.removeListener(ref);
                observer.complete();
            };
        });
    }

}