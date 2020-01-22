import { Component, ElementRef, Input, NgZone, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation, InjectionToken } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { GoogleMapsApiLoaderService } from './google-maps-api-loader.service';
import { MVCEventManager } from './mvc-event-manager';
import { LatLng } from './types/common';
import { PanEvent, ZoomEvent } from './types/events';
import { MapOptions } from './types/maps';

export const MAP_OPTIONS = new InjectionToken<MapOptions>('DEFAULT_MAP_OPTIONS');

export const DEFAULT_MAP_OPTIONS: MapOptions = {
};

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
        this._zoom = zoom;
        if(this.map) this.map.setZoom(zoom);
    }

    @Input()
    set center(center: LatLng){
        this._center = center;
        if(this.map) this.map.setCenter(center);
    }


    private _zoom: number;
    private _center: LatLng;

    private _destroy$ = new Subject<void>();
    private _init$ = new BehaviorSubject<boolean>(false);

    private _eventManager = new MVCEventManager(this._ngZone);

    @Output('zoomChange')
    zoomChangeEmitter = this._eventManager.getEmitter('zoom_changed')
                            .pipe(map(() => this._makeZoomEvent()));

    @Output('panChange')
    panChangeEmitter = this._eventManager.getEmitter('center_changed')
                            .pipe(map(() => this._makePanEvent()));

    map: google.maps.Map;
    init: Observable<void>;

    constructor(
        private _apiLoader: GoogleMapsApiLoaderService,
        private _hostEl: ElementRef,
        private _ngZone: NgZone,
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

        this._ngZone.runOutsideAngular(() => {
            let map = this.map = new google.maps.Map(this.container.nativeElement, {
                center: this._center,
                zoom: this._zoom,
            });
            this._eventManager.setSource(map);
        });

    }

    ngOnDestroy(){
        this._eventManager.clear();
        this._init$.complete();
        this._destroy$.next();
        this._destroy$.complete();
    }

    private _makeZoomEvent(): ZoomEvent {
        return {
            zoom: this.map ? this.map.getZoom() : null,
        };
    }

    private _makePanEvent(): PanEvent {
        return {
            center: this.map ? this.map.getCenter().toJSON() : null
        };
    }

}