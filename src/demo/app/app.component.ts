import { Component, ViewChild, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { PanControlDirective } from 'pf-google-maps';
import { ZoomControlDirective } from 'pf-google-maps';

@Component({
    selector: 'pf-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    isMapActive = true;

    @ViewChild(ZoomControlDirective, { static: false })
    zoomControl: ZoomControlDirective;
    isZoomActive = true;
    zoom = 4;

    @ViewChild(PanControlDirective, { static: false })
    panControl: PanControlDirective;
    isPanActive = true;
    pan = { lat: -27.611842141939867, lng: 120.26192737274219 };

    isMarkerActive = true;
    markerAnimation = 'bounce';
    markerPosition = { lat: -34.397, lng: 150.644 };

    isInfoWindowActive = true;
    infoWindowText = 'Hello World!';
    markerArrayControl = new FormArray([
        new FormControl({ lat: -36.402775439191814, lng: 141.32759375 }),
        new FormControl({ lat: -30.693731000346663, lng: 129.02290625 }),
        new FormControl({ lat: -32.044464858785716, lng: 123.39790625 }),
        new FormControl({ lat: -22.53190787179703, lng: 117.9486875 })
    ]);

    polygonGeodesic = true;
    polygonControl = new FormControl([
        { lat: -39.112219118252376, lng: 146.2055234375 },
        { lat: -30.599212466174976, lng: 134.307330078125 },
        { lat: -35.656464220959386, lng: 115.72944921875 },
        { lat: -21.880939574737297, lng: 114.0815 },
        { lat: -13.85841967432077, lng: 128.583453125 },
        { lat: -17.412569037229808, lng: 142.118609375 },
        { lat: -23.462306992287594, lng: 153.61030859375 }
   ]);

    constructor() { }

    ngOnInit() {

    }

    handleEvent(event: any) {
        console.info('event %o', event);
    }

}
