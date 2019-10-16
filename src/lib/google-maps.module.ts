import { NgModule } from "@angular/core";
import { PfGoogleMapComponent } from './google-map.component';
import { GoogleMapsApiLoaderService, GOOGLE_MAPS_API_URL } from './google-maps-api-loader.service';
import { ZoomControlDirective } from './controls/zoom-control.directive';
import { CommonModule } from '@angular/common';
import { PanControlDirective } from './controls/pan-control.directive';
import { MarkerDirective } from './marker/marker.directive';
import { MarkerClusterDirective } from './marker/marker-cluster.directive';
import { InfoWindowDirective, InfoTemplateDirective, INFO_WINDOW_OPTIONS, DEFAULT_INFO_WINDOW_OPTIONS } from './marker/info-window.directive';
import { PolygonDirective } from './shapes/polygon.directive';




@NgModule({
    declarations: [
        PfGoogleMapComponent,
        ZoomControlDirective,
        PanControlDirective,
        MarkerDirective,
        MarkerClusterDirective,
        InfoWindowDirective,
        InfoTemplateDirective,
        PolygonDirective,
    ],
    imports: [
        CommonModule,
    ],
    providers: [
        GoogleMapsApiLoaderService,
        { provide: GOOGLE_MAPS_API_URL, useValue: "https://maps.googleapis.com/maps/api/js" },
        { provide: INFO_WINDOW_OPTIONS, useValue: DEFAULT_INFO_WINDOW_OPTIONS },
    ],
    exports: [
        PfGoogleMapComponent,
        ZoomControlDirective,
        PanControlDirective,
        MarkerDirective,
        MarkerClusterDirective,
        InfoWindowDirective,
        InfoTemplateDirective,
        PolygonDirective,
    ]
})
export class PfGoogleMapsModule {

}