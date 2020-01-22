import { Directive, Input } from "@angular/core";
import { PfGoogleMapComponent } from '../google-map.component';





@Directive({
    selector: 'pf-geo-json-layer',
})
export class GeoJsonLayerDirective {

    @Input()
    set data(data: any){
        if(this._data !== data){
            this._data = data;
            if(this._parent) {
            }
        }
    }

    private _data: any;

    constructor(private _parent: PfGoogleMapComponent){}

}