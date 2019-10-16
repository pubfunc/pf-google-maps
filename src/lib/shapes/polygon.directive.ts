import { Directive, forwardRef, InjectionToken, Input, OnDestroy, OnInit } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { PfGoogleMapComponent } from '../google-map.component';
import { isLatLngArrayEqual, LatLng } from '../types/coordinates';
import { PolygonOptions } from '../types/google-map-literals';
import { updateMVCArray } from '../types/mvc';

export const POLYGON_OPTIONS = new InjectionToken<PolygonOptions>('DEFAULT_POLYGON_OPTIONS');

export const DEFAULT_POLYGON_OPTIONS: PolygonOptions = {
};

@Directive({
    selector: 'pf-polygon`',
    exportAs: 'pfPolygon',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => PolygonDirective),
            multi: true
        }
    ],
})
export class PolygonDirective implements OnInit, OnDestroy, ControlValueAccessor {

    @Input('path')
    set path(path: Array<LatLng>) {
        this._path = path;
        if (this.poly) this.updatePolyPath(path);
    }
    get path() {
        return this._path;
    }

    @Input('geodesic')
    set geodesic(geodesic: boolean) {
        this._geodesic = geodesic;
        if (this.poly) this.poly.setOptions({ geodesic });
    }
    get geodesic() {
        return this._geodesic;
    }

    @Input('disabled')
    disabled = false;

    poly: google.maps.Polygon;
    polyPath: google.maps.MVCArray<google.maps.LatLng>;

    private _isPathUpdating = false;
    private _geodesic: boolean = false;
    private _path: Array<LatLng> = null;
    private _destroy$ = new Subject<void>();
    private _onChange: any = () => { };
    private _onTouch: any = () => { };


    constructor(private _parent: PfGoogleMapComponent) { }

    ngOnInit() {
        this._parent.init
            .subscribe(init => this.onMapInit());

    }

    ngOnDestroy() {
        console.log("PolygonDirective: destroy");
        this._destroy$.next();
        this._destroy$.complete();

        if (this.poly) {
            this.poly.unbindAll();
            this.poly.setMap(null);
        }

    }

    writeValue(obj: any): void {
        this._path = obj;
        if (this.poly) this.updatePolyPath(obj);
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

    private onMapInit() {

        const map = this._parent.map;

        this.polyPath = new google.maps.MVCArray(
            this._path.map(coor => new google.maps.LatLng(coor))
        );

        this.poly = new google.maps.Polygon({
            map,
            paths: this.polyPath,
            draggable: true,
            editable: true,
            geodesic: this._geodesic,
        });

        this.polyPath.addListener('remove_at', (index: number) => this.handlePathChange());
        this.polyPath.addListener('insert_at', (index: number, removed: google.maps.LatLngLiteral) => this.handlePathChange());
        this.polyPath.addListener('set_at', (index: number, prev: google.maps.LatLngLiteral) => this.handlePathChange());
        // this.poly.addListener('dragend', (event: google.maps.PolyMouseEvent) => this._onTouch());
        this.poly.addListener('mouseup', (event: google.maps.PolyMouseEvent) => this._onTouch());

    }

    private handlePathChange() {

        console.log('handlePathChange');

        if (this._isPathUpdating) return;

        let pos = this.polyPath.getArray().map(ll => ll.toJSON());

        if (!isLatLngArrayEqual(this._path, pos)) {
            this._path = pos;
            this._onChange(pos);
        }
    }

    private updatePolyPath(literal: Array<LatLng>) {

        if (!this.polyPath) return;

        this._isPathUpdating = true;
        updateMVCArray(literal, this.polyPath);
        this._isPathUpdating = false;
    }

}