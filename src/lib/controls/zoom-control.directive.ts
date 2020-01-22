import { Directive, forwardRef, Input, OnDestroy, OnInit } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PfGoogleMapComponent } from '../google-map.component';
import { coerceNumber } from '../types/coerce';



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

    @Input('zoomDisabled')
    disabled = false;

    value: number;

    private _onChange: any = ()=>{};
    private _onTouch:any = ()=>{};
    private _destroy$ = new Subject<void>();

    constructor(private _parent: PfGoogleMapComponent){}

    ngOnInit(){
        this._parent
            .zoomChangeEmitter
            .pipe(takeUntil(this._destroy$))
            .subscribe(event => {

                console.log('ZoomControlDirective: zoom emit', event);

                if(this.disabled) return;

                if(this.value !== event.zoom){
                    console.log('ZoomControlDirective: zoom change %o => %o', this.value, event.zoom);
                    this.value = event.zoom;
                    this._onChange(event.zoom);
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
        this.value++;
        this._parent.zoom = this.value;
    }

    decrement(){
        this.value--;
        this._parent.zoom = this.value;
    }

}
