import { Directive, forwardRef, InjectionToken, Input, NgZone, OnDestroy, OnInit } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MVCEventManager } from '../mvc-event-manager';
import { Subject } from 'rxjs';
import { PfGoogleMapComponent } from '../google-map.component';
import { LatLng } from '../types/common';
import { isLatLngArrayEqual } from '../types/coordinates';
import { updateMVCArray } from '../types/mvc';
import { PolygonOptions } from '../types/polygon';

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
    private _eventManager = new MVCEventManager(this._ngZone);


    constructor(
        private _parent: PfGoogleMapComponent,
        private _ngZone: NgZone,
        ) { }

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

        this._eventManager.setSource(this.polyPath);

        this._eventManager.getEmitter<number>('remove_at')
            .subscribe(() => this.handlePathChange());
        this._eventManager.getEmitter<number>('insert_at')
            .subscribe(() => this.handlePathChange());
        this._eventManager.getEmitter<number>('set_at')
            .subscribe(() => this.handlePathChange());
        this._eventManager.getEmitter<MouseEvent>('mouseup')
            .subscribe(() => this._onTouch());
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