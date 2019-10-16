import { Directive, OnInit, Output, EventEmitter, Input, forwardRef, Component, OnDestroy } from "@angular/core";
import { PfGoogleMapComponent } from '../google-map.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceNumber } from '../types/coerce';
import { ZoomEvent } from '../types/events';
import { Subject, pipe } from 'rxjs';
import { takeUntil } from 'rxjs/operators';



@Directive({
    selector: 'pf-google-map[pfZoomControl],pf-zoom-control',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ZoomControlDirective),
            multi: true
        }
    ],
    exportAs: 'pfZoomControl'
})
export class ZoomControlDirective implements OnInit, OnDestroy, ControlValueAccessor {

    @Output('change')
    zoomEmitter = new EventEmitter<ZoomEvent>();

    @Input('value')
    set zoom(zoom: number){

        zoom = coerceNumber(zoom);

        if(zoom !== this.value){
            this.value = zoom;
            if(!this.disabled) this._parent.zoom = zoom;
            this.emit(zoom);
        }
    }
    get zoom(){
        return this.value;
    }

    @Input('disabled')
    disabled = false;

    value: number;

    private _onChange: any = ()=>{};
    private _onTouch:any = ()=>{};
    private _destroy$ = new Subject<void>();

    constructor(private _parent: PfGoogleMapComponent){}

    ngOnInit(){
        this._parent.init
            .subscribe(init => this.onMapInit())
    }

    private onMapInit(){
        this._parent
            .addZoomListener()
            .pipe(takeUntil(this._destroy$))
            .subscribe(zoom => {

                if(this.disabled) return;

                if(this.value !== zoom){
                    console.log('ZoomControlDirective: zoom change %o => %o', this.value, zoom);
                    this.value = zoom;
                    this.emit(zoom);
                    this._onTouch();
                }
            });
    }

    ngOnDestroy(){
        this._destroy$.next();
        this._destroy$.complete();
    }

    writeValue(obj: any): void {
        console.log('ZoomControlDirective: write %o', obj);
        obj = coerceNumber(obj);
        this.value = obj;
        this._parent.zoom = obj;
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

    increment(){
        this.zoom++;
    }

    decrement(){
        this.zoom--;
    }

    private emit(zoom: number){
        this._onChange(zoom);
        this.zoomEmitter.emit(new ZoomEvent(zoom));
        console.log('ZoomControlDirective: emit %o', zoom);
    }

}
