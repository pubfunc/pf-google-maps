import { Directive, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PfGoogleMapComponent } from '../google-map.component';
import { Direction, isLatLngEqual, LatLng } from '../types/coordinates';
import { PanEvent } from '../types/events';



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

    @Output('centerChange')
    centerEmitter = new EventEmitter<PanEvent>();

    @Input('center')
    set center(center: LatLng){
        this._parent.center = center;
        this.emit(center);
    }

    @Input('panDisabled')
    disabled = false;

    value: LatLng;

    private _onChange: any = ()=>{};
    private _onTouch:any = ()=>{};
    private _destroy$ = new Subject();

    constructor(private _parent: PfGoogleMapComponent){}

    ngOnInit(){
        // console.log('PanControlDirective: init');
        this._parent.init
            .subscribe(init => this.onMapInit())
    }

    ngOnDestroy(){
        // console.log('PanControlDirective: destroy');
        this._destroy$.next();
        this._destroy$.complete();
    }

    private onMapInit(){
        this._parent.addCenterListener().pipe(takeUntil(this._destroy$)).subscribe(center => {
            if(!isLatLngEqual(this.value, center)){
                // console.log('PanControlDirective: center change %o => %o', this.value, center);
                this.value = center;
                this.emit(center);
                this._onTouch();
            }
        });
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
        this.center = position;
    }

    panNorth(value: number = 1){ this.pan(value, Direction.NORTH) }
    panEast(value: number = 1){ this.pan(value, Direction.EAST) }
    panSouth(value: number = 1){ this.pan(value, Direction.SOUTH) }
    panWest(value: number = 1){ this.pan(value, Direction.WEST) }

    private emit(center: LatLng){
        this._onChange(center);
        this.centerEmitter.emit(new PanEvent(center));
        // console.log('PanControlDirective: emit %o', center);
    }

}

