import { Directive, forwardRef, Input, OnDestroy, OnInit } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PfGoogleMapComponent } from '../google-map.component';
import { isLatLngEqual } from '../types/coordinates';
import { Direction, LatLng } from '../types/common';



@Directive({
    selector: 'pf-google-map[pfPanControl],pf-pan-control',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => PanControlDirective),
            multi: true
        }
    ],
    exportAs: 'pfPanControl'
})
export class PanControlDirective implements OnInit, OnDestroy, ControlValueAccessor {

    @Input('panDisabled')
    disabled = false;

    value: LatLng;

    private _onChange: any = ()=>{};
    private _onTouch:any = ()=>{};
    private _destroy$ = new Subject();

    constructor(private _parent: PfGoogleMapComponent){}

    ngOnInit(){
        this._parent
        .panChangeEmitter
        .pipe(takeUntil(this._destroy$))
        .subscribe(event => {
            if(!isLatLngEqual(this.value, event.center)){
                // console.log('PanControlDirective: center change %o => %o', this.value, center);
                this.value = event.center;
                this._onChange(event.center);
                this._onTouch();
            }
        });
    }

    ngOnDestroy(){
        // console.log('PanControlDirective: destroy');
        this._destroy$.next();
        this._destroy$.complete();
    }

    writeValue(obj: any): void {
        // console.log('PanControlDirective: write %o', obj);
        this.value = obj;
        this._parent.center = obj;
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

    pan(value: number = 1, direction: Direction){

        let position = {...this.value};

        switch(direction){
            case Direction.NORTH:
                position.lat+=Number(value);
                break;
            case Direction.EAST:
                position.lng+=Number(value);
                break;
            case Direction.SOUTH:
                position.lat-=Number(value);
                break;
            case Direction.WEST:
                position.lng+=Number(value);
                    break;
        }
        this._parent.center = position;
    }

    panNorth(value: number = 1){ this.pan(value, Direction.NORTH) }
    panEast(value: number = 1){ this.pan(value, Direction.EAST) }
    panSouth(value: number = 1){ this.pan(value, Direction.SOUTH) }
    panWest(value: number = 1){ this.pan(value, Direction.WEST) }


}

