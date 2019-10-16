import { Directive, forwardRef, Input, OnDestroy, OnInit, InjectionToken } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { PfGoogleMapComponent } from '../google-map.component';
import { isLatLngEqual, LatLng } from '../types/coordinates';
import { MarkerOptions, MarkerAnimation } from '../types/google-map-literals';
import { coerceNumber } from '../types/coerce';

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

    @Input('disabled')
    disabled = false;

    @Input()
    set animation(animation: number | string | MarkerAnimation){

        console.log('MarkerDirective: set animation', animation);

        switch(animation){
            case 'none':
                this._animation = MarkerAnimation.NONE;
                break;
            case 'bounce':
                this._animation = MarkerAnimation.BOUNCE;
                break;
            case 'drop':
                this._animation = MarkerAnimation.DROP;
                break;
            default:
                this._animation = coerceNumber(animation, null);

        }

        if(this.marker) this.marker.setAnimation(google.maps.Animation.BOUNCE);

    }

    marker: google.maps.Marker;

    // private _position$ = new BehaviorSubject<LatLng>(null);
    private _animation: number = null;
    private _position: LatLng = null;
    private _destroy$ = new Subject<void>();
    private _onChange: any = ()=>{};
    private _onTouch:any = ()=>{};


    constructor(private _parent: PfGoogleMapComponent){}

    ngOnInit(){
        this._parent.init
            .subscribe(init => this.onMapInit());

    }

    ngOnDestroy(){
        console.log("MapMarkerDirective: destroy");
        this._destroy$.next();
        this._destroy$.complete();

        if(this.marker){
            this.marker.unbindAll();
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

        this.marker = new google.maps.Marker({
            map,
            position: this._position,
            draggable: true,
            animation: google.maps.Animation.BOUNCE,
        });

        this.marker.addListener('drag', (event: MouseEvent) => {

            let pos = this.marker.getPosition().toJSON();

            if(!isLatLngEqual(this._position, pos)){
                this._position = pos;
                this._onChange(pos);
            }

        });

        this.marker.addListener('dragend', (event: MouseEvent) => {
            this._onTouch();
        });

    }

}