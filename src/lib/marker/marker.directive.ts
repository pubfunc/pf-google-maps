import { Directive, forwardRef, InjectionToken, Input, NgZone, OnDestroy, OnInit } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PfGoogleMapComponent } from '../google-map.component';
import { MVCEventManager } from '../mvc-event-manager';
import { coerceNumber } from '../types/coerce';
import { MarkerOptions, MarkerAnimation } from '../types/marker';
import { LatLng } from '../types/common';
import { isLatLngEqual } from '../types/coordinates';

export const MARKER_OPTIONS = new InjectionToken<MarkerOptions>('DEFAULT_MARKER_OPTIONS');

export const DEFAULT_MARKER_OPTIONS: MarkerOptions = {
};

@Directive({
    selector: 'pf-marker',
    exportAs: 'pfMarker',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MarkerDirective),
            multi: true
        }
    ],
})
export class MarkerDirective implements OnInit, OnDestroy, ControlValueAccessor {

    @Input('position')
    set position(pos: LatLng){
        this._position = pos;
        if(this.marker) this.marker.setPosition(pos);
    }
    get position(){
        return this._position;
    }

    @Input('title')
    set title(title: string){
        if(this._title !== title){
            this._title = title;
            if(this.marker) this.marker.setTitle(title);
        }
    }

    @Input('label')
    set label(label: string){
        if(this._label !== label){
            this._label = label;
            if(this.marker) this.marker.setLabel(label);
        }
    }

    @Input('disabled')
    disabled = false;

    @Input()
    set animation(animation: number | string | MarkerAnimation){

        if(animation !== this._animation){
            this._animation = animation;
            if(this.marker) {
                console.log('MarkerDirective: set animation', this._coerceMarkerAnimation(animation));
                this.marker.setAnimation(this._coerceMarkerAnimation(animation));
            }
        }

    }

    marker: google.maps.Marker;

    private _animation: number | string | MarkerAnimation = null;
    private _position: LatLng;
    private _title: string;
    private _label: string;

    private _destroy$ = new Subject<void>();
    private _onChange: any = ()=>{};
    private _onTouch:any = ()=>{};
    private _eventManager = new MVCEventManager(this._ngZone);

    constructor(
        private _parent: PfGoogleMapComponent,
        private _ngZone: NgZone
    ){}

    ngOnInit(){
        this._parent.init
            .subscribe(init => this.onMapInit());

    }

    ngOnDestroy(){
        console.log("MapMarkerDirective: destroy");
        this._destroy$.next();
        this._destroy$.complete();

        if(this.marker){
            this._eventManager.clear();
            this.marker.setMap(null);
        }

    }

    writeValue(obj: any): void {
        this._position = obj;
        if(this.marker) this.marker.setPosition(obj);
    }

    registerOnChange(fn: any): void {
        this._onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this._onTouch = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    private onMapInit(){

        const map = this._parent.map;

        this._ngZone.runOutsideAngular(() => {
            this.marker = new google.maps.Marker({
                map,
                position: this._position,
                draggable: true,
                animation: this._coerceMarkerAnimation(this._animation),
                title: this._title,
                label: this._label
            });

            this._eventManager.setSource(this.marker);
            console.log('marker created', this.marker);
        });


        this._eventManager.getEmitter<MouseEvent>('drag')
            .pipe(takeUntil(this._destroy$))
            .subscribe(event => {
                let pos = this.marker.getPosition().toJSON();
                if(!isLatLngEqual(this._position, pos)){
                    this._position = pos;
                    this._onChange(pos);
                }
            });

        this._eventManager.getEmitter<MouseEvent>('dragend')
            .pipe(takeUntil(this._destroy$))
            .subscribe(event => {
                this._onTouch();
            });

    }

    private _coerceMarkerAnimation(animation: number | string | MarkerAnimation): google.maps.Animation {
        switch(animation){
            case 'none':
                return null;
            case 'bounce':
                return google.maps.Animation.BOUNCE;
            case 'drop':
                return google.maps.Animation.DROP;
            default:
                return coerceNumber(animation, null);
        }
    }

}