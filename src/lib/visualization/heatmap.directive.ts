import { Directive, Input, NgZone, OnDestroy, OnInit } from "@angular/core";
import { Subject } from 'rxjs';
import { PfGoogleMapComponent } from '../google-map.component';
import { toMVCLatLngOrWeightedArray } from '../types/mvc';
import { WeightedLocation } from '../types/heatmap';
import { LatLng } from '../types/common';



@Directive({
    selector: 'pf-heatmap'
})
export class HeatmapDirective implements OnInit, OnDestroy {

    @Input()
    set data(data: Array<LatLng | WeightedLocation>){
        this._data = data;
        if(this.heatmap) this.heatmap.setData(toMVCLatLngOrWeightedArray(data));
    }

    heatmap: google.maps.visualization.HeatmapLayer;

    private _destroy$ = new Subject<void>();
    private _data: Array<LatLng | WeightedLocation>;


    constructor(
        private _parent: PfGoogleMapComponent,
        private _ngZone: NgZone,
        ) { }

    ngOnInit() {
        this._parent.init
            .subscribe(init => this.onMapInit());

    }

    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }

    private onMapInit() {

        const map = this._parent.map;

        this.heatmap = new google.maps.visualization.HeatmapLayer({
            data: toMVCLatLngOrWeightedArray(this._data),
            radius: 20,
            map
        });

    }


}