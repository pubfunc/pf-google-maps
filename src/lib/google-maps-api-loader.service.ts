import { Injectable, InjectionToken, Inject } from "@angular/core";

export const GOOGLE_MAPS_API_URL = new InjectionToken<string>('Google maps API url');

@Injectable()
export class GoogleMapsApiLoaderService {

    private _scriptLoadPromise: Promise<void>;

    constructor(
        @Inject(GOOGLE_MAPS_API_URL) private _url: string
    ){
        this.init().then(() => {
            this.logConstants();
        });
    }

    async init() {

        if(this._scriptLoadPromise) return this._scriptLoadPromise;

        return this._scriptLoadPromise = new Promise<void>((resolve, reject) => {
            if (!document.querySelectorAll(`[src="${this._url}"]`).length)
            {
                document.body.appendChild(Object.assign(
                    document.createElement('script'),
                    {
                        type: 'text/javascript',
                        src: this._url,
                        onload: () => resolve(),
                        onerror: () => reject()
                    }
                ));
            } else {
                resolve();
            }
        });

    }

    private logConstants(){
        console.log(google.maps.Animation);
    }

}