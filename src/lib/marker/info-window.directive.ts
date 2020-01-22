import { Directive, TemplateRef, ViewContainerRef, OnInit, EmbeddedViewRef, OnChanges, SimpleChanges, ChangeDetectorRef, Optional, ContentChild, OnDestroy, InjectionToken, Inject, Input } from "@angular/core";
import { MarkerDirective } from './marker.directive';
import { PfGoogleMapComponent } from '../google-map.component';
import { InfoWindowOptions } from '../types/info-window';

export const INFO_WINDOW_OPTIONS = new InjectionToken<InfoWindowOptions>('DEFAULT_INFO_WINDOW_OPTIONS');

export const DEFAULT_INFO_WINDOW_OPTIONS: InfoWindowOptions = {
    disableAutoPan: true
};

@Directive({selector: '[pfInfoTemplate]'})
export class InfoTemplateDirective {
  constructor(public template: TemplateRef<any>) { }
}

@Directive({
    selector: 'pf-info-window,[pfInfoWindow]',
    host: {

    }
})
export class InfoWindowDirective implements OnInit, OnChanges, OnDestroy {

    @ContentChild(InfoTemplateDirective, {read: TemplateRef, static: true})
    _contentTemplate: TemplateRef<any>;

    @Input()
    set content(content: string | Node){
        this._content = content;
        if(this.infoWindow) this.infoWindow.setContent(content);
    }

    infoWindow: google.maps.InfoWindow;

    private _content: string | Node;
    private _viewRef: EmbeddedViewRef<any>;

    constructor(
        private map: PfGoogleMapComponent,
        private marker: MarkerDirective,
        private viewContainer: ViewContainerRef,
        private _changeDetect: ChangeDetectorRef,
        @Inject(INFO_WINDOW_OPTIONS) private _defaultOptions: InfoWindowOptions
    ){
        this._content = _defaultOptions.content;
    }

    ngOnInit(){

        this.map.init
            .subscribe(init => this.onMapInit());

    }

    private onMapInit(){

        console.log('InfoWindowDirective: onMapInit');

        if(this._contentTemplate){
            this._viewRef = this.viewContainer.createEmbeddedView(this._contentTemplate);
            this._content = this._viewRef.rootNodes[0];
        }


        this.infoWindow = new google.maps.InfoWindow({
            content: this._content,
            disableAutoPan: true
        });

        this.infoWindow.open(this.map.map, this.marker.marker);

    }

    ngOnChanges(changes: SimpleChanges){
        console.log('InfoWindowDirective changes');
        if(this.infoWindow){
        }
    }

    ngOnDestroy(){
        if(this.infoWindow){
            this.infoWindow.close();
        }
    }


}