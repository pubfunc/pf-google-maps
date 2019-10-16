import { Directive, OnInit, OnDestroy } from "@angular/core";
import { PfGoogleMapComponent } from '../google-map.component';




@Directive({
    selector: 'pf-marker-cluster',
    exportAs: 'pfMapMarker',
})
export class MarkerClusterDirective  implements OnInit, OnDestroy {

    constructor(private _parent: PfGoogleMapComponent){}

    ngOnInit(){
        this._parent.init
            .subscribe(init => this.onMapInit());
    }

    private onMapInit(){

    }

    ngOnDestroy(){

    }

}