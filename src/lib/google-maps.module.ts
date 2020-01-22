import { NgModule, ModuleWithProviders } from "@angular/core";
import { PfGoogleMapComponent } from './google-map.component';
import { GoogleMapsApiLoaderService, GOOGLE_MAPS_API_URL } from './google-maps-api-loader.service';
import { ZoomControlDirective } from './controls/zoom-control.directive';
import { CommonModule } from '@angular/common';
import { PanControlDirective } from './controls/pan-control.directive';
import { MarkerDirective, MARKER_OPTIONS, DEFAULT_MARKER_OPTIONS } from './marker/marker.directive';
import { MarkerClusterDirective } from './marker/marker-cluster.directive';
import { InfoWindowDirective, InfoTemplateDirective, INFO_WINDOW_OPTIONS, DEFAULT_INFO_WINDOW_OPTIONS } from './marker/info-window.directive';
import { PolygonDirective } from './shapes/polygon.directive';
import { HeatmapDirective } from './visualization/heatmap.directive';




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
        HeatmapDirective,
    ],
    imports: [
        CommonModule,
    ],
    providers: [
        { provide: MARKER_OPTIONS, useValue: DEFAULT_MARKER_OPTIONS },
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
        HeatmapDirective,
    ]
})
export class PfGoogleMapsModule {

    static forRoot(apiKey: string): ModuleWithProviders {
        return {
            ngModule: PfGoogleMapsModule,
            providers: [
                GoogleMapsApiLoaderService,
                { provide: GOOGLE_MAPS_API_URL, useValue: `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=quarterly&libraries=visualization` },
            ]
        };
    }

}